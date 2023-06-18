import connectDB from "../../../MiddleWare/ConnectDB";
import {User} from "../../../Model/SchemaUser";
import Auth from '../../../MiddleWare/Auth'

connectDB()
export default async function handle(req, res) {


    if (req.method === 'POST') {

        await Auth(req,res)


        const {name, email, type,password} = req.body;

        if (type === 'select special friends') {

            const user=await User.findOne({email,name}).select('email firstName lastName picture ')

            if (user) return res.json({name,email,password,picture:user.picture,isExist:true})

           return  res.json({name,email,password,picture:'https://th.bing.com/th/id/OIP.mP1RB8xuQaHAvUkonYY6HwHaHK?pid=ImgDet&rs=1',isExist:false})
        } else {

            res.json({mes:'hi'})
        }
    }

}