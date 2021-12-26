'use strict';
require('dotenv').config();
const express=require('express');
const app=express();
const axios = require("axios");
const mongoose=require('mongoose');
app.use(express.json());
const PORT = process.env.PORT || 8001
const cors=require('cors');
app.use(cors());
const jwt=require('jsonwebtoken');
const jwksClient=require('jwks-rsa');
const testCountroller=require("./controllers/test.controller")

const {getbook,addBook,deleteBook,updateBook}=require('./controllers/Users.controlles');
mongoose.connect('mongodb://localhost:27017/bookingsys',
    { useNewUrlParser: true, useUnifiedTopology: true }
);



app.get('/',
(req,res)=>res.send('Hello word'))// user end-point
app.get('/books',getbook);
app.get('/test',testCountroller);

// user add book end-point
app.post('/create-books',addBook);
app.post('/test',addBook);

// user delete book end-point
app.delete('/delete-books/:index',deleteBook);

// user update book end-point
app.put('/update-book/:index',updateBook);

const client = jwksClient({
    // this url comes from your app on the auth0 dashboard 
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  });

// this is a ready to use function
const getKey=(header, callback)=>{
    client.getSigningKey(header.kid, function(err, key) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
      });
}

// 'Bearer ;alsdkj;laskd;lkasd;lkl'
app.get('/authorize',(req,res)=>{
    const token=req.headers.authorization.split(' ')[1];
    jwt.verify(token,getKey,{},(err,user)=>{
        if(err){
            res.send('invalid token');
        }
        res.send(user)
    })
    res.send(token);
});

app.listen(process.env.PORT,()=>{
    console.log(`listening to port: ${process.env.PORT}`);
})
