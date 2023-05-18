const express = require("express");
const app = express();
const ejs = require('ejs');
const res = require("express/lib/response");
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const URI = 'mongodb+srv://JOSHBAM:OLAYINKA1@cluster0.whles85.mongodb.net/firstday?retryWrites=true&w=majority'

mongoose.connect(URI)
.then(() => {
    console.log('Database connected');
})
.catch((err) => {
    console.log(err);
})

let userSchema = {
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true,},
}

let userModel = mongoose.model('users_collection', userSchema)

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

app.get("/",(req,res) => {
    // console.log("Route slash accessed");
    // console.log(__dirname + "/index.html");
    res.sendFile(__dirname + "/index.html");
})

app.get("/index", (req,res) => {
    // res.send("Hi index")
    res.render("index")
})

app.get("/josh", (req,res) => {
    res.render("josh", {name: "Ola", school: "SQI"})
})

app.get("/signUp", (req,res) => {
    res.render("signUp",{message:""})
})
app.post("/signUp",(req,res) => {
    console.log(req.body);
    let form = new userModel(req.body);
    form.save()
    .then(()=>{
        console.log("Successfully saved")
        res.redirect("signIn")
        // res.render("signUp", {message :'Sign up successfully'})
    })

    .catch((err) => {
        console.log(err);

        if(err.code === 11000){
            console.log(err.code);
            res.render("signUp", {message : 'Email already exist'})
        }else{
            res.render("signUp", {message: "Please fill in all fields"})
        }
    })
})
app.get("/signIn", (req,res) => {
    res.render("signIn", {message: ""})
})
app.post("/signIn", (req,res) => {
    userModel.find({email:req.body.email,password:req.body.password})
    .then((response) => {
        console.log(response);
        if(response.length > 0){
            res.redirect("dash")
        }else{
            res.render('signIn', {message: "Incorrect email or password"})
        }
    })
    .catch((err) => {
        console.log(err);
    })
})
app.get("/dash", (req, res) => {
    // res.render("dash", {name:'Ajamu', food:'Indomie'})
    // res.render("dash")
  
    userModel.find()
      .then((response) => {
        res.render("dash", {response})
        console.log(response);
  });
})
app.get("/edit", (req,res) => {
    res.render("edit")
})
app.listen("4607", () => {
    console.log("server has started on port 4607");
})

app.post('/delete', (req,res) => {
    userModel.findOneAndDelete({email:req.body.userEmail})
    .then((response) => {
        console.log(response);
        res.redirect("dash");
        console.log("deleted successfully");
    })
    .catch((err) => {
        console.log(err);
    })
})