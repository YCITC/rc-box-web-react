import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth-context.jsx';

export const useAuth = () => useContext(AuthContext);
