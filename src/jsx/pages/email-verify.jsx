import React, { useEffect, useState, useCallback } from 'react';
import { Link as RLink, useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';

import { Typography} from '@mui/material';
import { Container, Box, Grid, Link, TextField, Button} from '@mui/material';
import { Snackbar, Alert } from '@mui/material';

import Copyright from '../components/copyright.jsx';
import { LogoMain } from '../components/logos.jsx';


export default function EmailVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [openSnackbarState, setOpenSnackbarState] = useState({open: false, message: ''});
  const [redirectTimer, setRedirectTimer] = useState();
  const [resendMailTimer, setResendMailTimer] = useState();
  const [verifyState, setVerifyState] = useState('checking'); // state: 'checking', 'success', 'failed'
  const [verifyError, setVerifyError] = useState();

  document.title = 'RC Box - Email Verification';
  const verifyStart = useCallback ( () => {
    if (searchParams.has('t') === false) {
      setVerifyError('Cannot get your verification code');
      setVerifyState('failed');
      return;
    }
    const oneDayToken = searchParams.get('t');
    const url = `/api/auth/emailVerify/${oneDayToken}`;
    try {
      axios.get(url).then((res)=>{
        if (res.data == true) {
          setRedirectTimer(5);
          setVerifyState('success');
        }
      }).catch((err)=>{
        if (err.response.data.message == 'TokenExpiredError') setVerifyError('Your verification mail has expired');
        if (err.response.data.message == 'JsonWebTokenError') setVerifyError('Your verification code is invalid');
        setVerifyState('failed');
      })
    } catch (error) {
      console.log(error);
      setVerifyState('failed');
    }
  }, [] )
  
  useEffect(() => {
    const lastTimerString = localStorage.getItem('resendTimer');
    if (lastTimerString !== undefined) {
      const lastTime = new Date(lastTimerString);
      const now = new Date();
      const diffTime = parseInt((now.getTime()-lastTime.getTime())/1000);
      if (diffTime > 60) {
        localStorage.removeItem('resendTimer');
      } else {
        setResendMailTimer(60-diffTime);
      }
    }
    verifyStart();
  }, [verifyStart] )

  useEffect(() => {
    if (redirectTimer === 0) navigate("/sign-in");
    if (redirectTimer === undefined || redirectTimer === 0) return;
    setTimeout(() => {
      setRedirectTimer(redirectTimer-1);
    }, 1000);
  }, [redirectTimer]);

  useEffect(() => {
    if (resendMailTimer === undefined || resendMailTimer === 0) return;
    setTimeout(() => {
      setResendMailTimer(resendMailTimer-1);
    }, 1000);
  }, [resendMailTimer]);

  const reSendVerify = (async(event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    axios.get('/api/auth/emailResend/'+formData.get('email'))
      .catch((error) => {
        if (error.response.data.message == 'EmailVerified') navigate("/sign-in");
        setOpenSnackbarState({open: true, message: error.response.data.message})
      })
    localStorage.setItem('resendTimer', new Date());
    setResendMailTimer(60);
  });

  const renderSuccess = (() => {
    return <>
      <Typography variant="subtitle1" paragraph  sx={{width: '100%'}}>
        Congratulations! Your email verification has been successfully completed.
      </Typography>
      <Typography variant="subtitle2" paragraph  sx={{width: '100%'}}>
        Thank you for your cooperation. You can now start using our services.
      </Typography>
      <Typography variant="body2" paragraph  sx={{width: '100%'}}>
        We will redirect you to the login page in {redirectTimer!==undefined?redirectTimer:'5'} seconds. 
        <Link to="/sign-in" variant="body2" component={RLink} sx={{ml: '10px'}}>
          Or goto Sign in page
        </Link>
      </Typography>
    </>
  });
  const renderChecking = (() => {
    return <>
      <Typography variant="subtitle1" paragraph  sx={{width: '100%'}}>
        Email verification please wait.
      </Typography>
    </>
  });
  const renderFailed = (() => {
    return <>
      <Typography variant="subtitle1" paragraph  sx={{width: '100%'}}>
        Email verify failed.
      </Typography>
      
      <Typography variant="subtitle2" paragraph  sx={{width: '100%'}}>
        {verifyError}
      </Typography>
      <Box component="form" onSubmit={reSendVerify} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          inputProps={{pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'}}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 , fontSize: '2em'}}
          disabled={resendMailTimer>0}
        >
          Resend mail {(resendMailTimer && resendMailTimer>0)?resendMailTimer:''}
        </Button>
      </Box>
    </>
  });
  const renderVarifyState = (() => {
    switch (verifyState) {
      case 'checking':
        return renderChecking();
      case 'success':
        return renderSuccess();
      case 'failed':
        return renderFailed();
    }
  });
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
        <Box component="div" sx={{ mt: 5 }}>
          <Grid container>
            <Typography variant="h3" gutterBottom align="center" sx={{width: '100%'}}>
              Email Verification
            </Typography>
            {renderVarifyState()}
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Snackbar open={openSnackbarState.open} autoHideDuration={6000} >
        <Alert severity="error" sx={{ width: '100%' }}>
          {openSnackbarState.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
