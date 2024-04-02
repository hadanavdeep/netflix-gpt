import React, { useState,useRef } from "react";
import { checkValidData } from "../utils/validate";
import Header from "./Header";
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword ,updateProfile  } from "firebase/auth"; 
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage,setErrorMessage]=useState(null);

  const dispatch=useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);


  const handleButtonClick = () => {
    const message = checkValidData(name?.current?.value,email.current.value,password.current.value,isSignInForm);
    setErrorMessage(message);

    if(message)return;

    if(!isSignInForm){
      //sign up logic
      createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, photoURL: USER_AVATAR
    }).then(() => {
      const { uid, email, displayName, photoURL } = auth.currentUser;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
    }).catch((error) => {
      setErrorMessage(error.message);
    });
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+errorMessage);
  });
    }
    else{
      //sign in logic
      signInWithEmailAndPassword(auth,email.current.value,password.current.value)
  .then((userCredential) => {

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+errorMessage);
  });
    }

  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/c38a2d52-138e-48a3-ab68-36787ece46b3/eeb03fc9-99c6-438e-824d-32917ce55783/IN-en-20240101-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background"
        />
      </div>
      <form onSubmit={(e) => e.preventDefault()}
      className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-4 px-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 m-4 w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="p-4 m-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 m-4 w-full bg-gray-700"
        />
        <p className="text-red-600 font-bold p-4 text-lg">{errMessage}</p>
        <button
          className="p-4 m-4 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="px-4 py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
