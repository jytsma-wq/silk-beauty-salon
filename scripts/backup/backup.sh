#!/bin/bash
set -e

# Silk Beauty Salon Backup Script
# Automates database and file backups

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BACKUP_DIR="${BACKUP_DIR:-$PROJECT_ROOT/backups}"
RETENTION_DAYS="${RETENTION_DAYS:-30}"
S3_BUCKET="${S3_BUCKET:-}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Database configuration
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-silkbeauty}"
DB_USER="${DB_USER:-silkbeauty}"
DB_PASSWORD="${DB_PASSWORD:-}"

# Help function
show_help() {
    cat << EOF
Silk Beauty Salon Backup Script

Usage: $0 [OPTIONS] COMMAND

Commands:
    database    Backup PostgreSQL database
    files       Backup uploaded files
    all         Backup both database and files
    restore     Restore from backup

Options:
    -d, --directory     Backup directory [default: $BACKUP_DIR]
    -r, --retention     Retention days [default: $RETENTION_DAYS]
    -s, --s3-bucket     S3 bucket for remote storage
    --help              Show this help message

Examples:
    $0 database
    $0 all --s3-bucket my-backup-bucket
    $0 restore --file backups/silkbeauty_20240115_120000.sql.gz
EOF
}

# Parse arguments
COMMAND=""
RESTORE_FILE=""

while [[ $# -gt 0 ]]; do
    case $1 in
        -d|--directory)
            BACKUP_DIR="$2"
            shift 2
            ;;
        -r|--retention)
            RETENTION_DAYS="$2"
            shift 2
            ;;
        -s|--s3-bucket)
            S3_BUCKET="$2"
            shift 2
            ;;
        -f|--file)
            RESTORE_FILE="$2"
            shift 2
            ;;
        --help)
            show_help
            exit 0
            ;;
        database|files|all|restore)
            COMMAND="$1"
            shift
            ;;
        *)
            echo "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Validate command
if [[ -z "$COMMAND" ]]; then
    echo -e "${RED}Error: No command specified${NC}"
    show_help
    exit 1
fi

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Database backup
backup_database() {
    echo -e "${BLUE}=========================================${NC}"
    echo -e "${BLUE}  Database Backup${NC}"
    echo -e "${BLUE}=========================================${NC}"
    
    local backup_file="$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql.gz"
    
    echo -e "${BLUE}Creating database backup...${NC}"
    
    if [[ -n "$DB_PASSWORD" ]]; then
        export PGPASSWORD="$DB_PASSWORD"
    fi
    
    # Check if running in Docker
    if docker ps | grep -q "silk-beauty-postgres"; then
        echo -e "${BLUE}Using Docker PostgreSQL container...${NC}"
        docker exec silk-beauty-postgres pg_dump \
            -U "$DB_USER" \
            -d "$DB_NAME" \
            --verbose \
            --no-owner \
            --no-acl \
            2>/dev/null | gzip > "$backup_file"
    else
        # Direct PostgreSQL connection
        pg_dump \
            -h "$DB_HOST" \
            -p "$DB_PORT" \
            -U "$DB_USER" \
            -d "$DB_NAME" \
            --verbose \
            --no-owner \
            --no-acl \
            2>/dev/null | gzip > "$backup_file"
    fi
    
    if [[ $? -eq 0 ]]; then
        local size=$(du -h "$backup_file" | cut -f1)
        echo -e "${GREEN}Database backup completed: $backup_file ($size)${NC}"
        
        # Upload to S3 if configured
        if [[ -n "$S3_BUCKET" ]]; then
            echo -e "${BLUE}Uploading to S3...${NC}"
            aws s3 cp "$backup_file" "s3://$S3_BUCKET/database/"
            echo -e "${GREEN}Uploaded to S3${NC}"
        fi
    else
        echo -e "${RED}Database backup failed!${NC}"
        exit 1
    fi
    
    # Cleanup old backups
    cleanup_old_backups "${DB_NAME}_" "sql.gz"
}

# Files backup
backup_files() {
    echo -e "${BLUE}=========================================${NC}"
    echo -e "${BLUE}  Files Backup${NC}"
    echo -e "${BLUE}=========================================${NC}"
    
    local backup_file="$BACKUP_DIR/files_${TIMESTAMP}.tar.gz"
    
    echo -e "${BLUE}Creating files backup...${NC}"
    
    # Backup important directories
    tar -czf "$backup_file" \
        -C "$PROJECT_ROOT" \
        --exclude='node_modules' \
        --exclude='.next' \
        --exclude='*.log' \
        public/uploads 2>/dev/null || true
    
    # Also backup environment files (encrypted)
    if [[ -d "$PROJECT_ROOT/.env*" ]]; then
        tar -czf "$BACKUP_DIR/env_${TIMESTAMP}.tar.gz" \
            -C "$PROJECT_ROOT" \
            .env* 2>/dev/null || true
    fi
    
    if [[ $? -eq 0 ]]; then
        local size=$(du -h "$backup_file" | cut -f1)
        echo -e "${GREEN}Files backup completed: $backup_file ($size)${NC}"
        
        # Upload to S3 if configured
        if [[ -n "$S3_BUCKET" ]]; then
            echo -e "${BLUE}Uploading to S3...${NC}"
            aws s3 cp "$backup_file" "s3://$S3_BUCKET/files/"
            echo -e "${GREEN}Uploaded to S3${NC}"
        fi
    else
        echo -e "${YELLOW}Warning: Files backup may have issues${NC}"
    fi
    
    # Cleanup old backups
    cleanup_old_backups "files_" "tar.gz"
}

# Cleanup old backups
cleanup_old_backups() {
    local prefix="$1"
    local suffix="$2"
    
    echo -e "${BLUE}Cleaning up old backups (keeping last $RETENTION_DAYS days)...${NC}"
    
    find "$BACKUP_DIR" -name "${prefix}*${suffix}" -type f -mtime +$RETENTION_DAYS -delete 2>/dev/null || true
    
    # List remaining backups
    local count=$(find "$BACKUP_DIR" -name "${prefix}*${suffix}" -type f | wc -l)
    echo -e "${GREEN}Cleanup complete. $count backups retained.${NC}"
}

# Restore from backup
restore_backup() {
    if [[ -z "$RESTORE_FILE" ]]; then
        echo -e "${RED}Error: No backup file specified. Use --file option.${NC}"
        exit 1
    fi
    
    if [[ ! -f "$RESTORE_FILE" ]]; then
        echo -e "${RED}Error: Backup file not found: $RESTORE_FILE${NC}"
        exit 1
    fi
    
    echo -e "${YELLOW}WARNING: This will OVERWRITE the current database!${NC}"
    read -p "Are you sure you want to continue? (yes/no): " confirm
    if [[ "$confirm" != "yes" ]]; then
        echo -e "${RED}Restore cancelled.${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}Restoring from backup: $RESTORE_FILE${NC}"
    
    if [[ "$RESTORE_FILE" == *.sql.gz ]]; then
        # Database restore
        if [[ -n "$DB_PASSWORD" ]]; then
            export PGPASSWORD="$DB_PASSWORD"
        fi
        
        echo -e "${BLUE}Dropping existing database...${NC}"
        if docker ps | grep -q "silk-beauty-postgres"; then
            docker exec silk-beauty-postgres dropdb -U "$DB_USER" --if-exists "$DB_NAME"
            docker exec silk-beauty-postgres createdb -U "$DB_USER" "$DB_NAME"
            
            echo -e "${BLUE}Restoring database...${NC}"
            gunzip -c "$RESTORE_FILE" | docker exec -i silk-beauty-postgres psql -U "$DB_USER" -d "$DB_NAME"
        else
            dropdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" --if-exists "$DB_NAME"
            createdb -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME"
            
            echo -e "${BLUE}Restoring database...${NC}"
            gunzip -c "$RESTORE_FILE" | psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME"
        fi
        
        if [[ $? -eq 0 ]]; then
            echo -e "${GREEN}Database restore completed!${NC}"
        else
            echo -e "${RED}Database restore failed!${NC}"
            exit 1
        fi
    elif [[ "$RESTORE_FILE" == *.tar.gz ]]; then
        # Files restore
        echo -e "${BLUE}Restoring files...${NC}"
        tar -xzf "$RESTORE_FILE" -C "$PROJECT_ROOT"
        echo -e "${GREEN}Files restore completed!${NC}"
    fi
}

# Main logic
case "$COMMAND" in
    database)
        backup_database
        ;;
    files)
        backup_files
        ;;
    all)
        backup_database
        backup_files
        ;;
    restore)
        restore_backup
        ;;
    *)
        echo -e "${RED}Error: Unknown command '$COMMAND'${NC}"
        show_help
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}  Backup Operation Complete!${NC}"
echo -e "${GREEN}=========================================${NC}"
