import React from 'react';
import Main from '../../imgs/logo.svg';
import Banner from '../../imgs/logo-banner.svg';
import { SvgIcon } from '@mui/material';

const LogoMain = () => {
  return (
    <>
      <img src={Main} />
    </>
  );
};

const LogoBanner = () => {
  return (
    <>
      <img src={Banner} style={{marginTop: '4px', height: '50px'}}/>
    </>
  )
};

export { LogoMain, LogoBanner };