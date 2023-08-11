import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from 'react-router-dom';  
import { useNavigate } from 'react-router-dom';
import {useState,useEffect} from "react";
import * as Components from './Components';
import Axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';




function App() {
    const [signIn, toggle] = useState(true);
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);

    
    Axios.defaults.withCredentials=true;
    const navigate = useNavigate();

    // useEffect(() => {
    //     // Use Axios to send a request to your server to check authentication
    //     console.log("useEffect is running");
    //     Axios.get("http://localhost:3000/check-authentication", {
    //       withCredentials: true, // Include cookies in the request
    //     })
    //       .then((response) => {
    //         const { authenticated } = response.data;
    //         if (authenticated) {
    //           // User is authenticated, redirect to the dashboard
    //           navigate("/Dashboard");
    //         }
    //         else{
    //             navigate("/");
    //         }
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }, []);
    //FORGOT PASSWORD
    const handlePassword =() => {
        try {
            window.location.href = '/ChangePassword';
        } catch (error) {
          toast.error('Error sending password reset email. Please try again later.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        }
    };
    //LOGIN
    const login=(e)=>{
        
   
        console.log(email);
        console.log(password);
        e.preventDefault();
        console.log(e);
        if(!email){
            toast.error('Enter a valid username', {
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
        if(!password){
            toast.error('Enter a password.', {
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
       const response= Axios.post('http://localhost:3000/login', { email:email, password:password })
       .then((response) =>{
      const { data } = response;
      if (data.code===1) {
        toast.error('Incorrect password', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    
      } else if(data.code===2){
        toast.error('Username does not exist , signup to continue', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      }
      else if(data.code===3){
        toast.error('Account not verified.Confirm your email by signing up', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
      }
      else{
        setTimeout(() => {
            navigate('/Dashboard');
          }, 1000);
        // toast.success('login successful', {
        //     position: "top-center",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "light",
        //     });
      }
    })
    .catch((error) => {
      console.error(error);
      toast.error('Error occurred during login', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        
    });
    };

    
      

    //To validate password
    const validatePassword=(password)=>{
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return(strongPasswordRegex.test(password));
    }
  
    //To validate email
    const validateEmail=(email)=>{
        const Regex = /^[A-Za-z]+[0-9]{8}@snuchennai\.edu\.in$/;
        return Regex.test(email);
    }

    //SIGNUP
    const signup=(e)=>{
        e.preventDefault();
        if (!validateEmail(email) || !email) {
            toast.error('Invalid email address', {
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
        if(!validatePassword(password) || !password){
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
       if(password===confirmPassword){
        Axios.post('http://localhost:3000/users',{email:email,password:password,confirmPassword:confirmPassword}).then((response)=>{
            const { data } = response;
                if (data.code===1) {
                    toast.info('Check mail for confirmation to finish signing up', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
            }   
            else{
                    toast.error('Password and confirm password fields do not match', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            }
        })
        .catch((error) => {
            console.error(error);
            toast.error('Username already exists', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
          });
    }
    };
     return(
<>
         <Components.Container>
             <Components.SignUpContainer signinIn={signIn}>
                 <Components.Form>
                     <Components.Title>Create Account</Components.Title>
                     <Components.Input onChange={(e)=>{
                        setEmail(e.target.value);
                     }} type='email' placeholder='Email' />

                     <div style={{ position: 'relative', display: 'inline-block',width:'100%'}}>
                     <Components.Input onChange={(e)=>{
                        setPassword(e.target.value);
                     }}  type={showPassword ? "text" : "password"} placeholder='Password' />
                     <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
                        onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}/>
                     </div>
                    
                      <div style={{ position: 'relative', display: 'inline-block', width:'100%' }}>
                      <Components.Input onChange={(e)=>{
                        setConfirmPassword(e.target.value);
                     }}  type={showConfirmPassword ? "text" : "password"} placeholder='Confirm Password' />
                      <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
                        onClick={() => setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword)}/>
                      </div>
                    
                     <Components.Button onClick={signup}>Sign Up</Components.Button>
                 </Components.Form>
             </Components.SignUpContainer>

             <Components.SignInContainer signinIn={signIn}>
                  <Components.Form>
                      <Components.Title>Login</Components.Title>
                      <Components.Input onChange={(e)=>{
                        setEmail(e.target.value);
                     }} type='email' placeholder='Email' />
                     <div style={{ position: 'relative', display: 'inline-block',width:'100%'}}>
                     <Components.Input onChange={(e)=>{
                        setPassword(e.target.value);
                     }}  type={showPassword ? "text" : "password"} placeholder='Password' />
                      <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} password-icon`}
                        onClick={() => setShowPassword((prevShowPassword) => !prevShowPassword)}/>

                     </div>
                     
                      <Components.Anchor href='/ChangePassword' onClick={handlePassword} >Forgot your password?</Components.Anchor>        
                        
                      <Components.Button onClick={login}>Login</Components.Button>
                  </Components.Form>
             </Components.SignInContainer>

             <Components.OverlayContainer signinIn={signIn}>
                 <Components.Overlay signinIn={signIn}>

                 <Components.LeftOverlayPanel signinIn={signIn}>
                     <Components.Title>Welcome!</Components.Title>
                     <Components.Paragraph>
                         Login to access your dashboard 
                     </Components.Paragraph>
                     <Components.GhostButton onClick={() => toggle(true)}>
                        Login
                     </Components.GhostButton>
                     </Components.LeftOverlayPanel>

                     <Components.RightOverlayPanel signinIn={signIn}>
                       <Components.Title>Hello, Student</Components.Title>
                       <Components.Paragraph>
                           Sign up and get your outpass online!
                       </Components.Paragraph>
                           <Components.GhostButton onClick={() => toggle(false)}>
                               Sign Up
                           </Components.GhostButton> 
                     </Components.RightOverlayPanel>
 
                 </Components.Overlay>
             </Components.OverlayContainer>
         </Components.Container>
         <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        progress={undefined}
        theme="light"
      />
        </>
     )
}

export default App;

