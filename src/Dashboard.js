import React from 'react';
import * as Components from './Components';
import Axios from "axios";
import {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';


const Dashboard= () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        try {
          
          // Clear any local storage or cookies related to authentication if needed
          // For example, you can use localStorage.removeItem('session_token');
          
          // Redirect to home page after logout
          setTimeout(() => {
            navigate('/PasswordReset');
          }, 1000);
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
    
  return (
    <div>
        <Components.Change>
      <h3>Login succesful</h3>
      <Components.Paragraph>You have logged in successfully.</Components.Paragraph>
      <Components.Button onClick={handleLogout}>Logout</Components.Button>
      </Components.Change>

    </div>
  );
};

export default Dashboard;