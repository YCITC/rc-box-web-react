import React, { useState } from "react";
import { Box, Divider, Drawer, Stack, SvgIcon, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { Button, TextField, Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import axios from "axios";
import { useAuth } from "../../hooks/use-auth.jsx";


const NewDeviceDialog = (props) => {
  const { open, onClose, callback } = props;
  const [ backdropOpen, setBackdropOpen ] = useState(false);
  const [ errorAlertOpen, setErrorAlertOpen ] = useState(false);
  const [ errorAlertMessage, setErrorAlertMessage ] = useState('');
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBackdropOpen(true);
    const data = new FormData(event.currentTarget);
    const dataObj = Object.fromEntries(data.entries());
    let json = {};
    dataObj.ownerUserId = auth.user.id;
    try {
      json = JSON.stringify(dataObj)
    }
    catch (error) {
      console.error(error)
      setOpenBackdrop(false);
      return;
    }

    axios.put('/api/devices/bind', json, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    }).then((response) => {
      console.log('[new-device]', response);
      if (response.status == 200) {
        setBackdropOpen(false);
        onClose();
        callback();
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
            autoFocus
            fullWidth
            // variant="outlined"
            id="deviceId"
            name="deviceId"
            label="Device ID"
          />
          <FormHelperText id="deviceId">Device ID On the White Box</FormHelperText>

          <TextField
            margin="normal"
            fullWidth
            // variant="outlined"
            id="alias"
            name="alias"
            label="Alias"
            autoComplete="alias"
          />
        {/* <DialogContentText>
        </DialogContentText> */}
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

NewDeviceDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
}

export default NewDeviceDialog;
