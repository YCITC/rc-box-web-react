import React, { useState } from "react";
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { Button, Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';


const UnbindDeviceConfirmDialog = (props) => {
  const { open, onClose, onConfirm, device , reflashDevices } = props;
  const [ backdropOpen, setBackdropOpen ] = useState(false);
  const [ errorAlertOpen, setErrorAlertOpen ] = useState(false);
  const [ errorAlertMessage, setErrorAlertMessage ] = useState('');

  const clickConfirm = async () => {
    setBackdropOpen(true);

    try {
      const asyncFn =  onConfirm();
      asyncFn.then((result)=>{
        // console.log(result)
        if (result.data) {
          setBackdropOpen(false);
          onClose();
          reflashDevices();
        };
      })
    } catch (error) {
      console.error('[unbind-device][error]', error.response.data.message);
      setErrorAlertMessage(error.response.data.message);
      setErrorAlertOpen(true);
      setTimeout(() => {
        onClose();
        setBackdropOpen(false);
      }, 500);
    }
  };
  if (!device) return;
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove A Delivery Box?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You went to remove the delivery box "{device.alias.length>0 ? device.alias : device.deviceId}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} autoFocus>Cancel</Button>
          <Button onClick={clickConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.dialog + 1}}
        open={backdropOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar open={errorAlertOpen}  autoHideDuration={1000}>
          <Alert severity="error" onClose={() => {setErrorAlertOpen(false)}}>
            {errorAlertMessage}
          </Alert>
        </Snackbar>
    </>
  );
}

UnbindDeviceConfirmDialog.propTypes = {
  open: PropTypes.bool,
  device: PropTypes.object,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  reflashDevices: PropTypes.func,
}

export default UnbindDeviceConfirmDialog;
