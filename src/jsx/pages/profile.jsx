import React, { useEffect, useRef, useState } from 'react';
import { Link as RLink, useNavigate } from "react-router-dom";
import axios from 'axios';

import { useTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { Container, Box, Divider, Button} from '@mui/material';
import { Snackbar, Alert  } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';

import { useAuth } from '../hooks/use-auth.jsx';
import Copyright from '../components/copyright.jsx';
import TextFieldPassword from '../components/text-field/password.jsx';

export default function Profile() {
  document.title = 'SHUOO A - Profile';
  const auth = useAuth();
  const theme = useTheme();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSnackbarState, setOpenSnackbarState] = useState({open: false, severity: '', message: ''});
  const [openPasswordBlock, setOpenPasswordBlock] = useState(false);
  const [profileState, setProfileState] = useState(undefined);
  const [oldPasswordError, setOldPasswordError] = useState({state: false, message: ''});
  const [newPasswordError, setNewPasswordError] = useState({state: false, message: ''});
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState({state: false, message: ''});

  const profileSnapshot = useRef();
  const buttonRef = useRef();

  const getProfile = () => {
    axios.get('/api/auth/profile', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    }).then((response) => {
      console.log('profile: ', response.data)
      profileSnapshot.current = response.data
      setProfileState(response.data)
    }).catch(error => {
      const res = JSON.parse(error.request.response);
      console.error('[device]', res.message);
    });
  };

  const updateProfile = (profile) => {
    console.log('updating profile');
    const jsonObj = JSON.stringify(profile)
    axios.post('/api/auth/updateProfile', jsonObj, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    }).then((response) => {
      // setDevices(response.data);
      console.log('response: ', response.data)
      // setProfileState(response.data)
    }).catch(error => {
      const res = JSON.parse(error.request.response);
      console.error('[device]', res.message);
    });
  }

  const expandPasswordBlock = () => {
    if (openPasswordBlock) {
      setOpenPasswordBlock(false);
    } else {
      setOpenPasswordBlock(true);
      setTimeout(() => {
        buttonRef.current?.scrollIntoView({behavior: "smooth"})
      }, 300);
    }
  }
  const handleChangePassword = (event) => {
    event.preventDefault();
    setOldPasswordError({state: false, message: ''});
    setNewPasswordError({state: false, message: ''});
    setConfirmNewPasswordError({state: false, message: ''});
    const data = new FormData(event.currentTarget);

    if (data.get('newPassword') !== data.get('confirmNewPassword')) {
      setConfirmNewPasswordError({state: true, message: 'Password is different'})
      return;
    }

    const dataObj = Object.fromEntries(data.entries());
    const json = JSON.stringify(dataObj)

    console.log('call api /api/auth/changePassword')

    setOpenBackdrop(true);
    axios.post('/api/auth/changePassword', json, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    })
    .then((response)=>{
      // console.log('response: ', response);
      // console.log(response.status == 200)
      setOpenPasswordBlock(false);
      setOpenBackdrop(false);
      setOpenSnackbarState({open: true, senverity: 'success', message: "Change Password Successfully"})
    })
    .catch((error)=>{
      setOpenBackdrop(false);
      console.log('error: ', error);
      if (error.request.response) {
        const res = JSON.parse(error.request.response) 
        console.error('error res: ', res);
        if (res.error === 'Unauthorized') {
          setOldPasswordError({state: true, message: res.message})
        } else if (res.error === 'BadRequest') {
          if (res.message.indexOf('same password') > -1) {
            setNewPasswordError({state: true, message: res.message})
          } else {
            setConfirmNewPasswordError({state: true, message: res.message})
          }
        }
      }
    });
  };

  useEffect(() => {
    if (!auth.isSignIn) return;
    getProfile()
  }, [auth.isSignIn]);

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
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="div" sx={{ mt: 1 }}>
          <Box component="p">
            Profile
          </Box>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Display Name"
            name="username"
            autoComplete="username"
            value={profileState?profileState.username: ''}
            onChange={(event) => setProfileState({...profileState, username: event.target.value})}
            onBlur={() => {profileSnapshot.current.username !== profileState.username?updateProfile(profileState):null}}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type='email'
            inputProps={{pattern: '^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$'}}
            value={profileState?profileState.email: ''}
            onChange={(event) => setProfileState({...profileState, email: event.target.value})}
            onBlur={() => {profileSnapshot.current.email !== profileState.email?updateProfile(profileState):null}}
            disabled={true}
            // helperText={}
            // error={}
          />
          <TextField
            margin="normal"
            fullWidth
            id="fullname"
            label="Full Name"
            name="fullname"
            autoComplete="fullname"
            value={profileState?profileState.fullName: ''}
            onChange={(event) => setProfileState({...profileState, fullName: event.target.value})}
            onBlur={() => {profileSnapshot.current.email !== profileState.email?updateProfile(profileState):null}}

          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="phone"
            value={profileState?profileState.phoneNumber: ''}
            onChange={(event) => setProfileState({...profileState, phoneNumber: event.target.value})}
            onBlur={() => {profileSnapshot.current.phoneNumber !== profileState.phoneNumber?updateProfile(profileState):null}}
          />
          <TextField
            margin="normal"
            fullWidth
            id="zip"
            label="Zip Code"
            name="zipCode"
            autoComplete="zip"
            type='text'
            value={profileState?profileState.zipCode: ''}
            onChange={(event) => setProfileState({...profileState, zipCode: event.target.value})}
            onBlur={() => {profileSnapshot.current.zipCode !== profileState.zipCode?updateProfile(profileState):null}}
          />
          <TextField
            margin="normal"
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
            type='text'
            value={profileState?profileState.address: ''}
            onChange={(event) => setProfileState({...profileState, address: event.target.value})}
            onBlur={() => {profileSnapshot.current.address !== profileState.address?updateProfile(profileState):null}}
          />
          <Divider />
          <Box component="form" onSubmit={handleChangePassword} sx={
            { 
              mt: 1, 
              transition: 'height 0.5s', 
              overflow: 'hidden', 
              height: openPasswordBlock?'350px':'40px',
            }}>
            <Button variant={openPasswordBlock?"outlined":"contained"}
              onClick={expandPasswordBlock}
            >
              Change Password
            </Button>
            <TextFieldPassword
              margin="normal"
              fullWidth
              id="oldPassword"
              name="oldPassword"
              label="Old Password"
              type='password'
              inputProps={{}}
              helperText={oldPasswordError.message}
              error={oldPasswordError.state}
            />
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
            <Button variant="contained"
              ref={buttonRef}
              // type="submit"
              onClick={
                (event) => {
                  setOpenSnackbarState({open: true, senverity: 'success', message: "Change Password Successfully"})
                }
              }
            >
              Confirm New Password
            </Button>
          </Box>
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
