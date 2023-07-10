import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Tooltip, Box, Grid, Link, Button, IconButton} from '@mui/material';
import { Stack, Card, CardHeader, CardContent, CardActions, Typography} from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { NewDeviceDialog } from '../components/dialog/new-device.jsx';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useAuth } from '../hooks/use-auth.jsx';

export default function Devices() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [emailState, setEmailState] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [rememberState, setRememberState] = useState(false);
  const auth = useAuth();

  let email = null;

  useEffect(()=>{
    if (localStorage.getItem('userEmail') !== null) {
      email = localStorage.getItem('userEmail');
      setEmailState(localStorage.getItem('userEmail'));
      setRememberState(true);
    }
  },[]);

  useEffect(() => {
    if (!auth.isSignIn) return;
    findAllByUser();
  },[auth.isSignIn]);

  useEffect(() => {
    console.log('[device] be updated', devices);
  },[devices]);

  const DeviceCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 268,
  }));

  const onCloseHandler = () => {
    console.log('onCloseHandler');
    setOpenDialog(false);
  };
  const dialogOpenHandler = () => {
    setOpenDialog(true);
  };

  const findAllByUser = async (user) => {
    axios.get('/api/devices/findAllByUser', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    }).then((response) => {
      setDevices(response.data)
    }).catch(error => {
      const res = JSON.parse(error.request.response) 
      console.error('[device]', res.message)
    });

  }
  const deviceList = () => {
    return devices.map(device => (
      <DeviceCard key={"device-"+device.deviceId} variant="outlined">
        <CardHeader title={device.alias.length>0 ? device.alias : device.deviceId} />
        <CardContent>
          <Typography>
            <span>{device.createdTime}</span>
          </Typography>
        </CardContent>
        <CardActions >
          <Button sx={{marginRight: '90px'}} >subscribe</Button>
          <IconButton>
            <DeleteForeverIcon  />
          </IconButton>
        </CardActions>
      </DeviceCard>)
    );
  };

  const containerStyle =  {
    width: '100%',
    // minWidth: '100%',
    position: 'absolute',
    // left: '20%',
    // top: '20%',
    // translate: '-50% -50% 0',
    
    // overflow: 'scroll',
    border: '2px dashed grey',
  };
  
  return (
    <Container component="div"  maxWidth="md" sx={containerStyle}>
    {/* <div style={containerStyle} > */}
      <h1 style={{padding: '0 16px'}}>
        Delivery Box
        <Tooltip title="Register A New One">

          <IconButton color="secondary" onClick={dialogOpenHandler}  onClose={onCloseHandler}>
            <LibraryAddIcon fontSize="large"/>
          </IconButton>
        </Tooltip>
      </h1>
      <Stack 
        direction='row'
        spacing={{ xs: 1, sm: 2, md: 2 }}>
        {deviceList()}
      </Stack>
      <NewDeviceDialog open={openDialog} onClose={onCloseHandler} callback={findAllByUser}/>
    {/* </div> */}
    </Container>
  );
}
