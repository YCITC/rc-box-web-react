import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../hooks/use-auth.jsx';


export const AuthGuard = (props) => {
  const { children } = props;
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  let pathname = null;
  useEffect(() => {
    // console.log('[auth-guard] auth.isLoading changed')
    // console.log('[auth-guard] auth.isLoading:\t', auth.isLoading);
    // console.log('[auth-guard] auth.isSignin:\t', auth.isSignIn);
    if (auth.isLoading) return;
    if (auth.isSignIn) return;

    pathname = location.pathname;

    console.log('[auth-guard] path: ', pathname)
    switch (pathname) {
      case '/devices':
      case '/delivery-logs':
        // console.log('[auth-guard] redirecting to sign in page')
        navigate('/signin');
        break;
      default:
        break;
    }

  }, [auth.isLoading, location.pathname]);

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node
};
