import {User} from "../../../Model/SchemaUser";
import connectDB from "../../../MiddleWare/ConnectDB";
import Auth from "../../../MiddleWare/Auth";
import bcrypt from "bcrypt";
import {comparePassword, createHashPassword} from "../../../MiddleWare/UtilsBackEnd";



connectDB()
export default async function handler(req,res){




    // reset password by user
   if (req.method==='PATCH'){

      const authorization=await Auth(req,res)

      const {newPassword,oldPassword}=req.body;

      const user=await User.findOne({_id:authorization.id})
      if (!user) return res.status(500).json({err:'you cant change password'})


      const checkerPassWord=await bcrypt.compare(oldPassword,user.password)
      if (!checkerPassWord) return res.status(500).json({err:'this password wrong'})

      const newPass=await bcrypt.hash(newPassword,1)
      await User.findOneAndUpdate({_id:authorization.id},{password:newPass})


      res.json({msg:'success',newPass})

   }


}