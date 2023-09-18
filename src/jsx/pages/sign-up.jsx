import React, { useEffect, useState} from 'react';
import { Link as RLink, useNavigate }  from 'react-router-dom';
import axios from 'axios';

import { Container, Box, Grid, Link } from '@mui/material';
import { Button, TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { LogoMain } from '../components/logos.jsx';
import Copyright from '../components/copyright.jsx';


// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {
  useEffect(()=> {
    document.title = 'RC Box - Sign Up';
  }, []);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [usernameError, setUsernameError] = useState({state: false, message: ''});
  const [emailError, setEmailError] = useState({state: false, message: ''});
  const [passwordError, setPasswordError] = useState({state: false, message: ''});
  const [passwordCheckError, setPasswordCheckError] = useState({state: false, message: ''});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError({state: false, message: ''})

    const data = new FormData(event.currentTarget);

    if (data.get('password') !== data.get('passwordCheck')) {
      setPasswordCheckError({state: true, message: 'Password is different'})
      return;
    }

    const dataObj = Object.fromEntries(data.entries());
    const json = JSON.stringify(dataObj)

    setPasswordCheckError({state: false, message: ''});
    axios.put('/api/auth/createUser', json, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
      // console.log('response: ', response);
      // console.log(response.status == 200)
      setDialogOpen(true);
    })
    .catch((error)=>{
      const res = JSON.parse(error.request.response) 
      console.error('error res: ', res);
      if (res.message.indexOf('Email') > -1) {
        setEmailError({state: true, message: res.message})
      }
    });
  };
  const handleInputInvalid = (event) => {
    switch (event.target.id) {
      case 'userName':
        setUsernameError({state: true, message:'2 to 16 characters'})
        break;
      case 'password':
        setPasswordError({state: true, message:'least 8 characters, has number, lowercase letter, uppercase letter'})
        break;
    }

  }
  const handlePasswordVisible = (event) => {
    event.preventDefault();
    if(event.type === 'mousedown') setPasswordVisible(true)
    if(event.type === 'mouseup') setPasswordVisible(false)
    if(event.type === 'mouseout') setPasswordVisible(false)
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate('/signin')
  };

  const renderPasswordTextField = () => <TextField
    required
    fullWidth
    name="password"
    label="Password"
    type={passwordVisible==true?"text":"password"}
    id="password"
    autoComplete="new-password"
    InputProps={{endAdornment: (
      <InputAdornment position="end">
        <VisibilityIcon sx={{cursor: 'pointer'}} 
          onMouseDown={handlePasswordVisible}
          onMouseUp={handlePasswordVisible}
          onMouseOut={handlePasswordVisible}  />
      </InputAdornment>
    )}}
    inputProps={{pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}"}}
    onInvalid={handleInputInvalid}
    error={passwordError.state}
    helperText={passwordError.message}
  />;
  const renderDialog = () =>  <Dialog
    open={dialogOpen}
    onClose={handleDialogClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      Sign Up completed!
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        You can login now, don't forget verify your email. If you have no verify your email, you cannot register a device, and we will remove your account in 3 days. 
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleDialogClose} autoFocus>
        Confirm
      </Button>
    </DialogActions>
  </Dialog>;

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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="User Name"
                autoFocus
                inputProps={{maxLength: 16, minLength:2}}
                onInvalid={handleInputInvalid}
                error={usernameError.state}
                helperText={usernameError.message}
                placeholder='We will display this name in our website'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type='email'
                inputProps={{pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'}}
                helperText={emailError.message}
                error={emailError.state}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="full-name"
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                inputProps={{maxLength: 16, minLength:2}}
                onInvalid={handleInputInvalid}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="tel"
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                id="zipCode"
                label="Zip Code"
                name="zipCode"
                autoComplete="zip"
                type='text'
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                type='text'
              />
            </Grid>
            <Grid item xs={12}>
              {renderPasswordTextField()}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="passwordCheck"
                label="Password Check"
                type="password"
                id="passwordCheck"
                onInvalid={handleInputInvalid}
                helperText={passwordCheckError.message}
                error={passwordCheckError.state}
              />
            </Grid>
              <Grid item xs={12}>
              <Box component="span">
                * You will not receive any marketing promotions or updates from us via email.
              </Box>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, fontSize: '2em'}}
          >
            Sign Up
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            href="/api/auth/google"
            sx={{ mt: 3, mb: 2 , fontSize: '2em'}}
          >
            Sign Up With Google
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signin" variant="body2" component={RLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
        {/* <FormControl variant='filled' onSubmit={handleSubmit} sx={{ mt: 3 }}>
        </FormControl> */}
      </Box>
      <Copyright sx={{ mt: 5 }} />
      {renderDialog()}
    </Container>
  );
}
