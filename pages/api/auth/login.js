
    import {User} from "../../../Model/SchemaUser";
    import {comparePassword} from "../../../MiddleWare/UtilsBackEnd";
    import {generateAccessToken, generateRefreshToken} from "../../../MiddleWare/GenerateToken";
    import connectDB from "../../../MiddleWare/ConnectDB";



    connectDB()
    export default async function handle(req, res) {

        if (req.method === 'POST') {

           await login(req,res)

        }

    }


    const login = async (req, res) => {

       try {
           const {email, password} = req.body;

           if (!email || !password) return res.status(400).json({err:'please fill all field'})

           const user=await User.findOne({email})

           if (!user)  return res.status(400).json({err:'this email did not exist'})

           const checkPassword=await comparePassword(user.password,password)

           if (!checkPassword) return res.status(400).json({err:'password wrong'})


           const access_Token=generateAccessToken({id:user._id})
           const refresh_Token=generateRefreshToken({id:user._id})


           console.log('login success')

           res.json({user, access_Token, refresh_Token
           })
       }catch (err){

           res.status(500).json({err:err.message})

           console.log('login fail')

       }



    }