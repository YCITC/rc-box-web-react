import React from 'react';
import { Box } from '@mui/material';
import Link from '@mui/material/Link';

const styles = {
  bottom: 0,
  textAlign: 'center',
}
export default function Copyright(props) {
  return (
    <Box component="footer" variant="body2" color="text.secondary" style={styles} {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
      YesseeCity
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Box>
  );
}