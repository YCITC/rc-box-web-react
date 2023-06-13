import React from 'react';
import { AuthGuard } from '../guards/auth-guard.jsx';

export const withAuthGuard = (Component) => (props) => (
  <AuthGuard>
    <Component {...props} />
  </AuthGuard>
);
