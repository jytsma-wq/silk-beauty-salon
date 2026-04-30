/**
 * Reusable Form Field Component
 * Combines label, input, and error message
 */

'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Field label */
  label?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Error message */
  error?: string;
  /** Field description/help text */
  description?: string;
  /** Children (input element) */
  children: React.ReactNode;
}

/**
 * Form Field Component
 * Wraps an input with label, error, and description
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, required, error, description, children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {label && (
          <Label className={cn(error && 'text-destructive')}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        {children}
        {description && !error && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

/**
 * Form Section Component
 * Groups related form fields with a title
 */
interface FormSectionProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Children (form fields) */
  children: React.ReactNode;
  /** Additional classes */
  className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps): React.JSX.Element {
  return (
    <div className={cn('space-y-4', className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/**
 * Form Error Summary Component
 * Displays all form errors at the top of a form
 */
interface FormErrorSummaryProps {
  /** Form errors object from react-hook-form */
  errors: Record<string, { message?: string }>;
}

export function FormErrorSummary({ errors }: FormErrorSummaryProps): React.JSX.Element | null {
  const errorMessages = Object.entries(errors)
    .filter(([, error]) => error?.message)
    .map(([field, error]) => ({ field, message: error.message }));

  if (errorMessages.length === 0) {
    return null;
  }

  return (
    <div className="rounded-md bg-destructive/10 p-4" role="alert">
      <h4 className="text-sm font-medium text-destructive mb-2">
        Please fix the following errors:
      </h4>
      <ul className="text-sm text-destructive list-disc list-inside space-y-1">
        {errorMessages.map(({ field, message }) => (
          <li key={field}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
