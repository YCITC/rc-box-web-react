import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Tooltip, Button, IconButton } from '@mui/material';
import { Card, CardHeader, CardContent, CardActions, Typography} from '@mui/material';
import { Edit, DeleteForever } from '@mui/icons-material';
import EditDeviceDialog from './dialog/edit-device.jsx';

const DeviceCard = ({device, allowNotify, subscribe, reflashDevices, unBindConfirm}) => {
  const theme = useTheme();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  device.createdDate = new Date(device.createdTime).toLocaleDateString();

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
    <CardActions sx={{float: allowNotify?'':'right'}}>
      {allowNotify? 
      <Tooltip title="Subscribe Notification" >
        <Button onClick={()=>subscribe(device)} sx={{marginRight: '101px'}}>subscribe</Button>
      </Tooltip>: <></>}

      <Tooltip title="Edit">
        <IconButton onClick={()=>setOpenEditDialog(true)} >
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Remove">
        <IconButton onClick={()=>unBindConfirm(device)} >
          <DeleteForever/>
        </IconButton>
      </Tooltip>
    </CardActions>
    <EditDeviceDialog device={device} open={openEditDialog} onClose={()=>setOpenEditDialog(false)} reflashDevices={reflashDevices}/>
    {/* 
    
  const { open, onClose, device, callback} = props;
    */}
  </Card>
};


DeviceCard.propTypes = {
  device: PropTypes.object,
  allowNotify: PropTypes.bool,
  unBindDevice: PropTypes.func,
}

export default DeviceCard;