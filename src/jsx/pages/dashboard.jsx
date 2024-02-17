import React, { useEffect, useState, useMemo, Fragment } from 'react';
import * as dayjs from 'dayjs';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { Line } from 'react-chartjs-2';
import { Grid, Paper } from '@mui/material';

import PageContainer from '../components/page-container.jsx';
import Subtitle from '../components/subtitle.jsx';
import { useAuth } from '../hooks/use-auth.jsx';
import PageStack from '../components/page-stack.jsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  document.title = 'SHUOO A';
  const auth = useAuth();
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeUsers7Days, setActiveUsers7Days] = useState(0);
  const [activeUsersToday, setActiveUsersToday] = useState(null);
  const [activeUsersHistory, setActiveUsersHistory] = useState([]);
  const [totalRegisteredUsers, setTotalRegisteredUsers] = useState(0);
  const [users, setUsers] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 1,
    itemCount: 1,
    totalItems: 1,
  });

  useEffect(() => {
    if (auth.token === null) return; 
    if (auth.user.id !== 1) navigate('/')
    getAverageActive()
    getTodayActiveSession()
    getUsers()
  }, [auth.token])

  const charOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Active users',
      },
    },
  };

  const labels = useMemo(() => {
    let theDaty = dayjs()
    let days = []
    for(let i = 0; i < 8; i++) {
      theDaty = theDaty.subtract(1 ,'day')
      days.push(theDaty.format('M/D'))
    }
    days.reverse();

    return days
  });

  const charData = {
    labels,
    datasets: [
      {
        label: 'Average in the last 7 days: ' + activeUsers7Days.toFixed(3),
        data: activeUsersHistory,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Today active',
        data: [].concat(new Array(7).fill(null), [activeUsersToday]),
        borderColor: 'rgb(149, 151, 253)',
        backgroundColor: 'rgba(149, 151, 253, 0.5)',
      },
    ],
  };

  const getTodayActiveSession = async () => {
    const response = await axios.get('/api/session/todayActive', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    });
    setActiveUsersToday(response.data)
  }
  const getAverageActive = async (user) => {
    axios.get('/api/session/activeHistory/8', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    })
    .then((response) => {
      const charSetData = response.data.activeHistory.map((hisotry)=>hisotry.count)
      setActiveUsersHistory(charSetData)
      setActiveUsers7Days(response.data.average)
    }).catch(error => {
      console.error(error)
    });
  }

  const getUsers = async (page=1) => {
    const response = await axios.get(`/api/users/getAll?page=${page}`, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + auth.token
      }
    });
    let tempArray = [];
    tempArray = response.data?.items?.map((user) => {
      return {
        id: user.id, 
        username: user.username,
        email: user.email,
        loginTimes: user.userAction.loginTimes,
        lastSessionTime: dayjs(user.userAction.lastSessionTime).format('YYYY-MM-DD HH:MM:s'),
        createTime: dayjs(user.createdTime).format('YYYY-MM-DD'),
      }
    })
    setTotalRegisteredUsers(response.data?.meta?.totalItems)
    setPageInfo(response.data?.meta)
    setUsers(tempArray)
  }

  const changePage = (e, page) => {
    getUsers(page)
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    overflow: 'hidden',
  }));

  const renderUsers = () => {
    return users.map((user) => <Fragment key={'userKey_' + user.id}>
      <Grid item xs={1}>
        <Item>{user.id}</Item>
      </Grid>
      <Grid item xs={2}>
        <Item>{user.username}</Item>
      </Grid>
      <Grid item xs={3}>
        <Item>{user.email}</Item>
      </Grid>
      <Grid item xs={2}>
        <Item>{user.loginTimes}</Item>
      </Grid>
      <Grid item xs={2}>
        <Item>{user.lastSessionTime}</Item>
      </Grid>
      <Grid item xs={2}>
        <Item>{user.createTime}</Item>
      </Grid>
    </Fragment>)
  }

  return (
    <PageContainer>
      <Subtitle>Dashboard</Subtitle>
      <PageStack>
        <div style={{minWidth: '400px', }}>
          <Line
            options={charOptions}
            data={charData}
          />
        </div>
      </PageStack>
      <PageStack>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
          <Grid item xs={1}>
            <Item>ID</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>name</Item>
          </Grid>
          <Grid item xs={3}>
            <Item>email</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>login times</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>last session time</Item>
          </Grid>
          <Grid item xs={2}>
            <Item>create times</Item>
          </Grid>
        </Grid>
      </PageStack>
      <PageStack>

      </PageStack>
      <PageStack>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
          {renderUsers()}
        </Grid>
      </PageStack>
      <PageStack>
        <Pagination count={pageInfo.totalPages} onChange={changePage}/>
      </PageStack>
      <PageStack>
        Total registered users: {totalRegisteredUsers}
      </PageStack>
    </PageContainer>
  )
}
