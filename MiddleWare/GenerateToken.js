
import jwt from 'jsonwebtoken'







const generateAccessToken=(payload)=>{

    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn: '1m'})
}


const generateRefreshToken=(payload)=>{

    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'30d'})
}

const checkToken=(payload,secret)=>{
    return jwt.verify(payload,secret)
}

export {generateAccessToken,generateRefreshToken,checkToken}