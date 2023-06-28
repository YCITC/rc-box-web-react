import React, { useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
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
import { SideNavItem } from './side-nav-item.jsx';

export const SideNav = (props) => {
  const { open } = props;
  const location = useLocation();
  const pathname = location.pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const theme = useTheme();
  const items = [
    {
      title: 'Delivery Box',
      path: '/devices',
      icon: (
        <Archive fontSize="small"/>
      )
    },
    {
      title: 'Delivery Logs',
      path: '/delivery-logs',
      icon: (
        <Input fontSize="small"/>
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
          height: '100%',
          mt: '52px',
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
      </Box>
    </Scrollbar>
  );

            
  return (
    <Drawer
      anchor="left"
      open={open}
      PaperProps={{
        color: 'secondary',
        sx: {
          backgroundColor: theme.palette.secondary.main,
          // color: 'white',
          width: 280,
          zIndex:1000,
        }
      }}
      // sx={lgUp?{}:{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant={open?"permanent":"temporary"}
    >
      {content}
      {/* <SimpleBar 
        autoHide={false} forceVisible={false}
      >
        <div className="gray-zone">
          
        </div>
      </SimpleBar> */}
    </Drawer>
  );
};

SideNav.propTypes = {
  open: PropTypes.bool
};
