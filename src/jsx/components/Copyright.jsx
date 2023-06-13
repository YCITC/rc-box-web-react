import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const styles = {
  position: 'absolute',
  bottom: 0,
  left: '50%',
  ml: '-94px',
  zIndex: -1,
}
export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" sx={styles} {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
      YesseeCity
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}