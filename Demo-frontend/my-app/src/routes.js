import { createBrowserRouter,Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import App from "./App";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Managemovies from "./pages/Manage-movies/Managemovies";
import AddMovie from "./pages/Manage-movies/addMovie";
import UpdateMovie from "./pages/Manage-movies/updateMovie";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";



export const routes =createBrowserRouter([
    {
        path:"",
        element:<App/>, 
        children:[
            {
                path:"/",
                element:<Home/>, 
            },
            {
                path:":id",
                element:<MovieDetails/>, 
            },
            //Guest middleware
            {
                element:<Guest/>,
                children:[
                    {
                        path:"/Login",
                        element:<Login/>, 
                    },
                    {
                        path:"/register",
                        element:<Register/>, 
                    },
                    

                ],
            },
            {
                path:"/Manage-movies",
                element:<Admin/>,
                children:
                [
                    {
                        path : '',
                        element:<Managemovies/>
                    },
                    {
                        path : "add",
                        element:<AddMovie/>,
                    },
                    {
                        path : ":id",
                        element:<UpdateMovie/>,
                    },
        
        
                ]
        
            },
           

        ],
        
          },
    {
        path:'*',
        element:<Navigate to={"/"}/>
    }
   
])  