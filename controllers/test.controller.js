'use strict'
const userSeed= require('../model/User.model')
const muntherSeed=require('../model/User.model')

const testCountroller =(req,res)=>{
    // res.send('Hello World');
    // const userObject=userSeed();
    // res.json(userObject)

    const userObject=muntherSeed();

    res.json(userObject)
}

module.exports=testCountroller;