import React from 'react'
import { FaRocket } from "react-icons/fa6"
import {FaEnvelopeOpenText} from "react-icons/fa6"
function Newsletter() {
  return (
    <div>
<div>
    <h3 className='text-lg font-bold mb-2 flex items-center gap-2'><FaEnvelopeOpenText/>Email me for jobs</h3>
    <p className='text-primary/75 text-base mb-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
    <div className="w-full space-y-4">
        <input type="email" name="email" id='email' placeholder='name@gamil.com' className='w-full block py-2 pl-3 border focus:outline-none'>
        </input>
        <input type="submit"  value={"Subscribe"}  className='w-full block py-2 pl-3 border focus:outline-none bg-blue-300 rounded-sm text-white cursor-pointer font-semibold'>
        </input>
    </div>
    
</div>
<div>
    <h3 className='text-lg font-bold mb-2 flex items-center gap-2'><FaRocket/>Get Noticed Faster</h3>
    <p className='text-primary/75 text-base mb-4'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </p>
    <div className="w-full space-y-4">
       
        <input type="submit"  value={"Upload your resume"}  className='w-full block py-2 pl-3 border focus:outline-none bg-blue-300 rounded-sm text-white cursor-pointer font-semibold'>
        </input>
    </div>
    
</div>
    </div>
  )
}

export default Newsletter
