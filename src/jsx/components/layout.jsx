import React, { Link } from 'react';

const Layout=() => {
  const StyleSheet={
    width:"100vw",
    height:"100vh",
    backgroundColor:"#FF2E63",
    display: "flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column"
  }
  // { children }
  // console.log('children: ',children);
  return(
    <div style={StyleSheet}>
      <nav>
        <Link to="/">點我連到第一頁</Link>
        <Link to="/second" style={{marginLeft:"20px"}}>點我連到第二頁</Link>
      </nav> 
    </div>
  );
}
export default Layout;
