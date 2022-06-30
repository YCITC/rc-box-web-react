import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {LogComponent} from '../log/log.jsx';

import './main.scss'


export function Main() {
  const [logs, setLogs] = useState([]);

  useEffect(()=>{
    getLogs();
    // console.log("init useEffect");
  },[])

  // useEffect(()=>{
  //   console.log("Logs has be changed")
  // },[logs])

  const urlB64ToUint8Array = (base64String)=>{
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const register = ()=>{
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      console.log('Service Worker and Push is supported');

      navigator.serviceWorker.register('sw.js')
      .then(function(swReg) {
        let browserInfo = getBrowserInfo();

        axios.get('/push/genVAPID/'+browserInfo.name)
        .then((response)=>{
          const vapid = response.data;
          subscribeUser(swReg, vapid);
        })
        .catch((error)=>{
          console.error('Service Worker Error', error);
        });

      })
      .catch((error)=>{
        console.error('Service Worker Error', error);
      });
    }
  }

  const subscribeUser = (swReg, vapid)=>{
    const applicationServerKey = urlB64ToUint8Array(vapid.publicKey);
    swReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(subscription) {
      let browserInfo = getBrowserInfo();
      let jString = JSON.stringify(subscription);
      let jObj = JSON.parse(jString);
      let pushKeys = {
        "deviceId": "rc-box-581",
        "browserName": browserInfo.name,
        "browserVersion": browserInfo.version,
        "vapidPublicKey":  vapid.publicKey,
        "vapidPrivateKey": vapid.privateKey,
        "endpoint": jObj.endpoint,
        "keysAuth": jObj.keys.auth,
        "keysP256dh": jObj.keys.p256dh,
      }
      
      axios.post('/push/subscribe', pushKeys)
        .then((response)=>{
          console.log('response: ', response);
        })
        .catch((error)=>{
          console.error('error: ', error);
        });

    })
    .catch(function(err) {
      console.log('Failed to subscribe the user: ', err);
      // updateBtn();
    });
  }

  const getBrowserInfo = ()=>{
    const infoList = navigator.userAgent.split(" ");
    let bowserInfo = {
      "name": "",
      "version": "",
    }
    infoList.forEach((info)=>{
      if (info.indexOf("Chrome") > -1) {
        bowserInfo.name = "Chrome"
        bowserInfo.version = info.split("/")[1]
      } else if (info.indexOf("Firefox") > -1) {
        bowserInfo.name = "Firefox"
        bowserInfo.version = info.split("/")[1]
      }
    })
    return bowserInfo;
  }

  const compare = ( a, b )=>{
    return (b.id - a.id);
  }
  
  const getLogs = ()=>{
    axios.get('/log')
      .then((response)=>{
        // console.log('response: ', response)
        // console.log('response.data: ', response.data)

        response.data.sort(compare);
        // response.data.sort((a, b)=>{b.id - a.id});
        let logArray = [];
        for(var i=0; i<response.data.length; i++) {
          response.data[i]["ISOtime"] = response.data[i].time;
          response.data[i].time = new Date(response.data[i].time);
          logArray.push((<LogComponent {...response.data[i]} key={response.data[i].id}/>))
        }
        // setLogs(logArray.reverse());
        setLogs(logArray);
      })
      .catch((error)=>{
        console.error('error: ', error);
      });
  };

  return (
    <div className="main">
      <div className="">
        <h1 className="h1"> 收貨記錄 </h1>
        <button className="subscribe" onClick={register}>接收通知</button>
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