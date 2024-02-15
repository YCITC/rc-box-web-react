
import React from 'react';

import { Container} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function PageContainer(props) {
  const theme = useTheme();
  const { children } = props;

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

  return (
    <Container component="div" maxWidth="md" sx={containerStyle}>
      { children }
    </Container>
  );
}