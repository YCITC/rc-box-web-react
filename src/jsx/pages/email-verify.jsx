import React, { useEffect, useState } from 'react';
import { Link as RLink, useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';

import { Typography} from '@mui/material';
import { Container, Box, Grid, Link} from '@mui/material';

import Copyright from '../components/copyright.jsx';
import { LogoMain } from '../components/logos.jsx';


export default function EmailVerify() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [timer, setTimer] = useState();

  document.title = 'RC Box - Email Verification';
  useEffect(()=>{
    if (searchParams.has('t') === false) return;
    const oneDayToken = searchParams.get('t');
    const url = `/api/auth/emailVerify/${oneDayToken}`;
    axios.get(url).then((res)=>{
      if (res.data == true) {
        setTimer(5);
      }
    })
  },[]);

  useEffect(() => {
    console.log('timer: ', timer);
    if (timer === 0) navigate("/signin");
    if (timer === undefined || timer === 0) return;
      setTimeout(() => {
      setTimer(timer-1);
    }, 1000);
  }, [timer]);

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
            <Typography variant="subtitle1" paragraph  sx={{width: '100%'}}>
              Congratulations! Your email verification has been successfully completed.
            </Typography>
            <Typography variant="subtitle2" paragraph  sx={{width: '100%'}}>
              Thank you for your cooperation. You can now start using our services.
            </Typography>
            <Typography variant="body2" paragraph  sx={{width: '100%'}}>
            We will redirect you to the login page in {timer!==undefined?timer:'5'} seconds. 
              <Link to="/signin" variant="body2" component={RLink} sx={{ml: '10px'}}>
                Or goto Sign in page
              </Link>
            </Typography>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
