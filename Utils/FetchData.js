import axios from "axios";


const url='https://testament-user-git-main-owies-hassan.vercel.app/api'

const getData=async (path,token,params)=>{

  try {
      const response= await fetch(`${url}/${path}`,{
          method:'GET',
          headers:{
              'Content-Type': 'application/json',
              authorization:`Bearer ${token}`
          },
          body: JSON.stringify(params)
      })
      const data=await response.json();
      return data
  }catch (err){

      return console.log('get'+err.message)
  }




}


const postData=async (path,post,token)=>{

    try {
        const response= await fetch(`${url}/${path}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify(post)
        })
        const data=await response.json();
        return data
    }catch (err){

        return console.log('post'+err.message)
    }




}


const deleteData=async (path,token,id)=>{

    try {
        const response= await fetch(`${url}/${path}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                authorization:`Bearer ${token}`
            },
            body: JSON.stringify(id),

        })
        const data=await response.json();
        return data
    }catch (err){

        return console.log('post'+err.message)
    }




}


const updateData=async (path,post,token)=>{

    try {
        const response= await fetch(`${url}/${path}`,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json',
                Authorization:`Bearer ${token}`
            },
            body:JSON.stringify(post)

        })
        const data=await response.json();
        return data
    }catch (err){

        return console.log('post'+err.message)
    }




}


const uploadImage=async (image)=>{


    const formData=new FormData()


    formData.append('file',image)
    formData.append('upload_preset','tny5kmos')

    const upload=await axios({
        method:'POST',
        url:'https://api.cloudinary.com/v1_1/dcfvkm1zy/image/upload',
        data:formData,
    })

    console.log(upload)



    return upload.data.secure_url



}


export {postData,getData,updateData,deleteData,uploadImage}



