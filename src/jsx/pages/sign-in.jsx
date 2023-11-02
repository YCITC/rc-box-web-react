import React, { useEffect, useState } from 'react';
import { Link as RLink, useNavigate } from "react-router-dom";
import axios from 'axios';

import { TextField, FormControlLabel} from '@mui/material';
import { Container, Box, Grid, Link, Checkbox, Button} from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';

import Copyright from '../components/copyright.jsx';
import { useAuth } from '../hooks/use-auth.jsx';
import { LogoMain } from '../components/logos.jsx';


export default function SignIn() {
  const navigate = useNavigate();
  const [emailState, setEmailState] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSnackbarState, setOpenSnackbarState] = useState({open: false, severity: '', message: ''});
  const [rememberState, setRememberState] = useState(false);
  const auth = useAuth();

  useEffect(()=>{
    document.title = 'RC Box - Sign In';
    if (localStorage.getItem('userEmail') !== null) {
      setEmailState(localStorage.getItem('userEmail'))
      setRememberState(true);
    }
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setOpenBackdrop(true);
    const data = new FormData(event.currentTarget);

    // Storage user email to local storage
    if (data.get('remember') !== null && data.get('remember') === 'true') {
      localStorage.setItem('userEmail', data.get('email'))
    } else {
      localStorage.removeItem('userEmail');
    }

    if (openSnackbarState.open == true ) setOpenSnackbarState({open: false, severity:'', message: ''})

    // Call login API
    const dataObj = Object.fromEntries(data.entries());
    let jsonObj = {};
    try {
      jsonObj = JSON.stringify(dataObj)
    }
    catch (error) {
      console.error(error)
      setOpenBackdrop(false);
      return;
    }
    axios.post('/api/auth/login', jsonObj, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async (response)=>{
      const now = new Date();
      const user = response.data.user;
      const token = response.data.access_token
      // console.log('[SingIn] user: ', user);

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('tokenCreateTime', now.toISOString());

      auth.signIn(user, token);
      // setOpenBackdrop(false);
      navigate('/');
    })
    .catch((error)=>{
      const res = JSON.parse(error.request.response) 
      switch (res.message) {
        case 'Cannot find user':
        case 'email or password incorrect':
          setOpenSnackbarState({open: true, severity: 'error', message: 'Incorrect email or password'})
          // setOpenBackdrop(false);
          break;
        default:
          console.error('error res: ', res);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LogoMain />
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            autoFocus
            value={emailState}
            onChange={(event) => setEmailState(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox name="remember" id="remember" value="true" color="primary" 
              onChange={(event) => {setRememberState(!rememberState)}}
              checked={rememberState}
            />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 , fontSize: '2em'}}
          >
            Sign In
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            href="/api/auth/google"
            sx={{ mt: 3, mb: 2 , fontSize: '2em'}}
          >
            Sign In With Google
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forget-password" variant="body2" component={RLink}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item xl sx={{textAlign: "right"}}>
              <Link to="/sign-up" variant="body2" component={RLink}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Snackbar open={openSnackbarState.open} autoHideDuration={3000} onClose={() => setOpenSnackbarState({open: false, severity: '', message: ''})} >
        <Alert severity={openSnackbarState.severity} sx={{ width: '100%' }}>
          {openSnackbarState.message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
