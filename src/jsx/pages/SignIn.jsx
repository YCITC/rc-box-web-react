import React, { useEffect, useState } from 'react';
import { Link as RLink, useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { TextField, FormControlLabel} from '@mui/material';
import { Container, Typography, Box, Grid, Link, Checkbox, Avatar, Button} from '@mui/material';
import { Snackbar, Alert } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Copyright from '../components/copyright.jsx';
import axios from 'axios';


export default function SignIn() {
  const navigate = useNavigate();
  const [emailState, setEmailState] = useState('');
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSnackbarState, setOpenSnackbarState] = useState({open: false, message: ''});
  const [rememberState, setRememberState] = useState(false);

  useEffect(()=>{
    document.title = 'RC Box - Sign In';
    if (localStorage.getItem('userEmail') !== null) {
      email = localStorage.getItem('userEmail');
      setEmailState(localStorage.getItem('userEmail'))
      setRememberState(true);
    }
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenBackdrop(true);
    const data = new FormData(event.currentTarget);

    // Storage user email to local storage
    if (data.get('remember') !== null && data.get('remember') === 'true') {
      localStorage.setItem('userEmail', data.get('email'))
    } else {
      localStorage.removeItem('userEmail');
    }

    if (openSnackbarState.open == true ) setOpenSnackbarState({open: false, message: ''})

    // Call login API
    const dataObj = Object.fromEntries(data.entries());
    let json = {};
    try {
      json = JSON.stringify(dataObj)
    }
    catch (error) {
      console.error(error)
      setOpenBackdrop(false);
    }
    axios.post('/api/auth/login', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      const now = new Date();
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('tokenCreateTime', now.toISOString());
      setOpenBackdrop(false);
      navigate('/')
    })
    .catch((error)=>{
      const res = JSON.parse(error.request.response) 
      switch (res.message) {
        case 'Cannot find user':
        case 'email or password incorrect':
          setOpenSnackbarState({open: true, message: 'Incorrect email or password'})
          break;
        default:
          console.error('error res: ', res);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs hidden>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item xs sx={{textAlign: "right"}}>
              <Link to="/signup" variant="body2" component={RLink}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <Snackbar open={openSnackbarState.open} autoHideDuration={6000} >
        <Alert severity="error" sx={{ width: '100%' }}>
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
