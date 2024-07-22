import React  from "react";
import { Outlet,Navigate } from "react-router-dom";
import { getAuth } from "../helper/Storage";
const Guest=()=>{

    const auth =getAuth();
    return<>{!auth ? <Outlet/> : <Navigate to={"/"}/>}</>

};
export default Guest;