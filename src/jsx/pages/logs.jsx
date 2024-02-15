import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';

import { Pagination } from '@mui/material';
import { Grid, Paper } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { useAuth } from '../hooks/use-auth.jsx';
import PageStack from '../components/page-stack.jsx';
import Subtitle from '../components/subtitle.jsx';
import PageContainer from '../components/page-container.jsx';

export default function DeliveryLogs() {
  document.title = 'SHUOO A';
  const auth = useAuth();

  const [logs, setLogs] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 1,
    itemCount: 1,
    totalItems: 1,
  });

  useEffect(() => {
    if (auth.token === null) return; 
    prepareLogs();
  }, [auth.token])

  const prepareLogs = async(page=1) => {
    let logsResponse = await axios.get(`/api/log/getByUser/?page=${page}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    });
    let tempArray = [];
    tempArray = logsResponse.data?.items?.map((log) => {
      log.createdTime = new Date(log.time).toLocaleString();
      return log
    })
    setPageInfo(logsResponse.data?.meta)
    setLogs(tempArray);
  }

  const changePage = (e, page) => {
    prepareLogs(page)
  }

  const renderLogs = () => {
    return logs.map((log) => {
      const createTime = new Date(log.time)
      return <Fragment key={'logKey_' + log.id}>
        <Grid item xs={1}>
          <Item>{log.id}</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>{log.deviceId}</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>{log.alias}</Item>
        </Grid>
        <Grid item xs={4}>
          <Item>{createTime.toLocaleString()}</Item>
        </Grid>
      </Fragment>
    })
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <PageContainer>
      <Subtitle>Delivery Logs</Subtitle>

      <PageStack>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
          <Grid item xs={1}>
            <Item>ID</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>Device ID</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>Alias</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>Time</Item>
          </Grid>
        </Grid>
      </PageStack>

      <PageStack>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
          {renderLogs()}
        </Grid>
      </PageStack>

      <PageStack>
        <Pagination count={pageInfo.totalPages} onChange={changePage}/>
      </PageStack>
    </PageContainer>
  );
}
