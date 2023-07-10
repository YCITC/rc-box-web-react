import React, {useState, useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import { Button, Typography, Container } from '@mui/material';



export default function LandingPage() {
  const [userInfo, setUserInfo] = useState({
    name: 'Mark',
    phone: '0912123123'
  });

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
    textAlign: 'center',
  };
  
  const typographyStyle = {
    // border: '1px dashed grey',
    p: 2,
    textAlign: 'center',
  }
  return (
    <Container  component="div"  maxWidth="sm" sx={containerStyle}>
      <h1 style={{padding: '0 16px'}}>TO KEEP YOUR PACKAGE SAVED</h1>
      <Typography className='typography' sx={typographyStyle}>
        <Button variant="contained" 
          color="primary"
          sx={{ p: 2, border: '1px dashed grey', width: '100%', fontSize: '24px'}} 
          href="/signup">
          SIGN UP
        </Button>
      </Typography>
    </Container>
  );
}
