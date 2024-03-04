

import {checkToken, generateAccessToken} from "../../../MiddleWare/GenerateToken";
import {User} from "../../../Model/SchemaUser";

import connectDB from "../../../MiddleWare/ConnectDB";



  connectDB()
export default async function (req, res) {

        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) return res.status(400).json({err: 'no refresh token'})

        const isToken =  checkToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!isToken) return res.status(400).json({err: 'invalid refresh token'})

    const user = await User.findOne({_id: isToken.id})


    const access_Token =  generateAccessToken({id: user._id}, process.env.ACCESS_TOKEN_SECRET)

       return  res.json({
            user,
            access_Token,
        })
    }

