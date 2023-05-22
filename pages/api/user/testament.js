



import Auth from "../../../MiddleWare/Auth";
import auth from "../../../MiddleWare/Auth";
import {User} from "../../../Model/SchemaUser";
import bcrypt from "bcrypt";
import connectDB from "../../../MiddleWare/ConnectDB";


       connectDB()
export default async function handler(req,res){


   //page testament interaction get data user (any user can access here)

    if (req.method==='GET'){
      try {
          const{firstName,randomString}=req.query;


          const user=await User.findOne({randomString})


          res.json(user)
      }catch (err){
          res.status(500).json({err:err.message})
      }
    }


}