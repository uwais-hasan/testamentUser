









import mongoose from 'mongoose'

const connectDB = () => {
    if(mongoose.connections[0].readyState){

        return;
    }


    mongoose.connect(process.env.MONGODB_URL)
        .then(()=>{
            console.log('connected')
        })
        .catch(()=>{
            console.log('unconnected')
        })
}


export default connectDB