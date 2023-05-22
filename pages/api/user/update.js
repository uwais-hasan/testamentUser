import Auth from "../../../MiddleWare/Auth";
import auth from "../../../MiddleWare/Auth";
import {User} from "../../../Model/SchemaUser";


export default async function handler(req,res){


    //update user his data
    if (req.method==='PATCH'){

        try {
            const authorization=await auth(req,res)


            // if (!authorization) return res.json({err:'you can not access here'})

            const user=await User.findByIdAndUpdate({_id:authorization.id},{...req.body});

            res.json({msg:'update success'})

            console.log(user)
        }catch (err){
            res.status(400).json({err:'err'})
        }
    }

}

