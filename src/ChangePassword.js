import React from 'react';
import * as Components from './Components';
import Axios from "axios";
import {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import ChangeDone from "./ChangeDone";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ChangePassword = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const validateEmail=(email)=>{
    const Regex = /^[A-Za-z]+[0-9]{8}@snuchennai\.edu\.in$/;
    return Regex.test(email);
}


  const handlePass = (e) => {
    e.preventDefault();
    if (!validateEmail(email) || !email) {
      alert('Invalid email address');
      return;
    }
    Axios.post('http://localhost:3000/change', { email: email })
    .then((response) => {
      const { data } = response;
      if(data.code===1){
        alert('Username does not exist , signup to continue');
      }
      else{
        setTimeout(() => {
          navigate('/ChangeDone');
        }, 1000);
      }
    })
    .catch((error) => {
      console.error(error);
      alert('Error occurred during login');
    });
        
  };
  
  return (
    <>
    <div>
        <Components.ChangeForm>
      <h3>Password Reset</h3>
      <Components.Paragraph>Forgotten your password? Enter your e-mail address below, and we'll send you an e-mail allowing you to reset it.</Components.Paragraph>
      <label>Username/Email : </label>
      <br />
      <Components.Input onChange={(e)=>{setEmail(e.target.value);}} type='text' placeholder='Email' />
      <br />
      <Components.Button onClick={handlePass} >Submit</Components.Button>
      </Components.ChangeForm>
    </div>
    <ToastContainer />
    </>
  );
};

export default ChangePassword;