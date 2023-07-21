import React from 'react';

import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery, Container, Box, Paper, Typography } from '@mui/material';


export default function Main() {
  document.title = 'SHUOO A';

  const theme = useTheme();
  const mdUP = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const ImgComponent = ({imgSrc, sx, contentText}) => {
    return (
      <Paper elevation={3} sx={{maxWidth: "600px", width: "100%", marginBottom: '40px', }}>
        <p style={{padding: '10px 0 0 10px'}}>{contentText}</p>
        <Paper elevation={2} sx={{maxWidth: "600px", width: "100%", ...sx}}>
          <img src={imgSrc} style={{maxWidth: "inherit", width: "inherit"}} />
        </Paper>
      </Paper>
    ) 
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
  const renderUserGuide = () => {
    if (mdUP === true) {
      return <Box component="div">
        <ImgComponent imgSrc="imgs/user-guide/account-popover.jpg" 
          contentText={<>You can click avatar buton to help logout.</>}
        />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-add.jpg" 
          contentText={<>Got to <b>Delivery Box</b> page to register your <b>Delivery Box</b></>}
        />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-add-dialog.jpg" sx={{width: '400px'}} 
          contentText={<>After the button is clicked, a dialog will pop up.</>}
        />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-edit.jpg" 
          contentText={<>You can edit your "delivery box info".</>}
        />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-edit-dialog.jpg" sx={{width: '400px'}} 
          contentText={<></>}
        />
        <ImgComponent imgSrc="imgs/user-guide/delivery-logs.jpg" 
          contentText={<>You can view your delivery logs.</>}
        />
        <ImgComponent imgSrc="imgs/user-guide/delivery-logs-page.jpg" sx={{width: '400px'}} 
          contentText={<>After the button is clicked, a dialog will pop up.</>}
        />
      </Box>
    } else {
      return <Box component="div">
        <ImgComponent imgSrc="imgs/user-guide/account-popover.mobile.jpg" 
          contentText={<>You can click avatar buton, it will guide you to other pages.</>}
        />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-add.mobile.jpg" 
          contentText={<>Got to <b>Delivery Box</b> page to register your <b>Delivery Box</b></>}
        />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-add-dialog.jpg" sx={{width: '400px'}} 
          contentText={<>After the button is clicked, a dialog will pop up.</>}
        />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-edit.mobile.jpg" 
          contentText={<>You can edit your "delivery box info".</>}
        />
        <ImgComponent imgSrc="imgs/user-guide/delivery-box-edit-dialog.jpg" sx={{width: '400px'}} 
          contentText={<></>}
        />
        <ImgComponent imgSrc="imgs/user-guide/delivery-logs.mobile.jpg" 
          contentText={<>You can view your delivery logs.</>}
        />
        <ImgComponent imgSrc="imgs/user-guide/delivery-logs-page.jpg" sx={{width: '400px'}} 
          contentText={<>After the button is clicked, a dialog will pop up.</>}
        />
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