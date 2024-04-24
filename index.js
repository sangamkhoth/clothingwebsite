const express = require('express')

const path=require('path');

const http=require('http')

const app = express()
const LogInCollection=require('./mongo')

var bodyParser=require("body-parser");
// const { mongo } = require('mongoose');



app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'));
})
app.get('/formal',(req,res)=>{
  res.sendFile(path.join(__dirname,'formal.html'));
})
app.get('/men',(req,res)=>{
  res.sendFile(path.join(__dirname,'men.html'));
})
app.get('/women',(req,res)=>{
  res.sendFile(path.join(__dirname,'women.html'));
})
app.get('/login',(req,res)=>{
  res.sendFile(path.join(__dirname,'login.html'));
})
app.get('/checkout',(req,res)=>{
  res.sendFile(path.join(__dirname,'checkout.html'));
})



app.post('/sign', async (req, res) => {
  const { email, pass, cpass } = req.body;

  const data = {
    email,
    pass,
    cpass,
  };

  try {
    const checking = await LogInCollection.findOne({ email });
    if (checking) {
      res.status(400).send("User details already exist");
      return;
    }
    const newUser = new LogInCollection(data);
    await newUser.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

app.post('/login',async (req, res) => {
  try {
    const check = await LogInCollection.findOne({ email: req.body.email });
    if (!check || check.pass !== req.body.pass) {
      res.status(401).send("Invalid email or password");
      return;
    }
    res.status(201).sendFile(path.join(__dirname,'index.html'));
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred");
  }
});

const port = process.env.PORT || 3000;
app.listen(port);