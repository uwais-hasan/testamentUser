import mongoose from "mongoose";

// 1@gmail.com
const testament=new mongoose.Schema({

    typeTestament: {type:String},
    testament:{type:String},
    selectSpecialFriend: [{name: {type: String}, email: {type: String},password:{type:String},picture:{type:String,default: 'https://th.bing.com/th/id/OIP.mP1RB8xuQaHAvUkonYY6HwHaHK?pid=ImgDet&rs=1'},createdAt: { type: Date, default: Date.now }}],
    selectReceiveFriend:[{name: {type: String}, email: {type: String},password:{type:String},createdAt: { type: Date, default: Date.now }}],

    countLikeUsers:{type:Number},

    statusTestament: {type: Boolean, default: false},
    userId: {type:mongoose.Types.ObjectId,ref:'users'},



    // when voting
    voteSpecialFriends:[{name: {type: String},email:{type:String},picture:{type:String},createdAt: { type: Date, default: Date.now }}],
    voteUsers:[{type:mongoose.Types.ObjectId,ref:'users'}] // length  interaction






},{timestamps:true})

export  const Testament=mongoose.models.testaments||mongoose.model('testaments',testament)



