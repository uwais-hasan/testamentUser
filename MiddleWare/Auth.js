
import {checkToken} from './GenerateToken'
import {User} from "../Model/SchemaUser";
import jwt from "jsonwebtoken";




const Auth=async (req,res)=>{
    console.log('Auth run') //run auth

    const auth=req.headers.authorization;

    if (!auth) return res.status(400).json({err:'no token'})

    const token=auth.split(' ')[1]



    const isToken=   jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)


    if (!isToken) return res.status(400).json({err:'this access token is invalid'});


    const user= await User.findOne({_id:isToken.id});

         console.log('user find')
    return {id: user._id, role: user.role, root: user.root};
}

export default Auth;

// const Auth=async (req,res)=> {
//     const token = req.headers.authorization;
//
//     console.log('token',token)
//     if (!token) return res.status(400).json({err: 'Invalid Authentication.'})
//
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
//     console.log('decoded',decoded)
//     if (!decoded) return res.status(400).json({err: 'Invalid Authentication.'})
//
//     const user = await User.findOne({_id: decoded.id})
//
//     console.log(user)
//     return {id: user._id, role: user.role, root: user.root};
// }
//
// export default Auth;