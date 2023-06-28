import React, { useState } from "react";
import { Box, Divider, Drawer, Stack, SvgIcon, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import { Button, TextField, Backdrop, CircularProgress } from '@mui/material';
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';


export const NewDeviceDialog = (props) => {
  const { open, onClose } = props;
  const [ backdropOpen, setBackdropOpen ] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submit')
    setBackdropOpen(true);

    // call API to create a new device;
    setTimeout(() => {
      setBackdropOpen(false);
      onClose();
    }, 2000);
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
      </Box>
    </Dialog>
  );
}

NewDeviceDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
}