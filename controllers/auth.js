const mysql=require("mysql");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const db=mysql.createConnection({
    host:process.env.DATABASE_HOST,//put the ip address of the server
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
})

exports.register=(req,res)=>{
    console.log(req.body);



    const {name,email,password,ConfirmPassword}=req.body;

    db.query('SELECT email FROM users WHERE email= ?',[email],async(error,results)=>{
        if(error){
            console.log(error);
                    }
            if(results.length>0){
    return res.render('register',{
        message:'That email is already in use'
    })
}
else if(password!==ConfirmPassword){
    return res.render('register',{
        message:'Passwords donot match'
})}
let hashedPassword=await bcrypt.hash(password,8);
 db.query('INSERT INTO users SET ?' , {name:name,email:email,password:hashedPassword},(error,results)=>{
    if(error){
        console.log(error)
    }else{
        return res.render('register',{
            message:'USER registered'
    })
    }
 })
});



    res.send("Form submitted");
}