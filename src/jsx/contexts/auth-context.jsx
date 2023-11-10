import React, { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { useNavigate, redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import axios from "axios";

const initialState = {
  isSignIn: false,
  user: null,
  token: null,
  tokenCreateTime: null,
  isLoading: true,
}
const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};
const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.user;
    return {
      ...state,
      ...(
        user
          ? ({
            isLoading: false,
            isSignIn: true,
            user,
            token: action.token,
            tokenCreateTime: new Date().toISOString(),
          })
          : ({
            isLoading: false,
          })
      )
    }
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    return {
      isSignIn: true,
      user: action.user,
      token: action.token,
      tokenCreateTime: new Date().toISOString(),
      isLoading: false,
    }
  },
  [HANDLERS.SIGN_OUT]: () => {
    return {
      ...initialState,
      isLoading: false,
    };
  }
}
const reducer = (state, action) => {
  // console.log('[auth-context] reducer aciton type: ', action.type);
  return handlers[action.type] ? handlers[action.type](state, action) : state
};

export const AuthContext = createContext();
export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);
  const navigate = useNavigate();

  const signIn = async (user, token) => {
    let now = new Date();
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('tokenCreateTime', now.toISOString());

    dispatch({
      type: 'SIGN_IN',
      isSignIn: true,
      user: user,
      token: token,
    });

    return Promise.resolve();
  }
  const signOut = () => {
    dispatch({
      type: 'SIGN_OUT',
    });

    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenCreateTime');

    navigate('/landing');
  };

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;
    let token = null;
    let user = null;
    let timeString = localStorage.getItem('tokenCreateTime');

    if(timeString) {
      const tokenCreateTime = new Date(timeString);
      const now = new Date();
      const diffDate = Math.floor((now - tokenCreateTime)/(1000 * 60 * 60 * 24));

      // console.log('[auth-context] diffDate:', diffDate )
      // console.log('[auth-context] tokenCreateTime: \t', tokenCreateTime.toISOString())
      // console.log('[auth-context] now: \t\t\t', now.toISOString())

      if (diffDate >= 30) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenCreateTime');
        navigate('/sign-in');
        return;
      }
      if (diffDate >= 15) {
        // console.log('[auth-context]: need update token');
        const response = await axios.get('/api/auth/updateToken', {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
          }
        })
        // console.log('[auth-context]: response.data.access_token: ', response.data.access_token)
        token = response.data.access_token;
        localStorage.setItem('token', token);
        localStorage.setItem('tokenCreateTime', now.toISOString());
      }

      // console.log('[auth-context]: default');
      isAuthenticated = true;
      user = JSON.parse(localStorage.getItem('user'));
      token = localStorage.getItem('token');
    }
    // console.log('[auth-context] isAuthenticated:', isAuthenticated)

    if (isAuthenticated) {
      dispatch({
        type: 'SIGN_IN',
        signIn: true,
        user: user,
        token: token,
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };


  useEffect(() => {
    // console.log('[auth-context] initialize')
    initialize();
  },[]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signOut,
      }}
    >
      { children }
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node
};
// export const AuthConsumer = AuthContext.Consumer;
export const useAuthContext = () => useContext(AuthContext);

// --------------------------------------------
// export const MyContext = createContext(null);
// export const useMyContext = () => useContext(MyContext);
// export const MyProvider = (props) => {
//   const { value, children } = props;
//   return (
//     <>
//       <MyContext.Provider value={value} >
//         { children }
//       </MyContext.Provider>
//     </>
//   )
// }
// --------------------------------------------
