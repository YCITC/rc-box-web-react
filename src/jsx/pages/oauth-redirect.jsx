import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';

import { Backdrop, CircularProgress } from '@mui/material';
import { useAuth } from '../hooks/use-auth.jsx';


export default function OAuthRedirect() {
  document.title = 'SHUOO A';

  const theme = useTheme();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [openBackdrop, setOpenBackdrop] = useState(true);
  const auth = useAuth();

  useEffect(() =>{
    oauthLogin();
  }, [search])
  const oauthLogin = () => {
    console.log('OAuth Login');
    console.log(search)
    // let params = new URLSearchParams(search);
    // console.log(params)
    // http://localhost:3000/api/auth/google/callback
    axios.get('/api/auth/google/callback'+search)
    .then((response) => {
      console.log('api resp: ', response.data);

      const now = new Date();
      const user = response.data.user;
      const token = response.data.access_token
      
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('tokenCreateTime', now.toISOString());
      
      auth.signIn(user, token);
      setOpenBackdrop(false);
      console.log('[SingIn] user: ', user);
      navigate('/');
    }).catch(error => {
    });
  }

  const containerStyle = {
    position: 'static',
    paddingTop: '10px',
    width: '100%',
    position: 'absolute',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '800px',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '800px',
      paddingRight: '5px',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '620px',
    }
  };

  return (
    <Container component="div" maxWidth="md" sx={containerStyle}>
      OAuth Login
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
