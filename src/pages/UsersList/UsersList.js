import React, { useContext, useState} from "react";
import './UsersList.css';
import { Link, Redirect } from "react-router-dom";
import { usersContext } from "../../App";
import MaterialTable from 'material-table';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';



const UsersList = () => {
    const {users} = useContext(usersContext);
    const [redirect, setRedirect] = useState(false);
    const [id, setId] = useState(null)
    const useremail = localStorage.getItem('userEmail');

    
    const columns = [
        {title: 'ID', field: 'id'},
        {title: 'UserName', field: 'username'},
        {title: 'Name', field: 'name'},
        {title: 'Email', field: 'email'},
        {title: 'Web Link', field: 'website'},
        {title: 'Phone', field: 'phone'},
    ]

    if(!users) {
        return <CircularProgress disableShrink />;
    }

    if(useremail === '' || useremail === null) {
        return <Redirect to='/login'></Redirect>
    } else {
      
    

    return ( 
        <div className='usersList'>
            <div className="btn-container">
                <Link className='btn-create' to="/users/create">
                <Button variant='contained' color='primary'>Create</Button>
                </Link>
            </div>
            <MaterialTable data={users} columns={columns} title='User Data'
            onRowClick={(event, rowData) => {
                setId(rowData.id)
                setRedirect(true) 
              }}
            />
            {redirect && <Redirect push to={`users/${id}`}/>}
        </div>
        );
    }
}
 
export default UsersList;