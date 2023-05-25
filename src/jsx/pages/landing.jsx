import React, {useState, useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import { Button, Typography, Container } from '@mui/material';
import Copyright from '../components/Copyright.jsx';



export default function LandingPage() {
  const [userInfo, setUserInfo] = useState({
    name: 'Mark',
    phone: '0912123123'
  });

  const [paramA, setParamA] = useState(1);
  const [paramB, setParamB] = useState(1);
  

  useEffect(()=> {
    console.log('Initial;')
    document.title = 'RC Box - Landing';
  }, []);

  const containerStyle =  {
    // border: '1px dashed grey',
    width: '100%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    translate: '-50% -50% 0',
  };
  
  const typographyStyle = {
    // border: '1px dashed grey',
    p: 2,
    textAlign: 'center',
  }
  return (
    <Container  component="div"  maxWidth="sm" sx={containerStyle}>
      <Typography className='typography' sx={typographyStyle}>
        <h1>TO KEEP YOUR PACKAGE SAVED</h1>
        <Button variant="contained" 
          color="primary"
          sx={{ p: 2, border: '1px dashed grey', width: '100%' }} 
          href="/signup">
          SIGN UP
        </Button>
      </Typography>
      <Copyright sx={{ mt: 1 }} />
    </Container>
  );
}
