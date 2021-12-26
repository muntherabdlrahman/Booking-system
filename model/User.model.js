'use strict';
const mongoose=require('mongoose');

// book schema
const bookSchema=new mongoose.Schema({
    name:String,
    description:String,
    status:String
})

// user schema
const userSchema= new mongoose.Schema({
    email:{type:String},
    books:[bookSchema]
})



const userModels=mongoose.model('bookingsys',userSchema);



const ibrahem= new userModels(
    {
        email:'ibrahem.omari96@gmail.com',
        books:[{
            name: 'Eloquent javascript',
            description: 'This is a book about instructing computers',
            status:'In-stock'
        } ,
        {
            name: 'Al-asoud yl8 bk',
            description: 'about the relations in love',
            status:'In-stock'
        },
        {
            name: 'Secret',
            description: 'how to atract what you want',
            status:'In-stock'
        },

        {
            name: 'fe 8lbi 2untha 3briah ',
            description: 'story love',
            status:'out-stock'
        }
    
    ]
    }
);


ibrahem.save();
module.exports=userModels;