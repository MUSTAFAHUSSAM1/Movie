import React  from "react";
import { Outlet,Navigate } from "react-router-dom";
import { getAuth } from "../helper/Storage";
const Admin=()=>{

    const auth =getAuth();
    return<>{auth && auth.role===1 ? <Outlet/> : <Navigate to={"/"}/>}</>

};
export default Admin;