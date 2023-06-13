import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { withAuthGuard } from '../../hocs/with-auth-guard.jsx';
import { SideNav } from './side-nav.jsx';
// import { TopNav } from './top-nav.jsx';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}));

const LayoutContainer = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  width: '100%'
});

export const Layout = withAuthGuard((props) => {
  const location = useLocation();
  const { children } = props;
  const pathname = location.pathname;
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(
    () => {
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );

  useEffect(
    () => {
      handlePathnameChange();
      console.log('pathname: ' + pathname);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      {/* <TopNav onNavOpen={() => setOpenNav(true)} /> */}
      <SideNav
        onClose={() => setOpenNav(false)}
        open={openNav}
      />
      <LayoutRoot>
        <LayoutContainer>
          {/* {children} */}
          <h1> hello</h1>
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
});

export const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(
    () => {
      console.log('on handlePathnameChange, openNav: ', openNav);
      if (openNav) {
        setOpenNav(false);
      }
    },
    [openNav]
  );
  useEffect(() => {
    console.log('openNav: ', openNav);
  }, [openNav])
  
  useEffect(
    () => {
      console.log('pathname: ' + pathname);
      switch (pathname) {
        case '/landing':
        case '/signin':
        case '/signup':
          // if (openNav) setOpenNav(false);
          handlePathnameChange();
          break;
        // default:
          // if (!openNav) setOpenNav(true);

      }
      // handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      <SideNav
        onClose={() => setOpenNav(false)}
        open={false}
      />
      <LayoutRoot>
        <LayoutContainer>
          { children }
        </LayoutContainer>
      </LayoutRoot>
    </>
  );
};
