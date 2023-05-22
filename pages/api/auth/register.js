import connectDB from "../../../MiddleWare/ConnectDB";
import {checkValidation, createHashPassword} from "../../../MiddleWare/UtilsBackEnd";
import {User} from "../../../Model/SchemaUser";

import {generateAccessToken, generateRefreshToken} from "../../../MiddleWare/GenerateToken";
import bcrypt from "bcrypt";





connectDB()
export default   async function(req,res) {

    if (req.method==='POST'){

       await register(req,res)
    }

}



const register=async (req,res)=>{
try {


    const{firstName,lastName,email,password,re_password}=req.body;

    const isValid=checkValidation(firstName,lastName,email,password,re_password)

    if (isValid) return res.status(400).json({err:isValid});


    const hash=await createHashPassword(password,12)

    const isUserExist=await User.findOne({email});

    if (isUserExist) return res.status(400).json({err:'this email already exist'})

    const createString=await createHashPassword(email,1)
    const randomString=createString.slice(0,10)
    const user=await User.create({firstName,lastName,email,password:hash,randomString})

    const access_Token=await generateAccessToken({id:user._id})
    const refresh_Token=await generateRefreshToken({id:user._id})

    res.json({user,msg:'success',access_Token,refresh_Token,randomString})
    console.log('success register')
}catch (err){
    res.status(500).json({err:err.message})
    console.log('fail register')
}
}