import React from 'react';

import { Paper } from '@mui/material';
import Main from '../../imgs/logo.svg';
import Banner from '../../imgs/logo-banner.svg';

const LogoMain = (props) => {
  return (
    <Paper {...props} elevation={0}>
      <img style={{width: '100%'}} src={Main} />
    </Paper>
  );
};

const LogoBanner = (props) => {
  return (
    <>
      <img src={Banner} style={{marginTop: '4px', height: '50px'}}/>
    </>
  )
};

export { LogoMain, LogoBanner };