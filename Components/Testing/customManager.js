//
//
//
//
// import React, {useState} from 'react';
// import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
//
// const CustomManager = () => {
//
//
//     const [selectRole,setSelectRoue]=useState('admin')
//     const [customeRole, setCustomRole] = useState({
//         admin: {
//             report: {view: true, delete: true},
//             user: {add: true, update: true, view: false, delete: true},
//             testament: {view: true, delete: true},
//             contact: {view: true, delete: true},
//         },
//         editor: {
//             report: {view: false, delete: false},
//             user: {add: false, update: false, view: false, delete: false},
//             testament: {view: false, delete: false},
//             contact: {view: false, delete: false},
//         },
//         observe: {
//             report: {view: false, delete: null},
//             user: {add: null, update: null, view: null, delete: null},
//             testament: {view: null, delete: null},
//             contact: {view: null, delete: null},
//         }
//     })
//
//
//
//     const handleChange = (view) => {
//         // setCustomRole({
//         //     ...customeRole, [selectRole]:
//         //         {
//         //             ...customeRole[selectRole],
//         //             report: {...customeRole[selectRole].report, [view]: '!customeRole[selectRole].report.view'}
//         //         }
//         // })
//         setCustomRole({
//             ...customeRole,
//             admin: {...customeRole.admin, report: {...customeRole.admin.report, view: false}}
//         })
//
//     }
//     console.log(customeRole)
//     console.log(selectRole)
//     return (
//         <div>
//             <select onChange={(e)=>setSelectRoue(e.target.value)}>
//                 <option value='admin'>admin</option>
//                 <option value='editor'>editor</option>
//                 <option value='observe'>observe</option>
//             </select>
//
//             <h1>user</h1>
//
//
//             <button onClick={()=>handleChange('view')}>click</button>
//         </div>
//     );
// }
//
// export default CustomManager;





import React, {useState} from 'react';
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CustomManager = () => {


    const [selectRole,setSelectRoue]=useState('admin')
    const [customeRoles, setCustomeRoles] = useState({
        admin: {
            report: {view: true, delete: true},
            user: {add: true, update: true, view: true, delete: true},
            testament: {view: true, delete: true},
            contact: {view: true, delete: true},
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



    const handleChange = (view,name) => {
        setCustomeRoles({
            ...customeRoles, [selectRole]:
                {
                    ...customeRoles[selectRole],
                    [name]: {...customeRoles[selectRole][name], [view]: !customeRoles[selectRole][name][view]}
                }
        })


    }


    console.log(customeRoles)
    return (
        <div>
            <select onChange={(e)=>setSelectRoue(e.target.value)}>
                <option value='admin'>admin</option>
                <option value='editor'>editor</option>
                <option value='observe'>observe</option>
            </select>

            <h1>user</h1>
            <FormGroup>
                <FormControlLabel control={<Checkbox
                    checked={customeRoles[selectRole]['user']['view']}
                    onChange={()=>handleChange('view','user')}
                />} label="view" />

                <FormControlLabel control={<Checkbox
                    checked={customeRoles[selectRole]['user']['delete']}
                    onChange={()=>handleChange('delete','user')}
                />} label="delete" />

                <FormControlLabel control={<Checkbox
                    checked={customeRoles[selectRole]['user']['add']}
                    onChange={()=>handleChange('add','user')}
                />} label="add" />

                <FormControlLabel control={<Checkbox
                    checked={customeRoles[selectRole]['user']['update']}
                    onChange={()=>handleChange('update','user')}
                />} label="update" />

                {/*<FormControlLabel control={<Checkbox checked={checked} />} label="delete" />*/}
                {/*<FormControlLabel control={<Checkbox checked={checked} />} label="add" />*/}
                {/*<FormControlLabel control={<Checkbox checked={checked} />} label="update" />*/}
            </FormGroup>


            <h1>testament</h1>
            <FormGroup>
                <FormControlLabel control={<Checkbox
                    checked={customeRoles[selectRole]['testament']['view']}
                    onChange={()=>handleChange('view','testament')}
                />} label="view" />

                <FormControlLabel control={<Checkbox
                    checked={customeRoles[selectRole]['testament']['delete']}
                    onChange={()=>handleChange('delete','testament')}
                />} label="delete" />

            </FormGroup>



            <h1>report</h1>
            <FormGroup>
                <FormControlLabel control={<Checkbox
                    checked={customeRoles[selectRole]['report']['view']}
                    onChange={()=>handleChange('view','report')}
                />} label="view" />

                <FormControlLabel control={<Checkbox
                    checked={customeRoles[selectRole]['report']['delete']}
                    onChange={()=>handleChange('delete','report')}
                />} label="delete" />

            </FormGroup>



            <h1>contact</h1>
            <FormGroup>
                <FormControlLabel control={<Checkbox
                    checked={customeRoles[selectRole]['contact']['view']}
                    onChange={()=>handleChange('view','contact')}
                />} label="view" />

                <FormControlLabel control={<Checkbox
                    checked={customeRoles[selectRole]['contact']['delete']}
                    onChange={()=>handleChange('delete','contact')}
                />} label="delete" />

            </FormGroup>
        </div>
    );
}

export default CustomManager;