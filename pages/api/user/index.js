

import auth from '../../../MiddleWare/Auth'
import {User} from "../../../Model/SchemaUser";
import connectDB from "../../../MiddleWare/ConnectDB";
import {Testament} from "../../../Model/SchemaTestament";




      connectDB()
export default async function handler(req,res){


    //get all users by admin
    if (req.method==='GET'){

      try {
          const authorization=await auth(req,res)

          const {role,id,root}=authorization

          if (role ==='user') return res.json({err:'you can not access here'})

          const users=await User.find({});

          res.json(users)
      }catch (err){
          res.status(500).json({err:'err'})
      }


    }

    // Set  user as admin
        //here it is really update in db but in res not update under refresh
    else if (req.method==='PATCH'){
        try {
            const authorization=await auth(req,res)


            const{id,role}=req.body

            if (authorization.role !=='admin') return res.json({err:'you can not access here'})

            const user=await User.findByIdAndUpdate({_id:id},{role});

            res.json({meg:'add admin success'})

            console.log(user)
        }catch (err){
            res.status(500).json({err:'err'})
        }
    }

    // Delete  user by admin
    else if (req.method==='DELETE'){


        const {id}=req.body

        const authorization=await auth(req,res)
        if (authorization.role !=='admin') return res.json({err:'you can not access here'})
        await User.findByIdAndDelete({_id:id})
      const user=  await Testament.findOneAndDelete({userId:id})

             console.log('success',user)


        res.json({msg:'success delete'})
        try {

        }catch (err){
            res.status(500).json({err:'err delete'})
        }

    }
}