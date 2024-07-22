import React, { useEffect, useState }  from "react";
import MoviesCard from "../../components/MoviesCard";
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
const Home=()=>{
  const[movies,setMovies]= useState({
    loading:true,
    result:[],
    err:null,
    reload : 0
  });
  
  const [search,setsearch]=useState("");
 
  useEffect (()=>{
    setMovies({...movies,loading:true})
 axios.get("http://localhost:4000/movies",
  {params :{
    search:search,
  }

  }
 )
 .then(resp=>{
  console.log(resp);
setMovies({...movies,result:resp.data,loading:false,err:null})
 })
 .catch(err=>{
  setMovies({...movies,loading:false, err:"something went wrong,please try again later"})

 })
  },[movies.reload])
  const searchMovies = (e)=>{
    e.preventDefault(); 
    setMovies({...movies,reload:movies.reload +1})
  }
return(
    <div className="home-container p-5">
    
        {
          movies.loading ===true &&(
            <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
          )
        }
        {
          movies.loading===false && movies.err==null &&(
            <>
            <Form onSubmit={searchMovies}>
        
            <Form.Group className="mb-3 d-flex"   >
              {/*SEARCH*/}
              <Form.Control type="text" 
               placeholder="Search Movies"
               value={search}
               onChange={(e)=>setsearch(e.target.value)} 
               className="rounded-0" />
              <button className="btn btn-dark">Search</button>
            </Form.Group>
            </Form>
              {/*LIST MOVIES*/}
              
              <div className="row">
                 {
                 movies.result.map((movie)=>(
                    <div className="col-3 card-movie-container " key={movie.id} >
                    <MoviesCard name={movie.name}
                     description={movie.description}
                      image={movie.image_url}
                      id={movie.id}
                      />
                     
                    </div>
                  ))
                }
             
              </div>
         </>    
          )
        }
        {
          movies.loading===false && movies.err!=null && (
            <Alert  variant="danger" className="p-2">
           {movies.err}
        </Alert>
          )
        }
        {
          movies.loading===false && movies.err==null && movies.result.length===0 && (
            <Alert  variant="info" className="p-2">
           No Movies , please try it Later
        </Alert>
          )
        }
        
        </div>
        
       
);
};
export default Home;