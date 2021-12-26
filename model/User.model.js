'use strict'

const mongoose = require('mongoose');
const timeMeetingSchema=require('../model/timeMeetingSchema')

const userData = new mongoose.Schema({
    email: { type: String },
    timeMeeting: [timeMeetingSchema]
});

const userModel = mongoose.model('timeMeeting', userData);

const montherSeed = () => {   
    const seller1={
        name:'Qusai Slameh',
        description:'book a meeting on Monday at 5 pm ',
        status:'Ok'
    }
    const seller2= {
        name:'Hazem Almosa',
        description:'book a meeting on Monday at 5 pm ',
        status:'Choose another time, maybe at 12 pm'
    }
    const munther = new userModel({
        email: 'munther.abdlrahman@gmail.com',
        timeMeeting:[seller1, seller2]

    });

    munther.save();
    console.log('munther',munther);
    return (munther);
}
module.exports=userModel