import React from 'react';
import * as Components from './Components';
import Axios from "axios";
import {useState,useEffect} from "react";



const VerificationSuccess= () => {


  return (
    <div>
        <Components.Change>
      <h3>Verification Successful</h3>
      <Components.Paragraph>You have been signed up successfully.Head over to login to continue.</Components.Paragraph>
      </Components.Change>
    </div>
  );
};

export default VerificationSuccess;