import React, { useEffect, useRef, useState }  from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'
import "../../css/AddMovie.css"
import axios from "axios";
import { getAuth } from "../../helper/Storage";
import { useParams } from "react-router-dom";
const UpdateMovie=()=>{
    const auth = getAuth();
    let {id}=useParams();
    const [movie , setmovie]=useState({
        name:"",
        description:"",
        image_url:null,
        loading:false,
        err:null,
        reload:false
    })
    const image = useRef(null);
   
        const updatemovie =(e)=>{
            e.preventDefualt();
            setmovie({...movie,loading:true})

            const formData =new FormData();
            formData.append("name",movie.name);
            formData.append("description",movie.description)
            if(image.current.files && image.current.files[0])
                {
                    formData.append("image",image.current.files[0]);
                }
                formData.append("image",movie.name);
            
                axios.put("http://localhost:4000/movies/"+id,formData , 
                    {
                        headers:{
                            token:auth.token,
                            "Content-Type":"multipart/form-data"
                        }
                    })
                    .then((resp)=>{

                    })
                    .catch((err)=>{
                        
                     setmovie({
                          ...movie,
                          loading:false,
                          err:"Smoething wrong please try again",
                        successmsg:null
                    })})
                
             
              }
        
              useEffect (()=>{
             axios
             .get("http://localhost:4000/movies/"+id)
             .then((resp)=>{
            setmovie({...movie,
             name:resp.data.name,
            description:resp.data.description,
            image_url:resp.data.image_url})
             })
             .catch((err)=>{ setmovie({
                ...movie,
                loading:false,
                err:"Smoething wrong please try again",
              successmsg:null
          })})
              },[movie.reload])
        
        return(
        <div className="add-center" >
            <h1 className="tit">Update Movie Form</h1>
            <img src={movie.image_url}/> 
        <Form className="AddMovie" onSubmit={updatemovie}>
        {movie.err &&(
            <Alert  variant="danger" className="p-2">
    {movie.err}
</Alert>
        )}
     

    <Form.Group className="mb-3">
    <Form.Control type="text" placeholder="Enter Name Of Movie" value={movie.name} onChange={(e)=>setmovie({...movie,name:e.target.value})} />
    </Form.Group>
    
    <Form.Group className="mb-3" >
    <textarea className="form-control" placeholder = "Enter Description Of Movie"value={movie.description} onChange={(e)=>setmovie({...movie,description:e.target.value})} rows={5}></textarea>
    </Form.Group>
    
    <Form.Group className="mb-3">
    <Form.Control type="file" className="form-control" ref={image}/>
    </Form.Group>
    
    <Button className="btn btn-dark w-100 mb-5" variant="primary" type="submit">
 Update Movie
    </Button>
    </Form>
    </div>
    );
};

export default UpdateMovie ;