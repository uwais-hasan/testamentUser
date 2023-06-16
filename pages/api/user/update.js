import Auth from "../../../MiddleWare/Auth";
import auth from "../../../MiddleWare/Auth";
import {User} from "../../../Model/SchemaUser";
import connectDB from "../../../MiddleWare/ConnectDB";




    connectDB()
export default async function handler(req,res){



    if (req.method==='PATCH'){

        try {
            const authorization=await auth(req,res)
            await User.findByIdAndUpdate({_id:authorization.id},{...req.body});
            res.json({msg:'update success'})


        }catch (err){
            res.status(500).json({err:'err'})
        }
    }

}

