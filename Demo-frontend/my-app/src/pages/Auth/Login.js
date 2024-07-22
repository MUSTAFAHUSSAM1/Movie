import React, { useState,useEffect }  from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import'../../css/Login.css'
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import { setAuth } from "../../helper/Storage";
import { useNavigate } from "react-router-dom";
const Login=()=>{
  const Navegate = useNavigate();
  const [login,setlogin] = useState({
 email :"",
 password: "",
 loading : false,
 err:[]
  });
  
  
  const LoginFun=(e)=>{
    e.preventDefault();
    setlogin({...login,loading:true,err:[]});
 axios.post("http://localhost:4000/auth/login",
  {email:login.email,password:login.password})

 .then((resp)=>{
  setlogin({
    ...login, 
    loading:false,
  err:[]});
  setAuth(resp.data);
 Navegate('/');
 })
 .catch((errors)=>{
  console.log(errors);
  setlogin({...login,loading:false,err:errors.response.data.errors})
 
 });
  };
return(
    <div className="Login-Conter">
      <h1>Login form</h1>
            
        <Form onSubmit={LoginFun}>
        {
              login.err.map((error, index)=>(
                <Alert key={index}  variant="danger" className="p-2">
               {error.msg}
            </Alert>
              ))
              
            }
      <Form.Group className="mb-3">
        <Form.Control type="email"
         placeholder="Please Enter your email"
         required
         value={login.email}
         onChange={(e)=>setlogin({...login,email:e.target.value})}
         />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Control type="password"
         placeholder="Please Enter your Password"
         required
         value={login.password} 
         onChange={(e)=>setlogin({...login,password:e.target.value})}/>
      </Form.Group>
    
      <Button className="btn btn-dark w-100" variant="primary" type="submit" disabled={login.loading===true}>
        Login
      </Button>
    </Form>
    </div>
);
};
export default Login;