









import {User} from "../../../Model/SchemaUser";
import connectDB from "../../../MiddleWare/ConnectDB";
import {createHashPassword} from "../../../MiddleWare/UtilsBackEnd";
import axios from "axios";
import {generateAccessToken, generateRefreshToken} from "../../../MiddleWare/GenerateToken";


connectDB()
export default async  function  handle (req,res){


    // for facebook
    if (req.method==='POST'){
        const{accessToken,id}=req.body;
        // if (!accessToken || !idUser) return res.status(400).json({err:'can not access here'})

       const data= await getUserFacebook(id,accessToken);

        const user=await User.findOne({email:data.email});
        if (user){
            const access_Token=await generateAccessToken({id:user._id})
            const refresh_Token=await generateRefreshToken({id:user._id})
            res.json({user,access_Token,refresh_Token})



        }else {
            const {name,email}=data
            const picture=data.picture.data.url
            const firstName=name.split(' ')[0]
            const lastName=name.split(' ')[1]
            const user=await User.create({name,firstName,lastName,email,picture})
            const access_Token=await generateAccessToken({id:user._id})
            const refresh_Token=await generateRefreshToken({id:user._id})
            res.json({user, access_Token, refresh_Token})
        }

    }
    else if (req.method==='GET'){
        const{id}=req.query
        const Post=await User.findOne({idUser:id})

        res.json(Post)
    }
}


const getUserFacebook=async (idUser,accessToken)=>{
    const URL = ` https://graph.facebook.com/v3.0/${idUser}/?fields=id,name,email,picture&access_token=${accessToken}`

    const {data} = await axios(URL)


        return data
}