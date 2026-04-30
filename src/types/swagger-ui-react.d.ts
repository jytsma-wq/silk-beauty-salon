declare module 'swagger-ui-react' {
  import * as React from 'react';

  interface SwaggerUIProps {
    url?: string;
    spec?: object;
    docExpansion?: 'list' | 'full' | 'none';
    defaultModelExpandDepth?: number;
    displayOperationId?: boolean;
    filter?: boolean;
    persistAuthorization?: boolean;
    [key: string]: unknown;
  }

  export default class SwaggerUI extends React.Component<SwaggerUIProps> {}
}
