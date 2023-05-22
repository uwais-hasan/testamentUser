import React, {useState} from 'react';
import styles from "../../styles/Home.module.css";
import CustomManager from "./customManager";

const RoleManagers = () => {
    const [customeRole,setCustomeRoue]=useState({
        admin: {
            report: {view: true, delete: true},
            user: {add: true, update: true, view: false , delete: true},
            testament: {view: true, delete: false},
            contact: {view: true, delete: false},
        },
        editor: {
            report: {view: false, delete: false},
            user: {add: false, update: false, view: false, delete: false},
            testament: {view: false, delete: false},
            contact: {view: false, delete: false},
        },
        observe: {
            report: {view: false, delete: null},
            user: {add: null, update: null, view: null, delete: null},
            testament: {view: null, delete: null},
            contact: {view: null, delete: null},
        }
    })
    const [role, setState] = useState('')
    const [page, setPage] = useState('')
    const[message,setMessage]=useState('')


    const view=(list)=>{

       return customeRole[role][page][list]?setMessage('yes you can access here'):setMessage('no you can not access here')

    }
    const deleteing=(list)=>{
        return customeRole[role][page][list]?setMessage('yes you can access here'):setMessage('no you can not access here')

    }
    const update=(list)=>{
        return customeRole[role][page][list]?setMessage('yes you can access here'):setMessage('no you can not access here')

    }
    const add=(list)=>{
        return customeRole[role][page][list]?setMessage('yes you can access here'):setMessage('no you can not access here')

    }



    return (
        <div className={styles.container}>
            <div>
                <div>
                    <p>admin</p> <span>report user testament contact</span>
                    <p>editor</p>
                    <p>observe</p>
                </div>
                __________________________________________<br/><br/><br/>
                <div>
                    role
                    <input value={role} onChange={(e)=>setState(e.target.value)}/>
                    page
                    <input value={page} onChange={(e)=>setPage(e.target.value)}/>
                    <button onClick={()=>view('view')}>view</button>
                    <button onClick={()=>deleteing('delete')}>delete</button>
                    <button onClick={()=>add('add')}>add</button>
                    <button onClick={()=>update('update')}>update</button>
                </div>

                __________________________________________<br/><br/><br/>

                <h1>{role}/{page}/{message}</h1>


                __________________________________________<br/><br/><br/>

            </div>
            <CustomManager/>
        </div>
    )
};

export default RoleManagers;