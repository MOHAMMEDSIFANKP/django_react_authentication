import React from 'react'
import Menubar from '../Navbar/Navbar'
import { useNavigate } from "react-router-dom";
import { baseUrl } from '../../api/api';

// Boostrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './admin.css'

function Edituser(index){
    alert(index)
    const history = useNavigate();
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

        if (data[2].length<6){
            alert("Password atleast have 6 characters")
            return
        }
        // const response = await axios.pu(`${baseUrl}user-register/`,{
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify({
        //       'username': data[0],
        //       'email':data[1],
        //       'password':data[2],
        //     })
        //   });
        // if (response.status === 400){
        // alert(response.status)
        // history('/adduser')
        // }else{
        // history('/admin')
        // }
          
    }
    
    return(
    <div>
        <Menubar heading={'Edit User'}/>
    <div className="maindiv">
      <div style={{ display: 'block', width: 500,padding: 20 }}>
      <Form onSubmit={(e)=>AddUserRegister(e)} >
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
      <Button variant="primary" className="my-4" type="submit">
      submit
      </Button>
     <button className='btn btn-warning mx-2' onClick={()=>history('/admin')}>Close</button>
      </Form>
      </div>
   </div>
   </div>
    )
}
export default Edituser