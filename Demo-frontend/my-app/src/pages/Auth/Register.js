import React, { useState }  from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../css/Register.css'
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../helper/Storage";
const Register=()=>{
  const Navegate =useNavigate();
const [register,setregister]=useState(
  {
    name:"",
    email:"",
    password:"",
    loading:true,
    error:[]
  }
)
const onRegest = (e)=>{
  e.preventDefault();
  setregister({...register,loading:true})
  axios.post("http://localhost:4000/auth/register",
    {email:register.email,name:register.name,password:register.password}
  )
  .then((resp)=>{
  setregister({...register,loading:false,error:[]})
  setAuth(resp.data);
  Navegate('/');
  })
  .catch((errors)=>{
  setregister({...register,loading:false,error:errors.response.data.errors})
  })}
  return(
  
    <div>
        <div className="Register-Conter">
        <Form onSubmit={onRegest}>
          {
            register.error.map((error,index)=>(
              <Alert key={index}  variant="danger" className="p-2">
              {error.msg}
          </Alert>

            ))
          }
        
            <h1>Registeration form</h1>
        <Form.Group className="mb-3" >
        <Form.Control type="text"
         placeholder="Full Name"
         required
        //  value={register.name}
         onChange={(e)=>{setregister({...register,name:e.target.value})}}
          />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Control type="email"
         placeholder="Email" 
         required
         value={register.email}
         onChange={(e)=>{setregister({...register,email:e.target.value})}}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Control type="password" 
        placeholder="Password" 
        required
        value={register.password}
         onChange={(e)=>{setregister({...register,password:e.target.value})}}/>
      </Form.Group>
    
      <Button className="btn btn-dark w-100 " variant="primary" type="submit" >
        Create Account
      </Button>
    </Form>
    </div>

    </div>
);
};
export default Register;