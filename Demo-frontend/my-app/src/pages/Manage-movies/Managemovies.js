import React,{useState,useEffect}  from "react";
import Table from 'react-bootstrap/Table';
import "../../css/Managemovies.css";
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'
import axios from "axios";
import { useParams } from "react-router-dom";
import { getAuth } from "../../helper/Storage";
const Managemovies=()=>{
  let {id}=useParams();
  const auth =getAuth();
  const[movies,setMovies]= useState({
    loading:true,
    result:[],
    err:null,
    reload : 0
  });
  useEffect (()=>{
    setMovies({...movies,loading:true})
 axios
 .get("http://localhost:4000/movies")
 .then((resp)=>{
setMovies({...movies,result:resp.data,loading:false,err:null})
 })
 .catch((err)=>{
  setMovies({...movies,loading:false, err:"something went wrong,please try again later"})

 })
  },[movies.reload])
  const deleteMovie=(id)=>{
    
    axios.delete("http://localhost:4000/movies/" + id,{
      headers : {
         token:auth.token
       }
    }
 )
 .then((resp)=>{
setMovies({...movies,reload:movies.reload+1})
 })
 .catch((err)=>{
  setMovies({...movies,loading:false, err:"something went wrong,please try again later"})

 }) 
  }
return(
    <div className="Manage-Movie p-5" >
        <div className="header  justfiy-content-between mb-5">
       <h3 className="tit">Managemovies</h3>
       <Link to={"add"} className="green-button btn btn-sm btn-success" >Add New Movie +</Link>
       </div>
       {/* <Alert  variant="danger" className="p-2">
    this is Simple alert
</Alert>
<Alert  variant="success" className="p-2">
    this is Simple alert
</Alert> */}
       <Table  striped bordered hover >
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>  
      <tbody>
        {
          movies.result.map(movies=>(
           
              <tr key={movies.id}>
              <td>{movies.id}</td>
              <td>
                 <img src={movies.image_url} alt={movies.name} className="avaterImage"  />
              </td>
              <td>{movies.name}</td>
              <td> {movies.description}</td>
              <td>
              <Link to={"/"+movies.id } className="btn btn-sm btn-primary ">Show</Link>
              <Link to={""+ movies.id} className="btn btn-sm btn-primary mx-2">Update</Link>
              <button className="btn btn-sm btn-danger" onClick={(e)=>{deleteMovie(movies.id)}}>Delete</button>
              
              </td>
              
            
          </tr>
          ))
        }
       
       
      
      </tbody>
    </Table>

        </div>
);
};
export default Managemovies;