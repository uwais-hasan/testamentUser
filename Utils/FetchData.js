



const url='http://localhost:3000/api'

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
                authorization:`Bearer ${token}`
            },
            body: JSON.stringify(post)
        })
        const data=await response.json();
        return data
    }catch (err){

        return console.log('post'+err.message)
    }




}


const deleteData=async (path,token)=>{

    try {
        const response= await fetch(`${url}/${path}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                authorization:`Bearer ${token}`
            },

        })
        const data=await response.json();
        return data
    }catch (err){

        return console.log('post'+err.message)
    }




}


const updateData=async (path,token,post)=>{

    try {
        const response= await fetch(`${url}/${path}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
                authorization:`Bearer ${token}`
            },
            body:JSON.stringify(post)

        })
        const data=await response.json();
        return data
    }catch (err){

        return console.log('post'+err.message)
    }




}


export {postData,getData,updateData,deleteData}



