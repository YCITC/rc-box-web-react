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
import { useBroserInfo } from '../helper/browser-info.jsx';
import { urlB64ToUint8Array } from '../helper/web-push-notify.jsx';


export default function Devices() {
  document.title = 'SHUOO A';
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openUnbindDialog, setOpenUnbindDialog] = useState(false);
  const [allowNotify, setAllowNotify] = useState(false);
  const [theUnbindDevice, setTheUnbindDevice] = useState(null);
  const auth = useAuth();
  const theme = useTheme();
  const browserInfo = useBroserInfo();


  useEffect(() => {
    if (browserInfo.name === 'Chrome') setAllowNotify(true);
  }, []);

  useEffect(() => {
    if (!auth.isSignIn) return;
    findAllByUser();
  }, [auth.isSignIn]);

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
      setDevices(response.data);
    }).catch(error => {
      const res = JSON.parse(error.request.response);
      console.error('[device]', res.message);
    });
  };

  const unBindConfirm = (device) => {
    setTheUnbindDevice(device);
    setOpenUnbindDialog(true);
  };

  const subscribe = async (device) => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const swRes = await navigator.serviceWorker.register('sw.js');
        const vapidResp = await axios.get('/api/push/genChromeVAPID/', {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.token
          }
        });
        const vapid = vapidResp.data;

        const applicationServerKey = urlB64ToUint8Array(vapid.publicKey);
        const subscription = await swRes.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey
        });

        let jString = JSON.stringify(subscription);
        let jObj = JSON.parse(jString);
        // console.log('subscription', subscription);
        // console.log('jObj\t', jObj);

        let registerPushInfo = {
          "deviceId": device.deviceId,
          "browserVersion": browserInfo.version,
          "vapidPublicKey": vapid.publicKey,
          "vapidPrivateKey": vapid.privateKey,
          "endpoint": jObj.endpoint,
          "keysAuth": jObj.keys.auth,
          "keysP256dh": jObj.keys.p256dh,
        };

        const subscribeResp = await axios.post('/api/push/subscribe/chrome', registerPushInfo, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.token
          }
        });
        // console.log('subscribeResp: ', subscribeResp)
      } catch (error) {
        console.error('Service Worker Error', error);
      }
    }
  };

  const unBindTheDevice = (device) => {
    return axios.delete('/api/devices/unbind/' + device.deviceId, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    });
  }

  const renderDeviceList = () => {
    return devices.map(device => {
      return <DeviceCard key={"device-" + device.deviceId}
        device={device}
        allowNotify={allowNotify}
        unBindConfirm={(device) => unBindConfirm(device)}
        reflashDevices={findAllByUser}
        subscribe={(device) => subscribe(device)}
      />;
    });
  };

  const containerStyle = {
    position: 'static',
    paddingTop: '10px',
    // border: '2px dashed grey',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1190px',
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: '5px',
    },
    [theme.breakpoints.down('sm')]: {
      // paddingLeft: '50px',
      width: '70%',
      margin: '0 auto',
    }
  };
  const subtitleStyle = {
    padding: '0px 16px',
    height: '1.5em',
    lineHeight: '1.5em',
  };
  const stackStyle = {
    width: '100%',
    // [theme.breakpoints.up('lg')]: {
    //   maxWidth: '1000px',
    // }
  };
  return (
    <Container component="div" maxWidth="lg" sx={containerStyle}>
      <h1 style={subtitleStyle}>
        Delivery Box
        <Tooltip title="Register A New One">
          <IconButton color="secondary" onClick={dialogOpenHandler} sx={{position: 'relative',left: '20px', top: '-2px'}}>
            <LibraryAddIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </h1>
      <Stack sx={stackStyle} direction='row' useFlexGap flexWrap="wrap" spacing={0}
        alignItems="flex-start" justifyContent="flex-start"
        className="devices-stack"
      >
        {renderDeviceList()}
      </Stack>
      <NewDeviceDialog open={openDialog} onClose={() => { setOpenDialog(false) }} callback={findAllByUser} />
      <UnbindDeviceConfirmDialog open={openUnbindDialog} device={theUnbindDevice} onClose={() => { setOpenUnbindDialog(false) }} onConfirm={async () => unBindTheDevice(theUnbindDevice)} reflashDevices={findAllByUser} />
    </Container>
  );
};
