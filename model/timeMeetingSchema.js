'use strict';
const mongoose = require('mongoose');

const timeMeetingSchema = new mongoose.Schema({

    name: { type: String },
    description: { type: String },
    status: { type: String },
    date: {type:Date}

});
module.exports=timeMeetingSchema;