/**
 * API Documentation Page
 * Swagger UI for interactive API documentation
 */

import { Metadata } from 'next';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export const metadata: Metadata = {
  title: 'API Documentation | Silk Beauty Salon',
  description: 'Interactive API documentation for Silk Beauty Salon',
};

export default function ApiDocsPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">API Documentation</h1>
        <SwaggerUI
          url="/openapi.yaml"
          docExpansion="list"
          defaultModelExpandDepth={2}
          displayOperationId={true}
          filter={true}
          persistAuthorization={true}
        />
      </div>
    </div>
  );
}
