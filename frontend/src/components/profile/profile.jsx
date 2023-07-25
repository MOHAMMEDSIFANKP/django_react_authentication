import React, { useEffect, useState } from "react";
import { baseUrl } from '../../api/api';
import { useNavigate } from "react-router-dom";
import { getLocal } from '../../healpers/auth'
import jwtDecode from "jwt-decode";
import Menubar from "../Navbar/Navbar";
import axios from "axios";

// Boostrap
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';

function Profile (){
    const history = useNavigate()
    const [user, setUser] = useState ([])
    const token = getLocal();
    const decoded = jwtDecode(token)
    const [profile_img, setImage] = useState()

    async function getUser(){
    const user = await axios.get(`${baseUrl}user-detail/${decoded.user_id}/`)
      setUser(user.data)
    }
    
    const UserUpdate = async (e) => {
      e.preventDefault();
    
      const username = e.target.username.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      if (password===''){
        alert('Type old Password or New Password')
        return
      }
      const url = `${baseUrl}user-detail/${decoded.user_id}/`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password:password,
        }),
      });
      if (response.status === 400){
        alert(response.status)
        history('/profile')
        }else{
        history('/profile')
        }
    };

    useEffect(() => {
      if (!token) {
          history('/')
      }
      getUser()
      },[])
      
    return(
        <div className="vh-100" style={{ backgroundColor: 'white' }}>
           <Menubar heading={'Profile'}/>
        <MDBContainer>
          <MDBRow className="justify-content-center">
            <MDBCol md="9" lg="7" xl="5" className="mt-5">
              <MDBCard style={{ borderRadius: '15px' }}>
                <MDBCardBody className="p-4">
                  <div className="d-flex text-black">
                    <div className="flex-shrink-0">
                      <MDBCardImage
                        style={{ width: '180px', borderRadius: '10px' }}
                        src={user.profile_image?user.profile_image:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'}
                        alt='Generic placeholder image'
                        fluid />
                    </div>
                    <div className="flex-grow-1 ms-5 mt-5">
                    <MDBCardTitle>{user.username}</MDBCardTitle>
                    <MDBCardText>{user.email}</MDBCardText>
                    <MDBCardText>Senior Journalist</MDBCardText>
                    </div>
                  </div>
                  <button type="button" className="btn btn-warning m-2 ms-5" data-toggle="modal" data-target='#exampleModal'><i class="fas fa-edit"></i></button>
                        <div className="modal fade" id='exampleModal' tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <Form onSubmit={UserUpdate}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <div style={{height:'100px'}} className="mb-3 d-flex justify-content-left">
                                    <div style={{width:'100px'}} className='h-100'>
                                        {
                                        profile_img?
                                            <img className='w-100' src={URL.createObjectURL(profile_img)} ></img>
                                        :
                                            <img className='w-100' src={user.profile_img ? user.profile_img : ""} ></img>
                                        }
                                    </div>
                                </div>
                            <div className="mb-3">
                              <label htmlFor="profile-img" className="col-form-label">Profile image</label>
                              <input type="file" className="form-control" id="profile-img" 
                                  onChange={(e)=>{ 
                                  if(e.target.value[0] != null)
                                  setImage(e.target.files[0])}} 
                              />
                          </div>
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
                  
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    )
}
export default Profile