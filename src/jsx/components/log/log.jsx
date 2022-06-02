import React, {useState, useEffect, useContext} from 'react';


export function LogComponent(props) {
  let timeFormat = {
    weekday: 'long',
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  };
  let language = navigator.language;
  let timeString =  props.time.toLocaleTimeString(language, timeFormat);
  
  return (
    <React.Fragment>
      <div className="serialId">{props.id}</div>
      <div className="time">{timeString}</div>
      {/* <div className="time">{props.ISOtime}</div> */}
      <div className="deviceId">{props.deviceId}</div>
    
    </React.Fragment>
  );
}
