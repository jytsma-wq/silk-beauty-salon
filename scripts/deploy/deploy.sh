#!/bin/bash
set -e

# Silk Beauty Salon Deployment Script
# Supports staging and production deployments

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT="staging"
IMAGE_TAG=""
SKIP_MIGRATIONS=false
SKIP_HEALTH_CHECK=false

# Help function
show_help() {
    cat << EOF
Silk Beauty Salon Deployment Script

Usage: $0 [OPTIONS]

Options:
    -e, --environment    Environment to deploy (staging|production) [default: staging]
    -t, --tag           Docker image tag to deploy [default: latest]
    -s, --skip-migrations    Skip database migrations
    -h, --skip-health-check    Skip health check
    --help              Show this help message

Examples:
    $0 -e staging -t v1.2.3
    $0 --environment production --tag $(git rev-parse --short HEAD)
    $0 -e staging -s  # Deploy without migrations
EOF
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -t|--tag)
            IMAGE_TAG="$2"
            shift 2
            ;;
        -s|--skip-migrations)
            SKIP_MIGRATIONS=true
            shift
            ;;
        -h|--skip-health-check)
            SKIP_HEALTH_CHECK=true
            shift
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Validate environment
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    echo -e "${RED}Error: Invalid environment '$ENVIRONMENT'. Must be 'staging' or 'production'.${NC}"
    exit 1
fi

# Set default tag if not provided
if [[ -z "$IMAGE_TAG" ]]; then
    IMAGE_TAG="latest"
    echo -e "${YELLOW}Warning: No image tag specified, using 'latest'${NC}"
fi

# Load environment-specific variables
ENV_FILE="$PROJECT_ROOT/.env.$ENVIRONMENT"
if [[ -f "$ENV_FILE" ]]; then
    echo -e "${BLUE}Loading environment from $ENV_FILE${NC}"
    set -a
    source "$ENV_FILE"
    set +a
else
    echo -e "${YELLOW}Warning: Environment file $ENV_FILE not found${NC}"
fi

# Deployment configuration
DOCKER_REGISTRY="${DOCKER_REGISTRY:-ghcr.io}"
IMAGE_NAME="${IMAGE_NAME:-jytsma-wq/silk-beauty-salon}"
FULL_IMAGE="$DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG"
DEPLOY_HOST="${DEPLOY_HOST:-}"
DEPLOY_USER="${DEPLOY_USER:-}"
DEPLOY_DIR="${DEPLOY_DIR:-/opt/silk-beauty-salon}"

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}  Silk Beauty Salon Deployment${NC}"
echo -e "${BLUE}=========================================${NC}"
echo ""
echo -e "${GREEN}Environment:${NC} $ENVIRONMENT"
echo -e "${GREEN}Image:${NC} $FULL_IMAGE"
echo -e "${GREEN}Skip Migrations:${NC} $SKIP_MIGRATIONS"
echo ""

# Confirm deployment for production
if [[ "$ENVIRONMENT" == "production" ]]; then
    echo -e "${YELLOW}WARNING: You are about to deploy to PRODUCTION${NC}"
    echo -e "${YELLOW}This will affect live users!${NC}"
    read -p "Are you sure you want to continue? (yes/no): " confirm
    if [[ "$confirm" != "yes" ]]; then
        echo -e "${RED}Deployment cancelled.${NC}"
        exit 1
    fi
fi

# Local deployment (docker-compose)
deploy_local() {
    echo -e "${BLUE}Deploying locally with docker-compose...${NC}"
    
    cd "$PROJECT_ROOT"
    
    # Pull latest image
    echo -e "${BLUE}Pulling image: $FULL_IMAGE${NC}"
    docker pull "$FULL_IMAGE"
    
    # Update docker-compose.yml with new image
    sed -i.bak "s|image: .*|image: $FULL_IMAGE|" docker-compose.yml
    
    # Run migrations if not skipped
    if [[ "$SKIP_MIGRATIONS" == "false" ]]; then
        echo -e "${BLUE}Running database migrations...${NC}"
        docker-compose run --rm app npx prisma migrate deploy
    fi
    
    # Restart services
    echo -e "${BLUE}Restarting services...${NC}"
    docker-compose up -d --no-deps app
    
    # Health check
    if [[ "$SKIP_HEALTH_CHECK" == "false" ]]; then
        echo -e "${BLUE}Running health check...${NC}"
        sleep 10
        
        MAX_RETRIES=5
        RETRY_COUNT=0
        
        while [[ $RETRY_COUNT -lt $MAX_RETRIES ]]; do
            if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
                echo -e "${GREEN}Health check passed!${NC}"
                break
            fi
            
            RETRY_COUNT=$((RETRY_COUNT + 1))
            echo -e "${YELLOW}Health check attempt $RETRY_COUNT/$MAX_RETRIES failed, retrying...${NC}"
            sleep 5
        done
        
        if [[ $RETRY_COUNT -eq $MAX_RETRIES ]]; then
            echo -e "${RED}Health check failed after $MAX_RETRIES attempts${NC}"
            
            # Rollback on failure
            echo -e "${YELLOW}Rolling back to previous version...${NC}"
            git checkout docker-compose.yml
            docker-compose up -d --no-deps app
            
            exit 1
        fi
    fi
    
    # Cleanup
    echo -e "${BLUE}Cleaning up old images...${NC}"
    docker image prune -f
    
    # Restore original docker-compose.yml
    mv docker-compose.yml.bak docker-compose.yml
    
    echo -e "${GREEN}Deployment to $ENVIRONMENT completed successfully!${NC}"
}

# Remote deployment (SSH)
deploy_remote() {
    if [[ -z "$DEPLOY_HOST" || -z "$DEPLOY_USER" ]]; then
        echo -e "${RED}Error: DEPLOY_HOST and DEPLOY_USER must be set for remote deployment${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}Deploying to remote server: $DEPLOY_HOST${NC}"
    
    ssh -o StrictHostKeyChecking=no "$DEPLOY_USER@$DEPLOY_HOST" << EOF
        set -e
        
        cd $DEPLOY_DIR
        
        # Pull latest image
        echo "Pulling image: $FULL_IMAGE"
        docker pull $FULL_IMAGE
        
        # Run migrations if not skipped
        if [ "$SKIP_MIGRATIONS" = "false" ]; then
            echo "Running database migrations..."
            docker-compose run --rm app npx prisma migrate deploy
        fi
        
        # Update and restart
        sed -i "s|image: .*|image: $FULL_IMAGE|" docker-compose.yml
        docker-compose up -d --no-deps app
        
        # Health check
        if [ "$SKIP_HEALTH_CHECK" = "false" ]; then
            echo "Running health check..."
            sleep 10
            curl -f http://localhost:3000/api/health || exit 1
        fi
        
        # Cleanup
        docker image prune -f
        
        echo "Deployment completed!"
EOF
    
    if [[ $? -eq 0 ]]; then
        echo -e "${GREEN}Remote deployment to $ENVIRONMENT completed successfully!${NC}"
    else
        echo -e "${RED}Remote deployment failed!${NC}"
        exit 1
    fi
}

# Main deployment logic
if [[ -n "$DEPLOY_HOST" ]]; then
    deploy_remote
else
    deploy_local
fi

# Post-deployment notification
if command -v slack-notify &> /dev/null; then
    slack-notify "Deployment to $ENVIRONMENT completed: $IMAGE_TAG"
fi

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
