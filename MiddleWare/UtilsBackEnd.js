



import bcrypt from 'bcrypt'

const validateEmail=(email)=> {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
const createHashPassword= (password,salt)=>{

    return  bcrypt.hash(password,salt)
}

const comparePassword= (oldPassword,newPassword)=>{
    return  bcrypt.compare(newPassword,oldPassword)

}


const checkValidation=(lastName,firstName,email,password,re_password)=>{

    if (!lastName || !firstName || !email || !password || !re_password){
        return 'please add all field'
    }


    else if (password.length<4){
        return 'password must be at least 6 characters'
    }

    else if (password !== re_password){

        return 'confirm password did not match'
    }
    if(!validateEmail(email))
        return 'Invalid emails'
}


export {createHashPassword,comparePassword,checkValidation}