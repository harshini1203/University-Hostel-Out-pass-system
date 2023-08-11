import React from 'react';
import * as Components from './Components';
import Axios from "axios";
import {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const PasswordReset = () => {

const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
console.log(email); // This will log the email value

  const[password,setPassword]=useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const validatePassword=(password)=>{
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return(strongPasswordRegex.test(password));
}

  const handlePass = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.warn('Enter both new password and confirm password.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
  
    // Check if passwords match
    if (confirmPassword !== password) {
      toast.error('Password and Confirm Password do not match.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
  
    // Check if the password is valid
    if (!validatePassword(password)) {
      toast.error('Enter a valid password. Password must contain at least 8 characters, including uppercase and lowercase letters, numbers, and special characters.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      return;
    }
    if(confirmPassword===password){
      Axios.post('http://localhost:3000/PasswordReset', { email: email ,password:password,confirmPassword:confirmPassword})
      .then((response) => {
        const { data } = response;
        if(data.code===2){
          alert('Error.Password has not been updated please try again later');
        }
        else{
          setTimeout(() => {
            navigate('/ResetDone');
          }, 1000);
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error occurred during login');
      });
    }
    else{
      alert("Passsowrd and confirm Password do not match");
    }
    
    
        
  };
  
  return (
    <>
    <div>
        <Components.ChangeForm>
      <h3>Change/Reset Password</h3>
      <label>New Password : </label>

      <br />
      <div style={{ position: 'relative', display: 'inline-block',width:'100%'}}>
      <Components.Input onChange={(e)=>{setPassword(e.target.value);}} type={showPassword ? "text" : "password"} placeholder='New Password' />
      <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
      onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}/>
      </div>
      <br />

      <div style={{ position: 'relative', display: 'inline-block',width:'100%'}}>
      <Components.Input onChange={(e)=>{setConfirmPassword(e.target.value);}} type={showConfirmPassword ? "text" : "password"} placeholder='New Password (again)' />
      <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
                        onClick={() => setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword)}/>
      </div>
      <br />
      
      <Components.Button onClick={handlePass} >Submit</Components.Button>
      </Components.ChangeForm>
    </div>
    <ToastContainer />
    </>
  );
};

export default PasswordReset; 