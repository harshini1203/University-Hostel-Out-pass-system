//jshint esversion:6

const express = require("express");
const dotenv=require('dotenv');
dotenv.config();
const bodyParser = require("body-parser");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const mysql = require('mysql2/promise');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');
const bcrypt=require('bcrypt');
const uuid=require("uuid");
const flash=require('express-flash');
const passport=require('passport');
const { sendVerificationEmail, JWT_SECRET }=require('./src/mailer');

const salt=10;

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
}));
app.use(flash());
app.use(session({
  secret:JWT_SECRET,
  resave:false,
  saveUninitialized:false
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

const pool = mysql.createPool({
  host: 'localhost', // or your MySQL server host
  user: 'root', // or your MySQL username
  password: 'nidhish@25', // or your MySQL password
  database: 'login' // your MySQL database name
});

  async function getUserByEmail(email){
    try{
      const query = 'SELECT * FROM users WHERE email = ?';
      const [rows, fields] = await pool.execute(query, [email]);
      return rows.length ? rows[0] : null;
  }
    catch (error) {
      throw error;
    }
  };
  
  app.post('/change',async(req,res)=>{
    const{email}=req.body;
    try{
      const user = await getUserByEmail(email);
      if(!user){
        res.json({ code: 1 });
      }
      else{
        console.log("exists");
        res.json({ code: 2 });
        sendVerificationEmail(email,2);
      }
    }
    catch(error){
      console.error(error);
    }
  });
  // Create a new user
  function hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password.toString(), salt, (err, hash) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(hash);
      });
    });
  }
  app.post('/users',async(req, res) => {
    const { email, password, confirmPassword } = req.body;
  try{
    if(password===confirmPassword){
      const hashedPassword = await hashPassword(password);
    pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    sendVerificationEmail(email,1);

  
    res.json({code:1});
    }
    else{
      res.json({code:2});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Username already exists' });
  }
  });
  app.get('/PasswordReset', async (req, res) => {
    const token = req.query.token;
    if (!token) {
      return res.status(400).send('Invalid password reset link');
    }
  
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const email = decodedToken.userId;
      const user = await getUserByEmail(email);
  
      if (!user) {
        return res.status(400).send('User not found');
      }
      else{
        res.redirect(301,`http://localhost:3001/PasswordReset?email=${encodeURIComponent(email)}`);
        // res.send("correct");
      }
    } catch (e) {
      res.status(400).send('Invalid or expired password reset link');
    }
  });

  app.post('/PasswordReset',async(req,res)=>{
    const { email, password, confirmPassword } = req.body;
    try{
      console.log("entered reset ehehe");
      if(password===confirmPassword){
        const hashedPassword = await hashPassword(password);
        console.log(`Updating password for email: ${email}`);
        pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword,email]);
        console.log(hashedPassword);
        res.json({ code: 1 });
      }
      else{
        res.json({ code: 2 });
      }
    }
   catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Username already exists' });
    }
  });
  
  app.get("/verify", async (req, res) => {
    const token = req.query.token;
    // console.log(JWT_SECRET);
    if (token === null) return res.sendStatus(401);
    try {
      const decodedToken = jwt.verify(token,JWT_SECRET);
      const email = decodedToken.userId;
      console.log(email);
      const user =await getUserByEmail(email);
      // Execute the UPDATE query to set verificationToken to 1
      if(user){
        const query = 'UPDATE users SET verificationToken = ? WHERE email = ?';
        await pool.execute(query, [1, email]);
        res.redirect(301,`http://localhost:3001/VerificationSuccess`);
      }
      
    } catch (e) {
      res.sendStatus(401);
    }
  });
 
  app.post('/login',async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await getUserByEmail(email);
      if (!user) {
        res.json({ code: 2 });
      } else {
        bcrypt.compare(password.toString(), user.password, async(err, result) => {
          if (!user.verificationToken) {
            res.json({ code: 3 });
              const query = 'DELETE FROM users WHERE email = ?';
              await pool.execute(query, [email]);
              res.send(`Email not verified ,signup again to confirm.`);
          }
          else if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred during login' });
          } else if (!result) {
            res.json({ code: 1 });
          }  else {
            res.json({ code: 0, authenticated: true });
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred during login' });
    }
    
  });

 
  // Update an existing user
  app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (error, results) => {
      if (error) throw error;
      res.send('User updated successfully.');
      console.log('signuped up!');
    });
  });
  
  // Delete a user
  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    pool.query('DELETE FROM users WHERE id = ?', userId, (error, results) => {
      if (error) throw error;
      res.send('User deleted successfully.');
    });
  });

  app.listen(3000, function() {
    console.log("Server started on port 3000");
  });