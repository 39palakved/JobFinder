import React, { useState } from 'react'
import { NavLink,Link } from 'react-router-dom';
import {FaXmark} from "react-icons/fa6"
import { FaBarsStaggered } from "react-icons/fa6";


function Navbar() {
    const[isMenuOpen,setIsMenuOpen] =useState(false);
  const handleMenuToggler=()=>{
    setIsMenuOpen(!isMenuOpen)
  }
  const item=[
    {
        path:"/" ,title:"Start a search",
    },
    {
        path:"/my-job" ,title:"My Jobs",
    },
    {
        path:"/salary" ,title:"Salary Estimate",
    },
    {
        path:"/post-job" ,title:"Post A Job",
    },
    

]
  return (
   <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
    <nav className='flex justify-between items-center py-6 '>
        {/* <img src='./images/Linear.png'></img> */}
        <a href='/' className='flex items-center gap-2 text-3xl'>
        <img className='h-[40px] w-[40px] ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkS5XYfpox77rUmmG4Nzuj4VXPF9oWb_fzAmNNXdUUUBrA-5KotZ0Uok_r1bWVhC48WLk&usqp=CAU'></img><span>Job Portal</span></a>
        

<ul className='hidden md:flex gap-12'>{
    item.map(({path,title})=>(
<li key={path} className='text-base text-primary '><NavLink
  to={path}
  className={({ isActive}) =>
    [
      
      isActive ? "active" : "",
     
    ].join(" ")
  }
>
  {title}
</NavLink></li>
    ))
    }</ul>
    <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
        <Link to="/login" className='py-2 px-7 border rounded text-white bg-blue-400'>Log in</Link>
        <Link to="/Sign-up" className='py-2 px-5 border rounded text-black '>Sign up</Link>
    </div>

{/* mobile-menu */}
<div className='md:hidden block'>
<button onClick={handleMenuToggler}>
    {isMenuOpen?<FaXmark className="w-5 h-5 text-primary"></FaXmark>  :<FaBarsStaggered className='w-5 h-5 text-primary' />
 }  
    </button > 
</div>

    </nav>
 {/*navitem for mobile */}
 <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen?"":"hidden"} `}>
    <ul>
    {
    item.map(({path,title})=>(
<li key={path} className='text-base text-white first:text-white py-1'><NavLink
  to={path}
  className={({ isActive}) =>
    [
      
      isActive ? "active" : "",
     
    ].join(" ")
  }
>
  {title}
</NavLink></li>
    ))
    }
    <li className='text-white py-1'> <Link to="/login" className=' rounded text-white'>Log in</Link></li>
    <li className='py-1'><Link to="/Sign-up" className=' rounded text-white '>Sign up</Link></li>
    
    </ul>
 </div>

   </header>
  )
}

export default Navbar
