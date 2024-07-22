import React, { useEffect, useState }  from "react";
import "../../css/MovieDetails.css"
import ReviewMovie from "../../components/ReviewMovie";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { getAuth } from "../../helper/Storage";
const MovieDetails=()=>{
    let {id}=useParams();
    const auth =getAuth();
    
    const[movie,setMovie]= useState({
        loading:true,
        result:[],
        err:null,
        reload:0
        
      });
      const[review,setreview]= useState({
        loading:false,
        review:"",
        err:null,
        
      });
      useEffect (()=>{
        setMovie({...movie,loading:true})
     axios.get("http://localhost:4000/movies/" + id)
     .then(resp=>{
      console.log(resp);
    setMovie({...movie,result:resp.data,loading:false,err:null})
     })
     .catch(err=>{
      setMovie({...movie,loading:false, err:"something went wrong,please try again later"})
    
     })
      },[movie.reload]);
      const sendreview=(e)=>{
        e.preventDefault();
        
        setreview({...review, loading : true})
        axios.post("http://localhost:4000/movies/Review",{
            movie_id:id,
            review:review.review
        },
    {
        headers:{
            token:auth.token
        }
    })
        .then((resp)=>{
            setreview({...review,err:null,review:"",loading:false})
            setMovie({...movie,reload:movie.reload +1})

        })
        .catch((error)=>{
            setreview({...review,loading:false})
        })

      }
    
return(
    
    <div className="MovieDetails-container p-5" >
        {movie.loading===true &&(
        <>
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      </>
    )}
    {
        
        movie.loading===false && movie.err==null &&(
            <>
        {/*Details of movie*/}
        <div className="row" >
            <div className="col-3">
            <img className="Movie-image " 
            src={movie.result.image_url}  
            alt={movie.result.name}  />
            </div>
            <div className="col-9">
     <h3>{movie.result.name}</h3>
     <p>{movie.result.description}</p>
            </div>


        </div>
      
        <div className="row" >
        <h3 className="movie-nav">ReviewMovie</h3>
        <h6>
            {
                movie.result.reviews.map((review)=>(
                    <ReviewMovie review={review.review}/> 
                ))
            }
            {
                movie.result.reviews.length ==0 &&(
                    <Alert  variant="info" className="p-2">
           there is no review currently for this film
        </Alert>
                )}
        {auth &&(
            <Form onSubmit={sendreview}>
            <Form.Group className="mb-3" >
            <textarea className="form-control" 
            placeholder = "Please inter review" 
            rows={5}
            value={review.review}
            onChange={(e)=>setreview({...review,review:e.target.value })}>
            </textarea>
            
            
            </Form.Group>
            <Form.Group className="mb-3" >
            <button className="btn btn-dark">Send Review</button>
            </Form.Group>
            </Form>
        )


        }
        
    </h6>
    </div>
</>            
        )
    }
    {
        movie.loading===false && movie.err!=null &&(
            <Alert  variant="danger" className="p-2">
           {movie.err}
        </Alert>
        )
    }
{
      !auth && (
           <Alert  variant="warning" className="p-2">
           pleas login first to be able to send review
        </Alert>
        )
    }
    </div>
    
);
};
export default MovieDetails;