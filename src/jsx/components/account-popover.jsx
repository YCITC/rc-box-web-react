import React, { useCallback, useEffect } from 'react';
import { Link as RLink} from "react-router-dom";
import PropTypes from 'prop-types';

import { useMediaQuery } from '@mui/material';
import { Popover, MenuItem, MenuList, Link } from '@mui/material';
import { useAuth } from '../hooks/use-auth.jsx';


export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const mdUP = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const auth = useAuth();

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
    },
    [onClose, auth]
  );

  const renderNavItems = () => {
    if (mdUP) return [];

    return [
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
    ]
  }

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
        {renderNavItems()}
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
