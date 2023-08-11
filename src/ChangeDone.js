import React from 'react';
import * as Components from './Components';
import Axios from "axios";
import {useState,useEffect} from "react";



const ChangeDone= () => {


  return (
    <div>
        <Components.Change>
      <h3>Password Reset</h3>
      <Components.Paragraph>We have sent you an e-mail. Please try again if you do not receive it within a few minutes.</Components.Paragraph>
      </Components.Change>
    </div>
  );
};

export default ChangeDone;