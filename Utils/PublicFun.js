import {addAuth} from "../Store/Slicess/SliceAuth";
import {addTestament} from "../Store/Slicess/SliceTestament";


const isAuthAccessToken = async (dispatch) => {
    const response = await fetch('http://localhost:3000/api/auth/accessToken');
    const data = await response.json();

    if (data.err) return  localStorage.removeItem('isUser')
    dispatch(addAuth(data))

}
const callTestamentUser = async (dispatch,auth) => {
    if (auth) {
        const response = await fetch('http://localhost:3000/api/testament', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.access_Token}`
            },
        });
        const datas = await response.json();
        if (datas) return dispatch(addTestament(datas))

    }

}




export {isAuthAccessToken,callTestamentUser}