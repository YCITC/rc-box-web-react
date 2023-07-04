import React, { useContext } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { withAuthGuard } from '../../hocs/with-auth-guard.jsx';
import { AuthGuard } from '../../guards/auth-guard.jsx';
import { SideNav } from './side-nav.jsx';
import { TopBar } from './top-nav.jsx';

const SIDE_NAV_WIDTH = '280px';
const TOP_BAR_HEIGHT = '64px';

const LayoutRoot2 = styled('div')(({ theme }) => ({
  // display: 'flex',
  // flex: '1 1 auto',
  maxWidth: '100%',
}));

const LayoutContainer = styled('div')({
  // display: 'flex',
  // flex: '1 1 auto',
  // flexDirection: 'column',
  width: '100%'
});

export const Layout = withAuthGuard((props) => {
  const location = useLocation();
  const { children } = props;
  const pathname = location.pathname;
  const [openNav, setOpenNav] = useState(true);

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
      // handlePathnameChange();
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

export const DashboardLayout = withAuthGuard(
  ({ children }) => {
    const location = useLocation();
    const pathname = location.pathname;
    const [openNav, setOpenNav] = useState(false);
    const theme = useTheme();
  
    const styleLayoutRoot = {
      [theme.breakpoints.up('lg')]: {
        marginLeft: openNav?SIDE_NAV_WIDTH:0,
        marginTop: openNav?TOP_BAR_HEIGHT:0,
      }
    }
    const styleLayoutContainer = {
      [theme.breakpoints.up('lg')]: {
        marginLeft: openNav?SIDE_NAV_WIDTH:0,
        marginTop: openNav?TOP_BAR_HEIGHT:0,
      }
    }
    const handlePathnameChange = useCallback(
      () => {
        console.log('on handlePathnameChange, openNav: ', openNav);
        if (openNav) {
          setOpenNav(false);
        }
      },
      [openNav]
    );
    
    // useEffect(() => {
    //   console.log('re render, openNav: ', openNav);
    // }, [openNav])
  
    useEffect(
      () => {
        // console.log('[layout] pathname: ', pathname)
        switch (pathname) {
          case '/landing':
          case '/signin':
          case '/signup':
            if (openNav) setOpenNav(false);
            // handlePathnameChange()
            break;
          default:
            if (!openNav) setOpenNav(true);
            break;
        }
      },
      [pathname]
    );
  
    return (
      <>
        {/* <AuthGuard pathname={pathname}> */}
          <TopBar onNavOpen={openNav} />
          <SideNav open={openNav} />
          <LayoutRoot2 sx={styleLayoutRoot} className="layout-root">
            <LayoutContainer className="layout-container">
              { children }
            </LayoutContainer>
          </LayoutRoot2>
        {/* </AuthGuard> */}
      </>
    );
  }
);
