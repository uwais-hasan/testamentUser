









import mongoose from 'mongoose'

const connectDB = () => {
    if(mongoose.connections[0].readyState){

        return;
    }


    mongoose.connect(process.env.MONGODB_URL)
        .then((res)=>{
            console.log('connected')
        })
        .catch((err)=>{
            console.log('unconnected')
        })
}


export default connectDB