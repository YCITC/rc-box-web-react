import React, { useState } from 'react';
import { Link as RLink } from "react-router-dom";
import PropTypes from 'prop-types';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import DehazeIcon from '@mui/icons-material/Dehaze';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from 'react';
import { Avatar, Badge, IconButton, Stack, SvgIcon, Tooltip, useMediaQuery } from '@mui/material';
import { Box, AppBar, Toolbar, Typography, Link} from '@mui/material';
import { alpha } from '@mui/material/styles';
// import { usePopover } from 'src/hooks/use-popover';
// import { AccountPopover } from './account-popover';
// import Mainlogo from '../../components/logos.jsx'
import { LogoBanner, LogoMain } from '../../components/logos.jsx'


const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const accountPopover = usePopover();

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <DehazeIcon />
                </SvgIcon>
              </IconButton>
            )}
            <Tooltip title="Search">
              <IconButton>
                <SvgIcon fontSize="small">
                  <SearchIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Tooltip title="Contacts">
              <IconButton>
                <SvgIcon fontSize="small">
                  <GroupIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton>
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
                >
                  <SvgIcon fontSize="small">
                    <NotificationsIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            {/* <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src="/assets/avatars/avatar-anika-visser.png"
            /> */}
          </Stack>
        </Stack>
      </Box>
      {/* <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      /> */}
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};


export const TopBar = (props) => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const { onNavOpen } = props;

  if (!onNavOpen) return <></>;
  // if (!lgUp) return <></>;

  return (
    <AppBar position="fixed" sx={{mt: 0}} color="secondary">
      <Toolbar variant="regular">
      <Link to="/" component={RLink}>
        <LogoBanner />
      </Link>
      </Toolbar>
    </AppBar>
  )
};
TopBar.propTypes = {
  open: PropTypes.bool
};
