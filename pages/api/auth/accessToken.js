// import {checkToken, generateAccessToken} from "../../../MiddleWare/GenerateToken";
// import {User} from "../../../Model/SchemaUser";
// import {Testament} from "../../../Model/SchemaFriend";
// import connectDB from "../../../MiddleWare/ConnectDB";
//
//
//
//
//       connectDB()
// export default async function   (req,res){
//
//     try {
//
//
//         const refreshToken = req.cookies.refresh_token;
//
//         if (!refreshToken) return res.status(400).json({err: 'no refresh token'})
//
//         const isToken =  checkToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//
//         if (!isToken) return res.status(400).json({err:'invalid refresh token'})
//
//
//         const testament = await Testament.findById('646a55e14207577f90e8e01f')
//
//         // const testament = await Testament.findOne({userId:isToken.id}).populate('userId')
//         const user=await User.findOne({_id:isToken.id})
//
//
//
//         const access_Token =  generateAccessToken({id: user._id}, process.env.ACCESS_TOKEN_SECRET)
//
//
//         res.json({
//             user,
//             access_Token,
//             testament
//         })
//     } catch (err) {
//
//         res.status(400).json({err:err.message})
//     }
//
//
// };
//
//
// //
// // import {checkToken, generateAccessToken} from "../../../MiddleWare/GenerateToken";
// // import {User} from "../../../Model/SchemaUser";
// // import {Testament} from "../../../Model/SchemaFriend";
// // import jwt from 'jsonwebtoken'
// // import connectDB from "../../../MiddleWare/ConnectDB";
// //
// // connectDB()
// // export default async function   (req,res){
// //
// //     try {
// //
// //         console.log('accesstoken','from accesstoken')
// //         const refreshToken = req.cookies.refresh_token;
// //
// //         if (!refreshToken) return res.status(400).json({err: 'no refresh token'})
// //
// //         const isToken =jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
// //
// //         if (!isToken) return res.status(400).json({err:'invalid refresh token'})
// //         console.log('accesstoken',isToken.id)
// //
// //
// //         // const user=await User.findOne({_id:isToken.id})
// //         const user=await User.findById(isToken.id)
// //
// //         console.log('accesstokenssddssdddd',user)
// //
// //         // const testament = await Testament.findById(isToken.id)
// //         // console.log(testament)
// //
// //         const access_Token =generateAccessToken({id: user._id})
// //
// //
// //         res.json({
// //             user,
// //             access_Token,
// //
// //         })
// //     } catch (err) {
// //
// //         res.status(400).json({err:err.message})
// //     }
// //
// //
// // };





import {checkToken, generateAccessToken} from "../../../MiddleWare/GenerateToken";
import {User} from "../../../Model/SchemaUser";
import {Testament} from "../../../Model/SchemaFriend";
import connectDB from "../../../MiddleWare/ConnectDB";
import jwt from "jsonwebtoken";




connectDB()
export default async function   (req,res){

    try {


        const refreshToken = req.cookies.refresh_token;

        if (!refreshToken) return res.status(400).json({err: 'no refresh token'})

        const isToken =  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (!isToken) return res.status(400).json({err:'invalid refresh token'})


        const testament = await Testament.findById('646a55e14207577f90e8e01f')

        // const testament = await Testament.findOne({userId:isToken.id}).populate('userId')
        const user=await User.findOne({_id:isToken.id})



        const access_Token =  generateAccessToken({id: user._id}, process.env.ACCESS_TOKEN_SECRET)


        res.json({
            user,
            access_Token,
            testament
        })
    } catch (err) {

        res.status(400).json({err:err.message})
    }


};


//
// import {checkToken, generateAccessToken} from "../../../MiddleWare/GenerateToken";
// import {User} from "../../../Model/SchemaUser";
// import {Testament} from "../../../Model/SchemaFriend";
// import jwt from 'jsonwebtoken'
// import connectDB from "../../../MiddleWare/ConnectDB";
//
// connectDB()
// export default async function   (req,res){
//
//     try {
//
//         console.log('accesstoken','from accesstoken')
//         const refreshToken = req.cookies.refresh_token;
//
//         if (!refreshToken) return res.status(400).json({err: 'no refresh token'})
//
//         const isToken =jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
//
//         if (!isToken) return res.status(400).json({err:'invalid refresh token'})
//         console.log('accesstoken',isToken.id)
//
//
//         // const user=await User.findOne({_id:isToken.id})
//         const user=await User.findById(isToken.id)
//
//         console.log('accesstokenssddssdddd',user)
//
//         // const testament = await Testament.findById(isToken.id)
//         // console.log(testament)
//
//         const access_Token =generateAccessToken({id: user._id})
//
//
//         res.json({
//             user,
//             access_Token,
//
//         })
//     } catch (err) {
//
//         res.status(400).json({err:err.message})
//     }
//
//
// };