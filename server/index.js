const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config() ;

//Execute Express
const app = express() ;

//Middlewares
app.use(express.json());
app.use(cors());

app.use("/api/", require("./src/api/api"));

app.listen( process.env.PORT || 5000 , ()=>{
    console.log(`Server is Running on ${process.env.PORT}`);
})

//Database Connection 
const connectionString = process.env.MONGO_URI;
mongoose.connect(connectionString)
    .then(() => console.log('Connected to the MongoDB Database - todos_web_db'))
    .catch((err) => console.error('Connection error:', err));



