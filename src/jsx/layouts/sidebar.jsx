import React from 'react';
import Copyright from '../components/copyright.jsx';
import './sidebar.scss'
import { useLocation } from 'react-router-dom';
import { Link, List, ListItem, ListItemButton} from '@mui/material';
import { ListItemText } from '@mui/material';

const SidebarLayout = ({ children }) => {
  const location = useLocation();
  var hiddenSidebar = false;
  // Check if the current route is '/devices' or '/logs'
  switch (location.pathname) {
    case '/landing':
    case '/signin':
    case '/signup':
      hiddenSidebar = true;
      break;
    default:
      hiddenSidebar = false;
  }
  const mainContentStyle = {
    position: 'relative',
  }
  return <>
    <div className="side-bar" hidden={hiddenSidebar}>
      <List>
        <ListItem >
          <ListItemButton>
            <Link href="/" underline="none"><ListItemText primary="Home" /></Link>
          </ListItemButton>
        </ListItem>
        <ListItem >
          <ListItemButton>
            <Link href="/signin" underline="none"><ListItemText primary="signin" /></Link>
          </ListItemButton>
        </ListItem>
        <ListItem >
          <ListItemButton>
            <Link href="/signup" underline="none"><ListItemText primary="signup" /></Link>
          </ListItemButton>
        </ListItem>
        <ListItem >
          <ListItemButton>
            <Link href="/landing" underline="none"><ListItemText primary="landing" /></Link>
          </ListItemButton>
        </ListItem>
        <ListItem >
          <ListItemButton>
            <Link href="/devices" underline="none"><ListItemText primary="devices" /></Link>
          </ListItemButton>
        </ListItem>
        <ListItem >
          <ListItemButton>
            <Link href="/logs" underline="none"><ListItemText primary="logs" /></Link>
          </ListItemButton>
        </ListItem>
      </List>

    </div> 
    <div>
      { children }
    </div>
    <Copyright />
  </>
}

export default SidebarLayout;