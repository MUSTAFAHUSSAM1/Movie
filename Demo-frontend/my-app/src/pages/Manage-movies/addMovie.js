import React,{useState,useEffect, useRef}  from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import "../../css/AddMovie.css"
import axios from "axios";
import { getAuth } from "../../helper/Storage";
const AddMovie=()=>{
    const auth =getAuth();
  const[movies,setMovies]= useState({
    loading:true,
    name:"",
    description:"",
    err:"",
    successmsg:""
    
  });
  const image = useRef(null);
  const creatMovie =(e)=>{
    e.preventDefault();
    setMovies({...movies,loading:true})
    const formData =  new FormData ();
    formData.append("name",movies.name);
    formData.append("description",movies.description);
    if(image.current.files && image.current.files[0])
        {
            formData.append("image",image.current.files[0]);
        }
    formData.append("image",movies.name);
    axios
 .post("http://localhost:4000/movies",formData,
    {headers:
        {token:auth.token,
            "Content-Type":"multipart/form-data"
        }})
 .then((resp)=>{
setMovies({
    loading:false,
    name:"",
    description:"",
    err:null,
    successmsg:"Movie Created successfully"
    
})
image.current.files=null;
 })
 .catch((err)=>{
    image.current.files=null;
    setMovies({
        ...movies,
        loading:false,
        err:"Smoething wrong please try again",
        successmsg:null
        
    })

 })
  }

return(
    <div className="add-center" >
        <h1 className="tit">Add  Movie Form</h1>
        {movies.err &&(
            <Alert  variant="danger" className="p-2">
    {movies.err}
</Alert>
        )}
        {
            movies.successmsg &&(<Alert  variant="success" className="p-2">
                {movies.successmsg}
            </Alert>)

        } 
    <Form className="AddMovie" onSubmit={creatMovie}>
<Form.Group className="mb-3">
<Form.Control type="text" placeholder="Enter Name Of Movie" required value={movies.name} onChange={(e)=>setMovies({...movies,name:e.target.value})} />
</Form.Group>

<Form.Group className="mb-3" >
<textarea className="form-control" placeholder = "Enter Description Of Movie" value={movies.description} onChange={(e)=>setMovies({...movies,description:e.target.value})}  rows={5} required ></textarea>
</Form.Group>

<Form.Group className="mb-3">
<Form.Control type="file" className="form-control" ref={image}/>
</Form.Group>

<Button className="btn btn-dark w-100 mb-5" variant="primary" type="submit">
Add New Movie
</Button>
</Form>
</div>
);
};
export default AddMovie;