import React, { useEffect, useState } from 'react';

import { TextField, InputAdornment} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';


const TextFieldPassword = (props) => {
  const [passwordError, setPasswordError] = useState({state: false, message: ''});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handlePasswordVisible = (event) => {
    event.preventDefault();
    if(event.type === 'mousedown') setPasswordVisible(true)
    if(event.type === 'mouseup') setPasswordVisible(false)
    if(event.type === 'mouseout') setPasswordVisible(false)
  };
  const handleInputInvalid = () => {
    setPasswordError({state: true, message:'least 8 characters, has number, lowercase letter, uppercase letter, special characters'})
  }
  return (
    <TextField
      onInvalid={handleInputInvalid}
      // error={passwordError.state}
      // helperText={passwordError.message}
      type={passwordVisible==true?"text":"password"}
      InputProps={
        {
          endAdornment: (
          <InputAdornment position="end">
            <VisibilityIcon sx={{cursor: 'pointer'}} 
              onMouseDown={handlePasswordVisible}
              onMouseUp={handlePasswordVisible}
              onMouseOut={handlePasswordVisible}  />
          </InputAdornment>
          )
        }
      }
      inputProps={{pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*#?&_+=]).{8,}"}}
      { ...props }
      
      error={props.error!==undefined ? props.error : passwordError.state}
      helperText={props.helperText!=='' ? props.helperText : passwordError.message}
    />
  )
}



export default TextFieldPassword;
