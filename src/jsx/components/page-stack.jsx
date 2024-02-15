import React from 'react';
import { Stack } from '@mui/material';

export default function PageStack(props) {
  const { children } = props;

  const stackStyle = {
    width: '100%',
    marginTop: '20px',
  };

  return (
    <Stack sx={stackStyle} direction='row' useFlexGap flexWrap="wrap" spacing={0}
      alignItems="flex-start" justifyContent="flex-start"
    >
      { children }
    </Stack>
  );
}