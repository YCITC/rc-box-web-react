import React, {useState, useEffect, useContext} from 'react';


export function LogComponent(props) {
  let timeFormat = {
    // weekday: 'long',
    year: 'numeric',
    // month: 'long', 
    // day: 'numeric',
    month: '2-digit', 
    day: '2-digit',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  };
  let language = navigator.language;
  // let timeString =  props.time.toLocaleTimeString(language, timeFormat);
  // console.log(props.time.toLocaleTimeString(language, timeFormat))
  let d = props.time;
  // let timeString = d.toISOString().split('T')[0] + '  ' + d.toISOString().split('T')[1].split('.')[0];
  let timeString = d.toISOString().substring(0, 10) + ' ' + d.toISOString().substring(11, 19) ;
  return (
    <React.Fragment>
      <div className="serialId">{props.id}</div>
      <div className="time">{timeString}</div>
      {/* <div className="time">{props.ISOtime}</div> */}
      <div className="deviceId">{props.deviceId}</div>
    
    </React.Fragment>
  );
}
