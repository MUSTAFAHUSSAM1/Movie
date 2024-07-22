export const setAuth = (data)=>{
 
localStorage.setItem("user",JSON.stringify(data));
}
export const getAuth = (data)=>{
    if(localStorage.getItem("user"))
     return JSON.parse( localStorage.getItem("user"));
}
export  const removeAuth =()=>{
    if(localStorage.getItem("user"))
      localStorage.removeItem("user");
}