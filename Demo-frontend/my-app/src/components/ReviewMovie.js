import React  from "react";
import"../css/ReviewMovie.css"
const ReviewMovie=(props)=>{
return(
    <div className="rev-container" >
      {props.review}
      <br/>
    </div>
);
};
export default ReviewMovie;