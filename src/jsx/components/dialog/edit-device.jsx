import React, { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

import { Box, Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { Button, TextField, Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';
import { FormHelperText } from '@mui/material';
import { useAuth } from "../../hooks/use-auth.jsx";


const EditDeviceDialog = (props) => {
  const { device, open, onClose, reflashDevices} = props;
  const [ backdropOpen, setBackdropOpen ] = useState(false);
  const [ errorAlertOpen, setErrorAlertOpen ] = useState(false);
  const [ errorAlertMessage, setErrorAlertMessage ] = useState('');
  const [newAlias, setNewAlias] = useState(device.alias)
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBackdropOpen(true);
    const data = new FormData(event.currentTarget);
    const dataObj = Object.fromEntries(data.entries());
    let json = {};
    dataObj.ownerUserId = auth.user.id;
    dataObj.deviceId = device.deviceId;
    try {
      json = JSON.stringify(dataObj)
    }
    catch (error) {
      console.error(error)
      setOpenBackdrop(false);
      return;
    }

    axios.patch('/api/devices/update', json, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    }).then((response) => {
      console.log('[new-device]', response);
      if (response.status == 200) {
        setBackdropOpen(false);
        onClose?.();
        reflashDevices?.();
      }

    }).catch(error => {
      const res = JSON.parse(error.request.response) 
      // console.error('[new-device]', res.message)
      setErrorAlertMessage(res.message);
      setErrorAlertOpen(true);
      setBackdropOpen(false);
      
    });

  }
  return (
    <Dialog open={open} onClose={onClose} sx={{zIndex: (theme) => theme.zIndex.dialog}}>
      <Box component="form" onSubmit={handleSubmit} >
        <DialogTitle>Register New Delivery Box'</DialogTitle>

        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            // variant="outlined"
            id="deviceId"
            name="deviceId"
            label="Device ID"
            disabled={true}
            value={device.deviceId.toString()}
          />
          <FormHelperText id="deviceId">Device ID On the White Box</FormHelperText>

          <TextField
            autoFocus
            margin="normal"
            fullWidth
            // variant="outlined"
            id="alias"
            name="alias"
            label="Alias"
            autoComplete="alias"
            onChange={(e)=>setNewAlias(e.target.value)}
            value={newAlias}
          />
        </DialogContent>
        <DialogActions > 
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" >Confirm</Button>
        </DialogActions>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.dialog + 1}}
          open={backdropOpen}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar open={errorAlertOpen}  autoHideDuration={1000}>
          <Alert severity="error" onClose={() => {setErrorAlertOpen(false)}}>
            {errorAlertMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Dialog>
  );
}

EditDeviceDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  device: PropTypes.object,
};

export default EditDeviceDialog;
