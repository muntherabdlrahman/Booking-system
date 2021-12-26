const userModels=require('../model/User.model');
const getbook=(req,res)=>{
    let email=req.query.email
    userModels.findOne({email:email}, (error, user)=>{
        if (error){
            res.send(error.message)
        }
        res.json(user.books);
    });
}

// add new book 

const addBook=(req,res)=>{
    const {email,name,description,status}= req.body;
    console.log(req.body)
    
    userModels.findOne({email:email}, (error, user)=>{
        if(error){
            res.send('error');
        }else{
            const newData={

                name:name,
                description:description,
                status:status
            }
             user.books.push(newData)
            user.save();
            // console.log(book);
            res.json(user.books)
        }
    })
        
}

// delete book
const deleteBook=(req,res)=>{
    const book_id=Number(req.params.index);
    const email=req.query.email;
    userModels.findOne({email:email}, (error, user)=>{
        let newBookArra=[];
        user.books.forEach((el,idx)=>{
            if(idx!==book_id){
                newBookArra.push(el);
            }
        })
        user.books=newBookArra;
        user.save();
        res.send(user.books)
    });

}


const updateBook=(req,res)=>{
    const {email,name,description,status}= req.body;
    const book_id=Number(req.params.index);
    userModels.findOne({email:email}, (error, user)=>{
        if (error) {
            res.send(error);
        }
        else{
            user.books.splice(book_id,1,{name:name,description:description,status:status});
            user.save();
            res.send(user.books)
        }
    })
}





module.exports={getbook,addBook,deleteBook,updateBook};