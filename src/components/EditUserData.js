import React,{useState} from 'react'

export const EditUserData = ({user,saveUser,cancelSave}) => {
   const [newUser,setNewUser]= useState({
    id : user.id,
    name :user.name,
    email : user.email,
    role : user.role,
    select : user.select
   })

   const update=(e)=>{
    e.preventDefault();

    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const data = {...newUser};
    data[fieldName] = fieldValue;

    setNewUser(data);
   }

   return (
     <tr>
        <td></td>
        <td><input type="text" name="name" value={newUser.name} onChange={update}></input></td>
        <td><input type="email" name="email" value={newUser.email} onChange={update}></input></td>
        <td><input type="text" name="role" value={newUser.role} onChange={update}></input></td>
        <td>
            <button className="btn-primary rounded-3" onClick={()=>saveUser(newUser)}>save</button>
            <button className="btn-danger rounded-3 mx-2" onClick={()=>cancelSave(user.id)}><i className="fas fa-times" /></button>
        </td>
     </tr>
   )
}