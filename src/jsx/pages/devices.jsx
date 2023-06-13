import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box, Grid, Link, Checkbox, Avatar, Button} from '@mui/material';



export default function Devices() {
  const navigate = useNavigate();
  const [emailState, setEmailState] = useState('');
  const [openSnackbarState, setOpenSnackbarState] = useState({open: false, message: ''});
  const [rememberState, setRememberState] = useState(false);

  useEffect(()=>{
    if (localStorage.getItem('userEmail') !== null) {
      email = localStorage.getItem('userEmail');
      setEmailState(localStorage.getItem('userEmail'))
      setRememberState(true);
    }
  },[])

  return (
    <Container component="main" maxWidth="xs">
      <h1>devices</h1>
    </Container>
  );
}
