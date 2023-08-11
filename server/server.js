const express=require("express");
const mysql=require("mysql2");

const app=express();

app.use(express.json());

const db=mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"nidhish@25",
    database:"login",
});

app.post("/register",(req,res)=>{
     db.query("INSERT INTO users (email,password) VALUES (?,?)",[email,password],
     (err,result)=>{
        console.log(err);
     });
});
app.listen(3000,()=>{
    console.log("workingggg");
});