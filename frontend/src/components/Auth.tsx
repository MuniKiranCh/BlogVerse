import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config';
import { SignupInput } from "@syedahmedullahjaser/zod-inference-medium-blog"


export const Auth = ({type}: {type: "signup" | "signin"}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupInput>(
        type === "signup"
      ? { name: '', email: '', password: '' }
      : { email: '', password: '' }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send data to the backend

    try{
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type=== "signup" ? "signup" : "signin"}`, formData);
        const data = response.data;
        // console.log(data);

        localStorage.setItem('token', data.jwt);
        navigate('/blogs');

        console.log(formData);
    }
    catch(err){
      // console.log(err);

      alert('Error while signing up');
    }
    
  };

  return (
    <div className='h-screen flex justify-center flex-col'>
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div>
            <h1 className="text-4xl text-center font-extrabold pb-4">Welcome to BlogVerse!</h1>
          </div>
          <div className="text-3xl font-extrabold pb-2">
            {type === "signup" ? "Create an account" : "Login to your account"}
          </div>
          <div className="text-base font-normal">
            {type === "signup" ? "Already have an account?" : "Don't have an account?"}
            <Link to={type === "signup" ? "/signin" : "/signup"} className="text-blue-500"> {type === "signup" ? "Sign In" : "Sign Up"}</Link>
          </div>
          <div className="mt-4">
            <form onSubmit={handleFormSubmit}>
              { 
                type==="signup" ? 
                <div className="mb-4">
                <label className="block text-sm font-medium text-slate-400">name</label>
                <input 
                  type="text" 
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                  placeholder='Enter your name'
                  value={formData.name}
                  onChange={handleInputChange}
                />
                </div> : null 
              }
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-400">Email</label>
                <input 
                  type="email" 
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-400">Password</label>
                <input 
                  type="password" 
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" 
                  placeholder='Enter your password'
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-4">
                <button 
                  type="submit"
                  className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  {type === "signin" ? "Login" : "Sign Up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
