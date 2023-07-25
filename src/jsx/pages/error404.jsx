import React from 'react';

import { Typography} from '@mui/material';
import { Container, Box, Grid} from '@mui/material';

import Copyright from '../components/copyright.jsx';
import { LogoMain } from '../components/logos.jsx';


export default function Error404() {

  document.title = 'RC Box - Page Not Found';

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LogoMain />
        <Box component="div" sx={{ mt: 5 }}>
          <Grid container>
            <Typography variant="h4" gutterBottom align="center" sx={{width: '100%'}}>
              404 Page Not Found
            </Typography>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </Container>
  );
}
