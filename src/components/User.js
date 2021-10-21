import React, { useState, useEffect, Fragment } from 'react'
import { EditUserData } from './EditUserData';
import { Pagination } from './Pagination';
import { SearchUsers } from './SearchUsers';
import { ViewUserData } from './ViewUserData';

export const User = ()=> {

    const [users, setUsers] = useState([]);
    const [pageno,setPageno] = useState(1);
    const [loading,setLoading] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [filter, setFilter] = useState("");
    const usersPerPage = 10;

    //API Call
    useEffect(()=>{
      const getUsers = async () => {
        let response;
        try{
          setLoading(true);
          response = await ( 
              await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
            ).json(); 
          setUsers(
              response.map(user => ({...user,select:false}) )
            ); 
        }catch(err){
            setLoading(true);
            alert(err);
        }
        setLoading(false);
      }
      getUsers();  
    },[]);

   // Searching(Filtering) the Users 
    let fiteredUsers = users.filter(user => {
          return ( user.name.toLowerCase().includes(filter) ||
              user.email.toLowerCase().includes(filter) ||
              user.role.toLowerCase().includes(filter)
          );
        });
        
    // Display Editable User
    const editData = (id)=>{
        editUserId ? setEditUserId(null) : setEditUserId(id) ;
    }
     // Delete single User Details
     const deleteSingleUser = (id)=>{
      const updateUser= users.filter(user => user.id !== id );
      setUsers(updateUser);
    }
    // Save updated User
    const saveUser=(newUser)=>{
      setUsers( 
        users.map(data=>{
          if(data.id === newUser.id) return newUser;
          return data; })
      );
      setEditUserId(null);
    }
    // Selecting Checkboxes
    const toggleCheckbox = (id)=>{
      setUsers(
        users.map(user=>{
          if(user.id === id)
            user.select= !user.select;
          return user
        })
      )
    }
    // Deleting selected Checkbox
    const deleteMulti= ()=>{
      setUsers(users.filter(user => !user.select))
    }

    // get current Users per page
    let indexOfLastUser = pageno * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    let currentUser = fiteredUsers.slice(indexOfFirstUser, indexOfLastUser); 
 
    // cal total no of pages
    const totalPages = Math.ceil(fiteredUsers.length/usersPerPage);

    if(loading){
      return <h3><i className="fas fa-spinner">Loading data...</i></h3>
    }
    return (
        <div className="container-fluid">
          <div className="heading">
              <h1 className="text-primary mb-3">Geektrust Admin UI</h1>
          </div> 

        <SearchUsers setFilter={setFilter} setPageno={setPageno}/>

            {/* Creating Table */}
                <table className="table">
                    <thead className="thead">
                        <tr>
                            <td><input type="checkbox" 
                                  style={{width:15,height:15}}
                                  onChange={(e)=>{
                                   setUsers(
                                    users.map( user => {
                                      user.select = e.target.checked;
                                      return user;}) 
                                   );
                                  }}
                              /></td>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { currentUser.map(user=>
                              <Fragment key={user.id}>
                                {editUserId === user.id ? (
                                    <EditUserData user={user} saveUser={saveUser} cancelSave={editData}/>
                                ):(
                                    <ViewUserData user={user} editData={editData} toggleCheckbox={toggleCheckbox} deleteSingleUser={deleteSingleUser}/>
                                )}
                              </Fragment>
                            )}
                    </tbody>
                </table>
            {/* Table End */}

            {/* Pagination and Delete btn */}
            <Pagination 
                totalPages={totalPages}
                pageno={pageno}
                setPageno={setPageno}
                deleteMulti={deleteMulti}
            />
        </div>
    )
}

export default User;
