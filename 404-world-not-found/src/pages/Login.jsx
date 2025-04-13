// src/pages/Auth.jsx
import React, { useState } from 'react';
import NavbarPublic from '../components/NavbarPublic';
import backgroundImage from '../images/peakpx.jpg';
import { loginUser, registerUser } from "../api/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target["confirm-password"]?.value;
  
    if (isRegister && password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    try {
      if (isRegister) {
        const res = await registerUser(username, password);
        alert(res.message);
      } else {
        const res = await loginUser(username, password);
        //Redirect after success
        navigate("/progress"); // or any route you want
      }
    } catch (err) {
      alert(err.message);
    }    
  };  

  return (
    <div
      className="min-h-screen min-w-screen flex flex-col backdrop-blur-xs brightness-120 text-green-500 overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <NavbarPublic />
      <div className="flex-1 flex flex-col items-center justify-center min-w-full relative bottom-5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-[4rem] font-semibold italic font-theme vhs-shift">
            {isRegister ? 'Register' : 'Login'}
          </h2>
        </div>
        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-md font-medium leading-6 ">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  placeholder="Username"
                  required
                  className="block w-full rounded-md border-0 bg-white px-3 py-1.5 text-gray-900 shadow-sm 
                             ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 
                             focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-md font-medium leading-6">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  className="block w-full rounded-md border-0 bg-white px-3 py-1.5 text-gray-900 shadow-sm 
                             ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 
                             focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label htmlFor="confirm-password" className="block text-md font-medium leading-6">
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    placeholder="Confirm Password"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 bg-white px-3 py-1.5 text-gray-900 shadow-sm 
                               ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 
                               focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                {isRegister ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-white">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="font-semibold text-green-500 hover:text-green-900 cursor-pointer"
            >
              {isRegister ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
