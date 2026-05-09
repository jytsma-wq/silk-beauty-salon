import { render } from '@react-email/render';
import React from 'react';

/** Render a React email component to an HTML string for Resend. */
export async function renderEmail(component: React.ReactElement): Promise<string> {
  return render(component, { pretty: true });
}
