import React from "react";
import { Link } from "react-router-dom";
// Css and Boostrap
import './register.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function Register(){

  return(
   <div className="maindiv">
        <div style={{ display: 'block', 
        width: 500, 
        padding: 30 }}>
      <h4>Login</h4>
      <Form >
      <Form.Group className="py-2">
        <span className="text-grey">Profile pic</span>
      <Form.Control type="file" className="mt-2" placeholder="" />
      </Form.Group>
      <Form.Group className="py-2">
      <Form.Control type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group className="py-2">
      <Form.Control type="email" placeholder="Email" />
      </Form.Group>
      <Form.Group className="py-2">
      <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="py-2">
      <Form.Control type="password" placeholder="Confirm Password" />
      </Form.Group>
      <Form.Group></Form.Group>
      <Button variant="primary" className="my-4" type="submit">
      submit
      </Button>
      </Form>
      <p className="text-center text-muted mt-4 mb-0">already have an account <Link to="/login" className="fw-bold text-body"><u>login here</u></Link></p>
      </div>
   </div>
  )
}
export default Register