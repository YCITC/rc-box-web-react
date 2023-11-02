import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { TextField } from '@mui/material';
import { Container, Box, Button} from '@mui/material';
import { Snackbar, Alert } from '@mui/material';

import Copyright from '../components/copyright.jsx';
import { LogoMain } from '../components/logos.jsx';


export default function ForgetPassword() {
  const [emailState, setEmailState] = useState('');
  const [openSnackbarState, setOpenSnackbarState] = useState({open: false, severity: '', message: ''});

  useEffect(()=>{
    document.title = 'RC Box - Forget Password';
  },[])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);


    if (openSnackbarState.open == true ) setOpenSnackbarState({open: false, message: ''})

    const dataObj = Object.fromEntries(data.entries());
    axios.get(`/api/auth/requestResetPassword/${dataObj.email}`)
    .then(async (response)=>{
      setOpenSnackbarState({open: true, senverity: 'success', message: "Email send successfully"})
      
    })
    .catch((error)=>{
      if (error.request.response) {
        const res = JSON.parse(error.request.response) 
        setOpenSnackbarState({open: true, senverity: 'error', message: res.message})
      } else {
        console.error('error : ', error);
      }
    });
  };

  const styleVerticalCentering = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };
  return (
    <>
    <Container component="main" maxWidth="xs" sx={styleVerticalCentering}>
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LogoMain />
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Box component="h1">Forget Password</Box>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={emailState}
            onChange={(event) => setEmailState(event.target.value)}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 , fontSize: '2em'}}
          >
            Send Email
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
    <Snackbar open={openSnackbarState.open} autoHideDuration={3000} onClose={() => setOpenSnackbarState({open: false, severity: '', message: ''})}>
      <Alert severity={openSnackbarState.senverity} sx={{ width: '100%' }}>
        {openSnackbarState.message}
      </Alert>
    </Snackbar>
    </>
  );
}
