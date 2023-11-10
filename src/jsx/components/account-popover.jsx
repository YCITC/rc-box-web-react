import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link as RLink, useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';

import { useMediaQuery } from '@mui/material';
import { Popover, MenuItem, MenuList, Link } from '@mui/material';
import { useAuth } from '../hooks/use-auth.jsx';


export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const [ navItems, setNavItems ] = useState([]);
  const mdUP = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
    },
    [onClose, auth]
  );

  useEffect(() => {
    const items = [];
    if (auth.isSignIn) {
      // console.log('isSignIn')
      items.push(
        <MenuItem key="mitem-singout" onClick={handleSignOut}>
          Sign out
        </MenuItem>
      )
      items.unshift(
        <MenuItem key="mitem-profile" onClick={()=>navigate('/profile')}>
          Profile
        </MenuItem>
      )
    } else {
      items.push(
        <MenuItem key="mitem-singin"  onClick={()=>{navigate('/sign-in')}}>
          Sign in
        </MenuItem>
      )
    }

    if (!mdUP) {
      items.unshift(
        <MenuItem key="mitem-001">
          <Link to="/devices" component={RLink} underline="none" onClick={()=>onClose()}>
            Delivery Box
          </Link>
        </MenuItem>
        ,
        <MenuItem key="mitem-002">
          <Link to="/delivery-logs" component={RLink} underline="none" onClick={()=>onClose()}>
            Delivery Logs
          </Link>
        </MenuItem>
      );
    }
    setNavItems(items);

  }, [auth, mdUP]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
    >
      <MenuList
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        {navItems}
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
