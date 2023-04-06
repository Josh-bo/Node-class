// const { response } = require('express');
// const { request } = require('express');
// const express = require('express');
// const app = express();

// app.get("/",(request,response) => {
//     console.log("Request made")
//     // response.send("Hello world")
//     response.send([{name:"Joshua", club:"Arsenal"}])
// })
// app.listen(5005,() => {
//     console.log("Your server yaff start ooo");
// }) 

// var myName = "Joshua"
// console.log(myName);


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
    password:{type:String, required:true, unique:true},
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
        console.log("Database ti gbaa wole")
        res.render("signUp", {message :'Sign up successfully'})
    })

    .catch((err) => {
        console.log(err);
        res.render("signUp", {message : 'Failed to submit'})
    })
})
app.get("/signIn", (req,res) => {
    res.render("signIn")
})
app.get("/dash", (req,res) => {
    res.render("dash", {name:'Ajamu', food:'Spag'})
})
app.listen("4607", () => {
    console.log("server has started on port 4607");
})

