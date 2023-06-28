import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { Container, SvgIcon, Tooltip, Box, Grid, Link, Button, IconButton} from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import {NewDeviceDialog} from '../components/dialog/new-device.jsx';

export default function Devices() {
  const navigate = useNavigate();
  const [emailState, setEmailState] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [rememberState, setRememberState] = useState(false);

  useEffect(()=>{
    if (localStorage.getItem('userEmail') !== null) {
      email = localStorage.getItem('userEmail');
      setEmailState(localStorage.getItem('userEmail'))
      setRememberState(true);
    }
  },[])

  const onCloseHandler = () => {
    console.log('onCloseHandler')
    setOpenDialog(false)
  }
  const dialogOpenHandler = () => {
    setOpenDialog(true)
  }

  const containerStyle =  {
    // border: '1px dashed grey',
    width: '100%',
    position: 'absolute',
    // left: '20%',
    // top: '20%',
    // translate: '-50% -50% 0',
  };
  
  return (
    <Container  component="div"  maxWidth="sm" sx={containerStyle}>
      <h1 style={{padding: '0 16px'}}>
        Delivery Box
        <Tooltip title="Register A New One">

          <IconButton color="secondary" onClick={dialogOpenHandler}  onClose={onCloseHandler}>
            <LibraryAddIcon fontSize="large"/>
          </IconButton>
        </Tooltip>
      </h1>
      <NewDeviceDialog open={openDialog} onClose={onCloseHandler}/>
    </Container>
  );
}
