import React  from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import {Link } from "react-router-dom";
import { getAuth, removeAuth } from "../helper/Storage";
const Header=()=>{
  const Navegate =useNavigate();
  const Auth =getAuth();
  console.log(Auth);
    const Logout = ()=>{
      removeAuth();
      Navegate("/");
    };
return(
    <div>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand >
          <Link className="nav-link"  to={"/"}>Movies App</Link></Navbar.Brand>
          <Nav className="me-auto">
            <Link className="nav-link" to={"/"}>List Movies</Link>
            
            {
              !Auth &&(
                <><Link className="nav-link" to={"/login"}>Login</Link>
            <Link className="nav-link" to={"/register"}>register</Link></>
              )
            }
             
            {
              //  
              Auth   && Auth.role===1 &&(
                <Link className="nav-link" to={"/Manage-movies"}>
                Manage Movies
                 </Link>
              )
            }

                      </Nav>
          <Nav className="ms-auto">
            
            {
              Auth &&(
                <NavLink onClick={Logout}>Logout</NavLink>
                )
            }
         
          </Nav>
        </Container>
      </Navbar>
    </div>
);
};
export default Header;