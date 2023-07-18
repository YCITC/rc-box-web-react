import React from 'react';

import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Container, Box, Paper, Typography } from '@mui/material';


export default function Main() {
  const theme = useTheme();
  const mdUP = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const ImgComponent = ({imgSrc, sx}) => {
    return <Paper elevation={3} sx={{maxWidth: "600px", width: "100%", marginBottom: '10px', ...sx}}>
      <img src={imgSrc} style={{maxWidth: "inherit", width: "inherit"}} />
    </Paper>
  };
  
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

  const renderUserGuide = () => {
    if (mdUP === true) {
      return <Box component="div">
        <ImgComponent imgSrc="imgs/user-guide/account-popover.jpg" />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-add.jpg" />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-add-dialog.jpg" sx={{width: '400px'}} />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-edit.jpg" />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-edit-dialog.jpg" sx={{width: '400px'}} />
        <ImgComponent imgSrc="imgs/user-guide/delivery-logs.jpg" />
        <ImgComponent imgSrc="imgs/user-guide/delivery-logs-page.jpg" sx={{width: '400px'}} />
      </Box>
    } else {
      return <Box component="div">
        <ImgComponent imgSrc="imgs/user-guide/account-popover.mobile.jpg" />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-add.mobile.jpg" />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-add-dialog.jpg" sx={{width: '400px'}} />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-edit.mobile.jpg" />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-edit-dialog.jpg" sx={{width: '400px'}} />
        <ImgComponent imgSrc="imgs/user-guide/delivery-logs.mobile.jpg" />
        <ImgComponent imgSrc="imgs/user-guide/delivery-logs-page.jpg" sx={{width: '400px'}} />
      </Box>
    }
  };


  return (
    <> 
      <Container component="div" maxWidth="md" sx={containerStyle}>
        <h1 style={{ padding: '0 5px' }}>User Guide</h1>
        {renderUserGuide()}
      </Container>
    </>
  );
}