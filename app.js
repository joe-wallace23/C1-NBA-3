//jshint esversion:6


// Start Using Environment Variables to Keep Secret Safe like API address in app.js
require('dotenv').config();
// End Using Environment Variables to Keep Secret Safe like API address in app.js

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");


///Email note only
const nodemailer = require("nodemailer");
///End Email note only

const app = express();





app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
//TODO

app.get("/", function(req,res){
    res.render("home")
});
app.get("/playoff", function(req,res){
  res.render("playoff")
});
app.get("/news", function(req,res){
  res.render("news")
});
app.get("/score", function(req,res){
  res.render("score")
});
app.get("/thanks", function(req,res){
  res.render("thanks")
});
app.get("/contact", function(req,res){
  res.render("contact")
});
app.post("/contact", function(req,res){
 //console.log(req.body);

 const output = `
 <p>You have a new contact request</p>
 <h3>Contact Details</h3>
 <ul>
 <li>Name: ${req.body.fname}</li>
 <li>Last: ${req.body.lname}</li>
 <li>Email: ${req.body.email}</li>
 <li>Selected: ${req.body.select}</li>
 </ul>
 <h3>Message</h3>
 <p>${req.body.message}</p>
 `;
 const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
  }
});

const mailOptions = {
  from: req.body.email, // sender address
  to: process.env.EMAIL, // list of receivers
  subject: req.body.fname, // Subject line // message can be anything
  text: req.body.message,// plain text body'
  html: output
};

transporter.sendMail(mailOptions, function (err, info) {
  if(err)
      console.log(err)
  else
      console.log(info);
})
res.redirect('/thanks');
});


app.listen(process.env.PORT || 3000,function(){
  console.log("Server has started Successfully")
});