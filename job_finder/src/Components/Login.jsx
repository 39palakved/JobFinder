import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import app from '../firebase/firbase.config'; // Ensure this path matches your Firebase configuration import

function Login() {
  const auth = getAuth(); // Initialize auth with your Firebase app instance
  const googleProvider = new GoogleAuthProvider();

  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
       
        const user = result.user;
       
        // Redirect to dashboard or do something with the user data
      })
      .catch((error) => {
     
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
       
      });
  };

  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <button className='bg-blue-400 px-8 py-2 text-white' onClick={handleLogin}>Login with Google</button>
    </div>
  );
}

export default Login;
