import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useAuth } from '../hooks/use-auth.jsx';

export default function DeliveryLogs() {
  const auth = useAuth();
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'alias',
      headerName: 'Alias',
      width: 100,
      editable: false,
    },
    {
      field: 'deviceId',
      headerName: 'Device ID',
      width: 150,
      editable: false,
    },
    {
      field: 'createdTime',
      headerName: 'Time',
      width: 400,
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
    // border: '1px dashed grey',
    width: '100%',
    position: 'absolute',
    // left: '50%',
    // top: '50%',
    // translate: '-50% -50% 0',
  };

  return (
    <Container component="div" maxWidth="md" sx={containerStyle}>
      <h1 style={{ padding: '0 5px' }}>DeliveryLogs</h1>
      <DataGrid rows={logs} columns={columns} getRowId={(row) => row.id}/>
    </Container>
  );
}
