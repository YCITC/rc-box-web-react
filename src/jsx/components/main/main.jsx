import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {LogComponent} from '../log/log.jsx';

import './main.scss'


export function Main() {
  const [logs, setLogs] = useState([]);

  useEffect(()=>{
    getLogs();
    // console.log("init useEffect");
  },[]);

  // useEffect(()=>{
  //   console.log("Logs has be changed")
  // },[logs]);

  const subScribe = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');

    }
  }
  const getLogs= ()=>{
    axios.get('$API/log')
      .then((response)=>{
        // console.log('response: ', response)
        // console.log('response.data: ', response.data)
        let logArray = [];
        for(var i=0; i<response.data.length; i++) {
          response.data[i]["ISOtime"] = response.data[i].time;
          response.data[i].time = new Date(response.data[i].time);
          logArray.push((<LogComponent {...response.data[i]} key={response.data[i].id}/>))
        }
        setLogs(logArray.reverse());
      })
      .catch((error)=>{
        console.error('error: ', error);
      });
  };

  return (
    <div className="main">
      <div className="">
        <h1 className="h1"> 收貨記錄 </h1>
        <button className="subscribe" onClick={subScribe}>接收通知</button>
      </div>
      <div className="wrapper">
        <div className="serialId">流水號</div>
        <div className="time">收貨時間</div>
        <div className="deviceId">收貨裝置</div>
        {logs}
      </div>
    </div>
  );
}