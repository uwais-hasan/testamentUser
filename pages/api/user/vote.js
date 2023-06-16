



import Auth from "../../../MiddleWare/Auth";
import auth from "../../../MiddleWare/Auth";
import {User} from "../../../Model/SchemaUser";
import bcrypt from "bcrypt";
import connectDB from "../../../MiddleWare/ConnectDB";
import {Testament} from "../../../Model/SchemaTestament";


connectDB()
export default async function handler(req,res){



    if (req.method==='GET'){

        console.log('get testament or vote')
        try {
            const{id}=req.query;
            const user=await Testament.findOne({userId:id}).populate('userId voteUsers')
            if (!user) return res.json([])
              return  res.json(user)
        }catch (err){
            res.status(500).json({})
        }
    }
    else if (req.method === 'PATCH') {
        const {type,voteSpecialFriends, voteUsers, id} = req.body;


        if (type == 'votes users') {

            const testament = await Testament.findOneAndUpdate({_id: id}, {
                $push: {voteUsers}
            })

            res.json(testament)
        }
    else if (type === 'special Friends') {
           const testament= await Testament.findOneAndUpdate({_id: id}, {
                $push: {voteSpecialFriends}
            })

            return res.json(testament)

        }
    else {res.json({msg: 'error no type'})}

    }


}