import connectDB from "../../MiddleWare/ConnectDB";
import {Testament} from "../../Model/SchemaTestament";
import {User} from "../../Model/SchemaUser";
import Auth from '../../MiddleWare/Auth'

connectDB()
export default async function handle(req,res){


    // Get user his testament
    if (req.method==='GET'){

        console.log('get testament')
        const authorization=await Auth(req,res);
        const getTestament=await Testament.findOne({userId:authorization.id}).populate('voteUsers')

        if (!getTestament) return res.json([])
       return  res.json(getTestament)


    }

    // Post user his testament
    else if (req.method==='POST'){

        await postData(req,res)

    }


    // Delete user his testament
    else if (req.method==='DELETE'){
        const authorization=await Auth(req,res);

       await User.findOneAndUpdate({_id:authorization.id}, {isDeleted:true})
        const getTestament=await Testament.deleteOne({userId:authorization.id})


        res.json(getTestament)
    }


    else if (req.method==='PATCH' ){

        const authorization=await Auth(req,res);

        const getTestament=await Testament.updateOne({userId:authorization.id},{...req.body})
        if (!getTestament) return res.status(400).json({err:'err'})


        return res.json({msg:'success'})
    }


}


const postData=async (req,res)=>{

    const authorization=await Auth(req,res);


  await User.findOneAndUpdate({_id:authorization.id}, {isDeleted:false})

    const createTestament=await Testament.create({...req.body,userId:authorization.id});

    return  res.json(createTestament)
}