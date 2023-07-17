import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth } from '../hooks/use-auth.jsx';

export default function DeliveryLogs() {
  const auth = useAuth();
  const theme = useTheme();

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'deviceId',
      headerName: 'Device ID',
      width: 150,
      editable: false,
    },
    {
      field: 'alias',
      headerName: 'Alias',
      width: 120,
      editable: false,
    },
    {
      field: 'createdTime',
      headerName: 'Time',
      width: 300,
      editable: true,
    },
  ];

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (auth.token === null) return; 
    prepareLogs();
  }, [auth.token])

  const prepareLogs = async() => {
    const devicesResponse = await axios.get('/api/devices/findAllByUser', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    });
    
    const devices = devicesResponse.data;
    // console.log('[DeliveryLogs] devices: ', devices);
    let logsPromiseArray = [];
    devices.forEach((device) => {
      let logsPromise = axios.get('/api/log/get/'+device.deviceId, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + auth.token
        }
      });
      logsPromiseArray.push(logsPromise);
    });

    let tempArray = [];
    const responses = await Promise.all(logsPromiseArray);
    responses.forEach((response) => {
      response.data.map((log) => {
        devices.forEach((device) => {
          if (!device.alias || device.alias.length === 0) return;
          log.alias = (device.deviceId === log.deviceId? device.alias: '');
        });
        log.createdTime = new Date(log.time).toLocaleString();
      })
      tempArray = tempArray.concat(response.data);
    });
    setLogs(tempArray);
  }

  const containerStyle = {
    position: 'static',
    paddingTop: '10px',
    width: '100%',
    position: 'absolute',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '800px',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '800px',
      paddingRight: '5px',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: '620px',
    }
  };
  const subtitleStyle = {
    padding: '0px 16px',
    height: '1.5em',
    lineHeight: '1.5em',
  };

  return (
    <Container component="div" maxWidth="md" sx={containerStyle}>
      <h1 style={subtitleStyle}>Delivery Logs</h1>
      <DataGrid initialState={{
        pagination: { paginationModel: { pageSize: 25 } },
        sorting: {
          sortModel: [{ field: 'createdTime', sort: 'desc' }],
        },
      }} 
      rows={logs} columns={columns} getRowId={(row) => row.id}/>
    </Container>
  );
}
