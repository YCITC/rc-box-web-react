import React, { useState, useEffect} from 'react';
import { Link as RLink } from "react-router-dom";
import PropTypes from 'prop-types';

import MenuIcon from '@mui/icons-material/Menu';
import { Menu, MenuItem } from '@mui/base';
import { Avatar, Button } from '@mui/material';
import { Box, AppBar, Toolbar, Typography, Link, useMediaQuery} from '@mui/material';

import { LogoBanner, LogoMain } from '../../components/logos.jsx'
import { useAuth } from '../../hooks/use-auth.jsx';
import { AccountPopover } from '../../components/account-popover.jsx';
import { usePopover } from '../../hooks/use-popover.jsx';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;


export const TopBar = (props) => {
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const { onNavOpen } = props;
  const auth = useAuth();
  const accountPopover = usePopover();
  

  if (!onNavOpen) return <></>;
  // if (!lgUp) return <></>;

  return (
    <AppBar position="fixed" sx={{mt: 0}} color="secondary">
      <Toolbar variant="regular">
        <Link to="/" component={RLink}>
          <LogoBanner />
        </Link>
        <Avatar 
          sx={{position: 'absolute', right: '10px', cursor: 'pointer'}}
          onClick={accountPopover.handleOpen}
          ref={accountPopover.anchorRef}
          alt={auth.user?auth.user.username:''} src={auth.user?auth.user.avatarUrl:''} 
        />
      </Toolbar>
      
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </AppBar>
  )
};
TopBar.propTypes = {
  open: PropTypes.bool
};
