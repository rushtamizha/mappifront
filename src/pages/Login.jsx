// Login.jsx
import { useState } from 'react';
import {  googleAuthLogin,login } from '../services/api.js';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import BackHeader from './BackHeader.jsx';
import {toast} from 'react-hot-toast';
import RushMedia from '../assets/icons/RushMedia.png';
const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ gmail: '', password: '' });
   const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const isValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.gmail);
     if(!isValid){
      return toast.error ('please enter valid gmail')
     }
   try {
    setLoading(true)
     const res = await login(form);
    localStorage.setItem('token', res.data.token);
    toast.success('Login Success')
    navigate('/dashboard')
   } catch (error) {
    toast.error(error.response.data.message)
   }
   finally{
    setLoading(false)
   }
  };

const handleGoogleLogin = async (credentialResponse) => {
  try {
    const token = credentialResponse.credential;
    const res = await googleAuthLogin(token);
    toast.success('Login Success')
    localStorage.setItem("token", res.data.token);
    navigate('/dashboard')
  } catch (err) {
    toast.error("Login failed:", err.response?.data || err.message);
  }
};

<GoogleLogin onSuccess={handleGoogleLogin} onError={() => toast.error("Google login failed")} />

  return (
    <div className="p-2 max-w-md mx-auto">
      <BackHeader/>
       <img className='w-full' src={RushMedia} alt="" />
      <h2 className="text-2xl font-medium font-stretch-105% py-2 text-gray-700">Welcome back!</h2>

      <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
        </div>
        <input type="gmail"  name="gmail" id="simple-search"  onChange={(e) => setForm({ ...form, gmail: e.target.value })}  class="bg-white border-2 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full ps-12 p-3.5 mb-4 font-stretch-105%" placeholder="Gmail address" required />
    </div>

    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
        </div>
        <input type={show ? 'text' : 'password'}  name="password" id="simple-search"  onChange={(e) => setForm({ ...form, password: e.target.value })} class="bg-white border-2 border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full ps-12 p-3.5 mb-4 font-stretch-105% " placeholder="Password" required />
        <div class="absolute inset-y-0 end-0 flex justify-start cursor-pointer items-center pr-3 " onClick={() => setShow((prev) => !prev)} >
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
        </div>
    </div>
    <div className='text-emerald-700 small-text text-end mb-2 font-display font-stretch-105% font-medium' onClick={()=>navigate('/forgot-password')}>Forgot password?</div>
      <button
      onClick={handleLogin}
      className="medium-text w-full flex items-center justify-center px-4 py-4 bg-emerald-700 text-white font-display rounded hover:bg-emerald-800 disabled:opacity-50 font-stretch-105%"
      disabled={loading }
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      )}
      {loading ? 'Processing...' : 'Login'}
    </button>

    <div className='text-gray-700  text-center mt-2 font-display font-stretch-105% font-medium'>Don't have a account? <span  onClick={()=>navigate('/register')} className='text-emerald-700 font-stretch-105% font-semibold small-text '>Register</span></div>

      <hr className="border-gray-300 my-4" />
      <GoogleLogin onSuccess={handleGoogleLogin} onError={() => alert('Google Auth Failed')} />
    </div>
  );
};

export default Login;
