const express=require("express");
const path=require('path');
const app=express();
const mysql=require("mysql");
const dotenv=require('dotenv');


dotenv.config({path:'./.env'});

const publicDirectory=path.join(__dirname,'./public');
app.use(express.static(publicDirectory));


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set('view engine','hbs');



const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,//put the ip address of the server
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})



db.connect((error)=>{
if(error){
    console.log(error);

}
else {
    console.log("connected to database");
}
})

//define routes

app.use('/',require('./routes/pages'));//it will enter the routes and check whether there is any routes
app.use('/auth',require('./routes/auth'));

app.listen(5001,()=>{
    console.log("server started");
})