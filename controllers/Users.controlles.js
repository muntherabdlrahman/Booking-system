'use strict';

const userModel=require('../model/User.model');

const UserController=(req,res)=>{
    
    const searchQ= req.query.email;
    console.log('req.query.email',req.query.email)
    userModel.findOne({email:searchQ},(error,user)=>{
    
        if(!user){
            res.send('user not found');
        }else{
            // console.log(user.books)
            res.json(user.books);
        }
    })
}

const userPost =(req,res)=>{
    const{
        userEmail,
        name,
        description,
        status
    }=req.body;
    // console.log(req.body)
    userModel.findOne({email:userEmail},(error,user)=>{
        if(error){
            res.send('user not found');
        }else{
            const newBook = {
                name:name,
                description:description,
                status:status
            }
            user.books.push(newBook);
            // console.log('neww book',newBook);
            // console.log('user books',user.books);
            user.save();
            // console.log(user.books);
            res.json(user.books);
        }
    })
}

// const userDelete =(req,res)=>{
//     const bookIndex = req.params.book_idx;
//     const email = req.query

//     userModel.findOne({email:email},(error,user)=>{
//         if(error){
//             res.send('user not found');
//         }else{
//             user.books.splice(bookIndex,1);
//             console.log('bookIndex',bookIndex);
//             console.log('user books',user.books);
//             user.save();
//             // res.send(user.books);
//             res.send('book deleted')
//         }
//     })
// }


const userDelete =(req,res)=>{
    const bookIndex = req.params.book_idx;
    const {email} = req.query
    userModel.findOne({email:email},(error,user)=>{
        if(error){
            res.send('user not found');
        }else{
            user.books.splice(bookIndex,1);
            console.log('bookIndex',bookIndex);
            console.log('user books',user.books);
            user.save();
            // res.send(user.books);
            res.send('book deleted')
        }
    })
}

const updateBook=(req,res)=>{
    const {email,name,description,status}= req.body;
    const book_id=Number(req.params.book_idx);
    userModel.findOne({email:email}, (error, user)=>{
        if (error) {
            res.send('user not found');
        }
        else{
            user.books.splice(book_id,1,{name:name,description:description,status:status});
            user.save();
            res.send(user.books)
        }
    })
}


module.exports={
    UserController,
    userPost,
    userDelete,
    updateBook

}