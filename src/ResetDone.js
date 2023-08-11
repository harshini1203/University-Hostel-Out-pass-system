import React from 'react';
import * as Components from './Components';
import Axios from "axios";
import {useState,useEffect} from "react";



const ResetDone= () => {


  return (
    <div>
        <Components.Change>
      <h3>Password Reset Successful</h3>
      <Components.Paragraph>Password has been reset. Head to login page to continue.</Components.Paragraph>
      </Components.Change>
    </div>
  );
};

export default ResetDone;