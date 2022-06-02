import React, {useState, useEffect, useContext} from 'react';
import {Link} from "react-router-dom";

import {YourCalss} from '../../component-class-sample.jsx';
import {MemberContext} from '../../context/member.jsx';
import {ThemeContext} from '../../context/theme.jsx';


export function Consumer() {
  return (
    <>
      <MemberContext.Consumer>
        {
          (member) => {
            return <ThemeContext.Consumer>
              {
                (theme)=>{
                  return <YourCalss member={member} theme={theme} win={'3.1'}/>
                }
              }
            </ThemeContext.Consumer>
          }
        }
      </MemberContext.Consumer>
    </>
  );
}
