import React,{useEffect} from 'react';
import './main.scss'
import styled from 'styled-components';

const H2o = styled.h1` // => Define  <h1> style，name: H2o
  color: green;
  font-size: 20px;
`



export function Main() {
  useEffect(()=>{

  },[]);
  return (
    <div className="wrapper main">
      <h1 className="h1"> This is Sample React Page </h1>
      <div className="">
        <H2o>This line is styled-components </H2o>
      </div>
    </div>
  );
}