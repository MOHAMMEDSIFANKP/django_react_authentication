import React,{useState,useEffect} from 'react';
import Menubar from '../Navbar/Navbar';
import {getLocal} from '../../healpers/auth'
import {useNavigate } from 'react-router-dom';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import { baseUrl } from '../../api/api';

function Admin() {
    const token = getLocal()
    const history = useNavigate()
    const[users,setUsers] = useState ([])

    async function getUserlist(){
        const request = await axios.get(`${baseUrl}user-list/`);
        setUsers(request.data)
    }
    useEffect(()=>{
        if (!token){
            history('/')
        }
        getUserlist()
    },[history, token]);
    const edituser = (index)=>{
        alert(index)
        history(`/edituser/${index}`);
    }
    return (
        <div>
            <Menubar heading={'Admin page'}/>
            <button className='btn btn-warning ms-3 my-3' onClick={()=>history('/adduser')}>Add User</button>
            <div class="card cards recent-sales overflow-auto mx-3">
                <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Is active</th>
                    <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                {users.map((user,index)=>{
                    return(
                        <tr>
                        <td>
                            <div className='d-flex align-items-center'>
                            <img
                                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                                alt='' style={{ width: '45px', height: '45px' }} className='rounded-circle' />
                            <div className='ms-3'>
                                <p className='fw-bold mb-1'>{user.username}</p>
                            </div>
                            </div>
                        </td>
                        <td>
                        <p className='text-muted mb-0'>{user.email}</p>
                        </td>
                        <td>
                            {user.is_active?<MDBBadge color='primary' pill>NO Active
                            </MDBBadge>:<MDBBadge color='success' pill>Active</MDBBadge>}  
                        </td>
                        <td>
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-edit"></i></button>
                        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                            </div>
                        </div>
                        </div>
                        <button className='btn btn-danger ms-1'>Delete</button>
                        </td>
                        </tr>
                    )
                })}
                </MDBTableBody>
                </MDBTable>
                </div>
             </div>
    );
}

export default Admin;
