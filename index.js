const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const port=  process.env.PORT ||5000


const app=express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

mongoose.connect('mongodb://localhost:27017/loginRegister',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection is successful")
 }).catch((error)=>{
    console.log("No connection")
 });

 app.post("/login", (req, res)=> {
   const { email, password} = req.body
   User.findOne({ email: email}, (err, user) => {
       if(user){
           if(password === user.password ) {
               res.send({message: "Login Successfull", user: user})
           } else {
               res.send({ message: "Password didn't match"})
           }
       } else {
           res.send({message: "User not registered"})
       }
   })
}) 
 

app.post("/register", (req, res)=> {
   const { name, email, password} = req.body
   User.findOne({email: email}, (err, user) => {
       if(user){
           res.send({message: "User already registerd"})
       } else {
           const user = new User({
               name,
               email,
               password
           })
           user.save(err => {
               if(err) {
                   res.send(err)
               } else {
                   res.send( { message: "Successfully Registered, Please login now." })
               }
           })
       }
   })
       
}) 

 
 const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
 })
 const User =new mongoose.model("User",userSchema);


 app.listen(port, () => {
    console.log(`connection is done at this port number ${port}`)
}); 
 