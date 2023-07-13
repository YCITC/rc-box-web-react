import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Tooltip, Button, IconButton } from '@mui/material';
import { Card, CardHeader, CardContent, CardActions, Typography} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const DeviceCard = ({device, allowNotify, subscribe, unBindConfirm}) => {
  const theme = useTheme();
  device.createdDate = new Date(device.createdTime).toLocaleDateString();

  const removeDevice = () => {
    unBindDevice(device.deviceId);
  };

  const cardStyle = {
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minWidth: 258,
    marginBottom: '8px',
    marginRight: '8px',
    // '& .MuiCard-root': {
    //   marginLeft: 0,
    // },
  }

  return <Card variant="outlined" sx={cardStyle}>
    <CardHeader title={device.alias.length>0 ? device.alias : device.deviceId} />
    <CardContent>
      <Typography sx={{textAlign: 'left'}}>
        <span>Registration date: {device.createdDate}</span>
      </Typography>
    </CardContent>
    <CardActions sx={{flexDirection: allowNotify?'':'row-reverse'}}>
      {allowNotify? 
      <Tooltip title="Subscribe Notification" >
        <Button onClick={()=>subscribe(device)} sx={{marginRight: '101px'}}>subscribe</Button>
      </Tooltip>: <></>}
      <Tooltip title="Remove">
        <IconButton onClick={()=>unBindConfirm(device)} >
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
    </CardActions>
  </Card>
};


DeviceCard.propTypes = {
  device: PropTypes.object,
  allowNotify: PropTypes.bool,
  unBindDevice: PropTypes.func,
}

export default DeviceCard;