import React from 'react';
import { Link, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Archive, Input, Button} from '@mui/icons-material';
import {
  Box,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  useMediaQuery
} from '@mui/material';
import { Scrollbar } from '../../components/scrollbar.jsx';
// import { items } from './config';
import { SideNavItem } from './side-nav-item.jsx';

export const SideNav = (props) => {
  const location = useLocation();
  const { open, onClose } = props;
  const pathname = location.pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const items = [
    {
      title: 'Delivery Box',
      path: '/devices',
      icon: (
        <SvgIcon fontSize="small">
          <Archive />
        </SvgIcon>
      )
    },
    {
      title: 'Delivery Logs',
      path: '/delivery-logs',
      icon: (
        <SvgIcon fontSize="small">
          <Input />
        </SvgIcon>
      )
    },
    {
      title: 'SignIn',
      path: '/signin',
      icon: (
        <SvgIcon fontSize="small">
        </SvgIcon>
      )
    },
    {
      title: 'SignUp',
      path: '/signup',
      icon: (
        <SvgIcon fontSize="small">
        </SvgIcon>
      )
    },
    {
      title: 'Landing',
      path: '/landing',
      icon: (
        <SvgIcon fontSize="small">
        </SvgIcon>
      )
    },
  ];

  const content = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%'
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box sx={{ p: 3 }} hidden>
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'inline-flex',
              height: 32,
              width: 32
            }}
          >
            {/* LOGO */}
          </Box>
        </Box>
        <Divider />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: 'none',
              p: 0,
              m: 0
            }}
          >
            {items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;

              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
          </Stack>
        </Box>
        <Divider />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3
          }}
        >
        </Box>
        <Divider sx={{ borderColor: 'neutral.700' }} />
        <Stack>
        {/* <Button variant="contained" href="/">close nav</Button> */}
        {/* <Button variant="contained" 
          color="primary"
          sx={{ p: 2, border: '1px dashed grey', width: '100%', fontSize: '24px'}} 
          href="/signup">
          SIGN UP
        </Button> */}
        {/* <button >close nav</button> */}
        </Stack>
      </Box>
    </Scrollbar>
  );

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#1c2536',
          color: 'white',
          width: 280
        }
      }}
      sx={lgUp?{}:{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant={lgUp?"permanent":"temporary"}
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
