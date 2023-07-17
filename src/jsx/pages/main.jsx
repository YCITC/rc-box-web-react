import React from 'react';

import { useTheme } from '@mui/material/styles';
import { Container } from '@mui/material';

export default function Main() {
  const theme = useTheme();

  const containerStyle = {
    position: 'static',
    paddingTop: '10px',
    // border: '2px dashed grey',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1190px',
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: '5px',
    }
  };
  const subtitleStyle = {
    padding: '0px 16px',
    height: '1.5em',
    lineHeight: '1.5em',
  };

  return (
    <> 
      <Container component="div" maxWidth="md" sx={containerStyle}>
        <h1 style={{ padding: '0 5px' }}>main</h1>
        <p>Perhaps we could include a user guide here.</p>
        <p>Maybe we can add a user guide to this page. </p>     
      </Container>
    </>
  );
}