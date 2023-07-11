import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { Container, Tooltip, Stack, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import axios from 'axios';

import NewDeviceDialog from '../components/dialog/new-device.jsx';
import UnbindDeviceConfirmDialog from '../components/dialog/unbind-device.jsx';
import { useAuth } from '../hooks/use-auth.jsx';
import DeviceCard from '../components/device-card.jsx';


export default function Devices() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUnbindDialog, setOpenUnbindDialog] = useState(false);
  const [allowNotify, setAllowNotify] = useState(false);
  const [theUnbindDevice, setTheUnbindDevice ] = useState(null);
  const auth = useAuth();
  const theme = useTheme();

  const getBrowserInfo = ()=>{
    let bowserInfo = {
      'name': '',
      'version': '',
    }
    if (navigator.userAgentData !== undefined) {
      bowserInfo.name = 'Chrome';
      navigator.userAgentData.brands.every((info) => {
        if (info.brand == 'Google Chrome') {
          bowserInfo.version = info.version;
          return;
        }
        return true;
      });
      return bowserInfo;
    }

    const infoList = navigator.userAgent.split(' ');
    infoList.every((info)=>{
      if (info.indexOf('Safari') > -1) {
        bowserInfo.name = 'Safari';
        bowserInfo.version = info.split('/')[1];
      }
      if (info.indexOf('Firefox') > -1) {
        bowserInfo.name = 'Firefox'
        bowserInfo.version = info.split('/')[1]
        return;
      }
      return true;
    })
    return bowserInfo;
  };

  useEffect(() => {
    let browserInfo = getBrowserInfo();
    if (browserInfo.name === 'Chrome') setAllowNotify(true);
  }, []);

  useEffect(() => {
    if (!auth.isSignIn) return;
    findAllByUser();
  },[auth.isSignIn]);

  // useEffect(() => {
  //   console.log('[device] be updated', devices);
  // },[devices]);


  const dialogOpenHandler = () => {
    setOpenDialog(true);
  };

  const findAllByUser = (user) => {
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
  };

  const unBindConfirm = (device) => {
    
    setTheUnbindDevice(device);
    setOpenUnbindDialog(true);

  }
  const unBindTheDevice = (device) => {
    return axios.delete('/api/devices/unbind/'+device.deviceId, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    });
  }

  const renderDeviceList = () => {
    return devices.map(device => {
      return <DeviceCard key={"device-"+device.deviceId} device={device} allowNotify={allowNotify} unBindConfirm={(device)=>unBindConfirm(device)} reflashDevices={findAllByUser}/>;
    });
  };

  const containerStyle =  {
    position: 'static',
    // border: '2px dashed grey',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1190px',
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: '5px',
    }
  };
  const stackStyle = {
    width: '100%',
    // [theme.breakpoints.up('lg')]: {
    //   maxWidth: '1000px',
    // }
  };
  
  return (
    <Container component="div"  maxWidth="lg" sx={containerStyle}>
    {/* <div style={containerStyle} > */}
      <h1 style={{padding: '0 16px'}}>
        Delivery Box
        <Tooltip title="Register A New One">
          <IconButton color="secondary" onClick={dialogOpenHandler}>
            <LibraryAddIcon fontSize="large"/>
          </IconButton>
        </Tooltip>
      </h1>
      <Stack sx={stackStyle} direction='row' useFlexGap flexWrap="wrap" spacing={0}
        alignItems="flex-start" justifyContent="flex-start"
        className="devices-stack" 
        >
        {renderDeviceList()}
      </Stack>
      <NewDeviceDialog open={openDialog} onClose={()=>{setOpenDialog(false)}} callback={findAllByUser}/>
      <UnbindDeviceConfirmDialog open={openUnbindDialog}  device={theUnbindDevice} onClose={()=>{setOpenUnbindDialog(false)}} onConfirm={async ()=>unBindTheDevice(theUnbindDevice)} reflashDevices={findAllByUser} />
    {/* </div> */}
    </Container>
  );
};
