import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box, Grid, Link, Checkbox, Avatar, Button} from '@mui/material';



export default function DeliveryLogs() {
  const navigate = useNavigate();
  const [emailState, setEmailState] = useState('');
  const [rememberState, setRememberState] = useState(false);

  useEffect(()=>{
    if (localStorage.getItem('userEmail') !== null) {
      email = localStorage.getItem('userEmail');
      setEmailState(localStorage.getItem('userEmail'))
      setRememberState(true);
    }
  },[])

  const containerStyle =  {
    // border: '1px dashed grey',
    width: '100%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    translate: '-50% -50% 0',
  };
  
  return (
    <Container  component="div"  maxWidth="sm" sx={containerStyle}>
      <h1 style={{padding: '0 16px'}}>DeliveryLogs</h1>
    </Container>
  );
}
