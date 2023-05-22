



import mongoose from "mongoose";


const SchemaFriend=new mongoose.Schema({

    name: {type:String,required:true},
    email:{type:String,required:true},
    data:{type:String,required:true}


},{timestamps:true})

export  const Testament=mongoose.models.friend||mongoose.model('friend',SchemaFriend)