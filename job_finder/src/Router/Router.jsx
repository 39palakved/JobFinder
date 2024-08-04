import * as React from "react";
import * as ReactDOM from "react-dom/client";
import UpdateJob from "../Pages/UpdateJob";
import Login from "../Components/Login";
import JobDetails from "../Pages/MyJobs";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children :[
        {
            path: "/",
            element: <Home/>


        },
        {
          path: "/post-job",
          element: <CreateJob/>
          },
          {
            path: "/my-job",
            element: <MyJobs/>
            },
          {
            path:"edit-job/:id",
            element:<UpdateJob/>,
            loader:({params})=>fetch(`http://localhost:3000/all-jobs/${params.id}`)
          },
          {
            path: "/job/:id",
            element:<JobDetails/>
        },
        
          {
            path: "/login",
            element:<Login/>
            },
           
    ]

  },
]);
export default router;