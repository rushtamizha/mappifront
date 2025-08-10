// src/pages/ForgotPassword.jsx
import { useState } from 'react';
import { forgotPassword,resetPassword } from '../services/api.js';
import RushMedia from '../assets/icons/RushMedia.png';
import BackHeader from './BackHeader.jsx';
import {toast} from 'react-hot-toast';
export default function ForgotPassword() {
  const [form,setForm] = useState({gmail:'',newPassword:'',otp:''})
  const [loading , setloading] = useState(false)
  const [resetloading , setResetloading] = useState(false)
  const[show,setShow] = useState(false)
  const HandleChange = (e) =>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const SendOtp = async() =>{
     const isValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.gmail);
     if(!isValid){
      return toast.error ('Please enter valid gmail')
     }
    try {
      setloading(true)
      await forgotPassword(form.gmail)
      toast.success('Otp sent to gmail successfully')
    } catch (error) {
      toast.error(error.response.data.error)
    }
    finally{
      setloading(false)
    }
  }
  const VerifyOtp = async()=>{
    console.log(form)
    if(!form.gmail || !form.otp || !form.newPassword){
      toast.error('plaese fill all fields')
    }
    try {
      await resetPassword(form)
      toast.success('Password reset successfully')
    } catch (error) {
      console.log(error)
      toast.error('Invalid gmail or Expired otp')
    }
  }
  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <BackHeader/>
       <img className='w-full ' src={RushMedia} alt="" />
       <div className='pt-6 font-medium text-2xl text-gray-700 font-display text-start font-stretch-105%'> Create new password</div>
       <div className='text-sm text-gray-500 text-start mb-6 font-stretch-105%' >Make password stronger for more security</div>
     <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
        </div>
        <input type="gmail"  name="gmail" id="simple-search"  onChange={HandleChange} className="bg-white border-2 border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full ps-12 p-3.5 mb-4 font-stretch-105%" placeholder="Gmail address" required />
    </div>
       <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
        </div>
        <input type= 'text' name="otp" id="simple-search"  onChange={HandleChange} className="bg-white border-2 border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full ps-12 p-4 mb-3.5 font-stretch-105%  " placeholder="OTP" required />
        <div className="absolute inset-y-0 end-0 flex justify-center cursor-pointer items-center pr-3" >
           <button className='bg-emerald-700 px-6 py-2 rounded flex items-center justify-center text-white disabled:opacity-50 font-medium font-stretch-105% hover:bg-emerald-800 'disabled={loading || !form.gmail } onClick={SendOtp}>{loading && (
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
      {loading ? 'Sending...' : 'Send'}</button>
        </div>
    </div>
    <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
        </div>
        <input type={show ? 'text' : 'password'}  name="newPassword" id="simple-search"  onChange={HandleChange} className="bg-white border-2 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full ps-12 p-3.5 mb-4 font-stretch-105% " placeholder="New password" required />
        <div class="absolute inset-y-0 end-0 flex justify-start cursor-pointer items-center pr-3 " onClick={() => setShow((prev) => !prev)} >
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
        </div>
    </div>
      <button onClick={VerifyOtp} className="bg-emerald-700 rounded-md py-4 text-white w-full p-2 disabled:opacity-50 flex item-center justify-center font-stretch-105% text-lg" disabled={resetloading || !form.otp } >{resetloading && (
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
      {resetloading ? 'Processing..' : 'Reset Password'}</button>
    </div>
  );
}
