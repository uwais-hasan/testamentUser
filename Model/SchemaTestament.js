import mongoose from "mongoose";


const SchemaTestament=new mongoose.Schema({

    typeTestament: {type:String,required:true},
    testament:{type:String,required:true},
    selectSpecialFriend: [{name: {type: String, required: true}, email: {type: String, required: true}, date: {type: String, required: true},}],
    selectReceiveFriend:[{name: {type: String, required: true}, email: {type: String, required: true}, date: {type: String, required: true},}],
    likesUsers:[{type:mongoose.Types.ObjectId,ref:'users'}],
    statusTestament: {type: Boolean, default: false},
    userId: {type:mongoose.Types.ObjectId,ref:'users'}

},{timestamps:true})

export  const Testament=mongoose.models.Testament||mongoose.model('Testament',SchemaTestament)