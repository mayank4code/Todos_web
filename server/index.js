const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config() ;

const app = express() ;

app.use(express.json());
app.use(cors());

app.listen( process.env.PORT , ()=>{
    console.log(`Server is Running on ${process.env.PORT}`);
})


