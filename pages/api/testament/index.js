











import connectDB from "../../../MiddleWare/ConnectDB";

import Auth from '../../../MiddleWare/Auth'
import {Testament} from "../../../Model/SchemaTestament";
import {User} from "../../../Model/SchemaUser";
      connectDB()
export default async function handler(req,res){


    // Get user his testament
    if (req.method==='GET'){

        console.log('get testament')
        const authorization=await Auth(req,res);
        const getTestament=await Testament.findOne({userId:authorization.id}).populate('userId')
        res.json(getTestament)



        const {id,name}=req.query
        res.json({name,id})

        console.log({data:'sadasda'})
    }

    // Post user his testament
    else if (req.method==='POST'){

        const authorization=await Auth(req,res);
        const {typeTestament, testament, selectSpecialFriend, selectReceiveFriend, likesUsers, statusTestament}=req.body

        const user=await User.findOneAndUpdate({_id:authorization.id}, {isDeleted:false})

        const createTestament=await Testament.create({...req.body,userId:authorization.id});

        res.json(createTestament)

        // const {dataOne,dataTwo}=req.body
        // const {id, name}=req.query
        //
        //
        // res.json({dataOne,dataTwo,id, name})

    }


    // Delete user his testament
    else if (req.method==='DELETE'){
        const authorization=await Auth(req,res);

        const user=await User.findOneAndUpdate({_id:authorization.id}, {isDeleted:true})
        const getTestament=await Testament.deleteOne({userId:authorization.id})


        res.json(getTestament)
    }
    //update user his testament

    else if (req.method==='PATCH' ){
        const authorization=await Auth(req,res);

        const getTestament=await Testament.updateOne({userId:authorization.id},{...req.body})


        res.json(getTestament)
    }


}