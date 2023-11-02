import React, { useEffect, useState, useCallback } from 'react';
import { Link as RLink, useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';

import { Container, Box, Button} from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';

import Copyright from '../components/copyright.jsx';
import { useAuth } from '../hooks/use-auth.jsx';
import { LogoMain } from '../components/logos.jsx';
import TextFieldPassword from '../components/text-field/password.jsx';


export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSnackbarState, setOpenSnackbarState] = useState({open: false, severity: '', message: ''});
  const [newPasswordError, setNewPasswordError] = useState({state: false, message: ''});
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState({state: false, message: ''});

  const auth = useAuth();

  useEffect(()=>{
    document.title = 'RC Box - Reset Password';
  },[])

  const verifyStart = useCallback ( () => {
    if (searchParams.has('t') === false) {
      setVerifyError('Cannot get your verification code');
      setVerifyState('failed');
      return;
    }
  }, [] )

  useEffect(() => {
    verifyStart();
  }, [verifyStart] )

  const handleChangePassword = (event) => {
    event.preventDefault();
    setNewPasswordError({state: false, message: ''});
    setConfirmNewPasswordError({state: false, message: ''});
    const data = new FormData(event.currentTarget);

    if (data.get('newPassword') !== data.get('confirmNewPassword')) {
      setConfirmNewPasswordError({state: true, message: 'Password is different'})
      return;
    }

    const dataObj = Object.fromEntries(data.entries());
    const json = JSON.stringify(dataObj)

    const token = searchParams.get('t');

    axios.post('/api/auth/resetPassword', json, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    })
    .then((response)=>{
      console.log('response: ', response);
      // console.log(response.status == 200)
      setOpenSnackbarState({open: true, senverity: 'success', message: "Change Password Successfully"})
    })
    .catch((error)=>{
      setOpenBackdrop(false);
      console.log('error: ', error);
      if (error.request.response) {
        const res = JSON.parse(error.request.response) 
        setOpenSnackbarState({open: true, senverity: 'error', message: res.message})
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
        <Box component="form" onSubmit={handleChangePassword} sx={{ mt: 1 }}>
          <Box component="h1">Reset Password</Box>
          <TextFieldPassword
            required
            fullWidth
            margin="normal"
            id="newPassword"
            name="newPassword"
            label="New Password"
            helperText={newPasswordError.message}
            error={newPasswordError.state}
          />
          <TextFieldPassword
            required
            fullWidth
            margin="normal"
            id="confirmNewPassword"
            name="confirmNewPassword"
            label="Confirm New Password"
            helperText={confirmNewPasswordError.message}
            error={confirmNewPasswordError.state}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 , fontSize: '2em'}}
          >
            Reset Password
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Snackbar open={openSnackbarState.open} autoHideDuration={3000} onClose={() => setOpenSnackbarState({open: false, severity: '', message: ''})}>
        <Alert severity={openSnackbarState.senverity} sx={{ width: '100%' }}>
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
