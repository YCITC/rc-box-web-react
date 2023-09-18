import React, { useContext } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useMediaQuery } from '@mui/material';
import { useTheme, styled} from '@mui/material/styles';
import { withAuthGuard } from '../../hocs/with-auth-guard.jsx';
import { AuthGuard } from '../../guards/auth-guard.jsx';
import { SideNav } from './side-nav.jsx';
import { TopBar } from './top-nav.jsx';

const LayoutRoot = styled('div')(({ theme }) => ({
  // display: 'flex',
  // flex: '1 1 auto',
  maxWidth: '100%',
}));

const LayoutContainer = styled('div')({
  // display: 'flex',
  // flex: '1 1 auto',
  // flexDirection: 'column',
  width: '100%',
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

  useEffect(() => {
      // handlePathnameChange();
      console.log('pathname: ' + pathname);
  },[pathname]);

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
    const mdUP = useMediaQuery((theme) => theme.breakpoints.up('md'));

    const styleLayoutRoot = {
      [theme.breakpoints.up('md')]: {
      },
      marginLeft: openNav?(mdUP?theme.layout.SIDE_NAV_WIDTH:0):0,
      marginTop: openNav?theme.layout.TOP_BAR_HEIGHT:0,
    }
    const styleLayoutContainer = {
      position: 'fixed',
      right: 0,
      bottom: 0,
      [theme.breakpoints.up('md')]: {
        right: openNav?theme.layout.SIDE_NAV_WIDTH:0,
        top: openNav?theme.layout.TOP_BAR_HEIGHT:0,
      }
    }
    const styledLayoutNav = {
      
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
          case '/':
          case '/devices':
          case '/delivery-logs':
          case '/oauth-redirect':
            if (!openNav) setOpenNav(true);
            break;
          // case '/landing':
          // case '/signin':
          // case '/signup':
          // case '/email-verify':
          //   if (openNav) setOpenNav(false);
          //   break;
          default:
            if (openNav) setOpenNav(false);
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
          <LayoutRoot sx={styleLayoutRoot} className="layout-root">
            <LayoutContainer className="layout-container">
              { children }
            </LayoutContainer>
          </LayoutRoot>
        {/* </AuthGuard> */}
      </>
    );
  }
);
