




import mongoose from 'mongoose'


const user = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {type:String,unique:true,required:true,trim:true},
    picture: {type:String,default:'https://th.bing.com/th/id/OIP.mP1RB8xuQaHAvUkonYY6HwHaHK?pid=ImgDet&rs=1'},
    age:Number,
    country:String,
    password:String,
    city:String,
    phone:Number,
    isAlive:Boolean,
    role:{type:String,default: 'user'},
    root: {
        type: Boolean,
        default: false
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    randomString:{type:String},

},{ timestamps: true})


export const User=mongoose.models.users||mongoose.model('users',user)