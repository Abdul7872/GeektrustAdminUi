import React from 'react'

export const ViewUserData = ({user,editData,deleteSingleUser,toggleCheckbox}) => {

    return (
        <tr>
            <td>
                <input type="checkbox" 
                      checked={user.select} 
                      style={{width:15,height:15}}
                      onChange={()=>toggleCheckbox(user.id)}>
                </input>
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <button className="btn py-1" onClick={()=>editData(user.id)}><i className="fas fa-edit"></i></button>
                <button className="btn py-1 text-danger" onClick={()=>deleteSingleUser(user.id)}><i className="fas fa-trash-alt"></i></button>
            </td>
        </tr>
    )
}
