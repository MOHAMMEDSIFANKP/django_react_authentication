import React,{useState,useEffect} from 'react';
import Menubar from '../Navbar/Navbar';
import {getLocal} from '../../healpers/auth'
import {useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../api/api';
import jwt_decode from 'jwt-decode'

// Css and boostrap
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Admin() {
    const token = getLocal()
    const history = useNavigate()
    const[users,setUsers] = useState ([])

    async function getUserlist(){
        const request = await axios.get(`${baseUrl}user-list/`);
        setUsers(request.data)
    }
    useEffect(()=>{
        const decoded = jwt_decode(token)
        if (!decoded){
            history('/')
        }else if (!decoded.is_admin){
            history('/')
        }
        getUserlist()
    },[history, token]);
// Add User
const AddUserRegister = async(e)=>{
    e.preventDefault()

    const data = [e.target.username.value,
                  e.target.email.value,
                  e.target.password.value,
                  e.target.password1.value
                ]
    for (let i=0;i<=data.length;i++){
        if (data[i]===''){
        alert("feild cannot be blank")
        return
    }}
    if (data[2]!==data[3]){
        alert("Password doesn't match")
        return
    }
    const response = await fetch(`${baseUrl}user-register/`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'username': data[0],
          'email':data[1],
          'password':data[2],
        })
    });
    if (response.status === 400){
        alert(response.status)
        history('/admin')
        }else{
            getUserlist();
            history('/admin');
        }
    }
// Edit User
    const EditFrom = async (index, e) => {
        const result = users.find((user, i) => i === index);
        e.preventDefault();
        const data = [
          e.target.username.value,
          e.target.email.value,
          e.target.password.value,
        ];
        if (data[0] ===''){
            data[0]=result.username
        }
        if (data[1] ===''){
            data[1]=result.email
        }
        if (data[2] ===''){
            alert("Please entr Old Password or New password")
            return
        }
        const id = result.id
        const response = await fetch(`${baseUrl}user-detail/${id}/`,{
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'username': data[0],
              'email':data[1],
              'password':data[2],
            })
          });
          if (response.status === 400){
            alert(response.status)
            history('/admin')
            }else{
            getUserlist();
            history('/admin')
            }
      };
// Delete User
      const deleteUser = async (index, e) =>{
        const response = await fetch(`${baseUrl}user-detail/${index}/`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            })
          });
          if (response.status === 400){
            alert(response.status)
            history('/admin')
            }else{
            getUserlist()

            history('/admin')
            }
      }
// Search User
    const searchUser =  async (keyword) =>{
        if (!keyword == ''){
        const request = await axios.get(`${baseUrl}user-list/?search=${keyword}`)
        setUsers(request.data)
    }else{
        getUserlist()
    }
    } 

    return (
        <div>
            <Menubar heading={'Admin page'}/>  
            <div class="d-flex justify-content-end container-fluid">
            <button type="button" class="btn btn-warning me-3 my-3" data-toggle="modal" data-target="#exampleModal">Add User</button>
            <input type="text" class="form-control w-25 my-2 ms-auto" onChange={(e)=>searchUser(e.target.value)} placeholder="Search here" />
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <Form onSubmit={(e)=>AddUserRegister(e)} >
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <div style={{ display: 'block', width: 470,padding: 20 }}>
                
                <Form.Group className="py-2">
                <Form.Control type="text" name="username" placeholder="Username" />
                </Form.Group>
                <Form.Group className="py-2">
                <Form.Control type="email" name="email" placeholder="Email" />
                </Form.Group>
                <Form.Group className="py-2">
                <Form.Control type="password" name="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="py-2">
                <Form.Control type="password" name="password1" placeholder="Confirm Password" />
                </Form.Group>
                <Form.Group></Form.Group>
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <Button variant="primary" className="my-4" type="submit">Add User</Button>
                </div>
                </Form>
                </div>
            </div>
            </div>
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
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#exampleModal${index}`}><i class="fas fa-edit"></i></button>
                        <div className="modal fade" id={`exampleModal${index}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <Form onSubmit={(e) => EditFrom(index, e)}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                           
                            <Form.Group className="py-2">
                            <Form.Control  type="text"  name="username" placeholder="Username" defaultValue={user.username} />
                            </Form.Group>
                            <Form.Group className="py-2">
                            <Form.Control type="email" name="email" placeholder="Email" defaultValue={user.email}/>
                            </Form.Group>
                            <Form.Group className="py-2">
                            <Form.Control type="password" name="password" placeholder="Password"/>
                            </Form.Group>
                           
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                            </Form>
                            </div>
                        </div>
                        </div>
                        <button onClick={(e)=>deleteUser(user.id, e)} className='btn btn-danger ms-1'>Delete</button>
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
