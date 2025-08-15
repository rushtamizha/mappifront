// src/pages/Register.jsx
import { useState,useRef, useEffect } from 'react';
import {useSearchParams, useNavigate} from "react-router-dom";
import {
  checkUsername,
  sendOtp,
  verifyOtp,
  registerOAuthUser,
  register,
} from '../services/api.js';
import {toast} from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct
import BackHeader from './BackHeader.jsx';
import RushMedia from '../assets/icons/RushMedia.png';
import rushOtp from '../assets/icons/otp.png';



const Register = () => {
  const [form, setForm] = useState({
    username: '',
    gmail: '',
    otp:'',
    password: '',
    referredBy: '',
  });
 const navigate = useNavigate()
 const [loading, setLoading] = useState(false);
 const [gamilloading, setGmailLoading] = useState(false);
 const [show, setShow] = useState(false);
  const [step, setStep] = useState('manual'); // 'manual', 'otp', 'google-form'
  const [usernameValid, setUsernameValid] = useState();
  const [googleUser, setGoogleUser] = useState(null);
  const [searchParams] = useSearchParams();
  const [referredBy, setReferredBy] = useState('');

const getPasswordStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  const strength = ['Weak', 'Fair', 'Good', 'Strong'];
  const color = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
  return { level: strength[score - 1] || 'Too Weak', color: color[score - 1] || 'bg-gray-300', score };
};

  const { level, color, score } = getPasswordStrength(form.password);



  // ✅ Username check
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (form.username.trim().length > 4) {
        checkUsername(form.username).then((res) => {
          setUsernameValid(res.data.available);
          toast.success('Username available')
        });
      }
      else {
        setUsernameValid(null);
        toast.error('Username not available')
      }
    }, 500);
    return () => clearTimeout(delayDebounce);

  }, [form.username]);

  useEffect(() => {
  const ref = searchParams.get('ref');
  if (ref) {
    setReferredBy(ref);
  }
}, [searchParams]);
 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Manual Register
  const handleManualRegister = async () => {
  if (!form.username || !form.gmail || !form.password) {
    return toast.error(" Please fill all required fields");
  }

  const isValid = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.gmail);
  if (!isValid) {
    return toast.error(" Please enter a valid Gmail address");
  }

  try {
    setLoading(true);

    // Optional delay for UX (you can remove if unnecessary)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Send OTP
    await sendOtp(form.gmail);

    // On success
    toast.success(" OTP sent successfully to Gmail");

    setStep('otp');
  } catch (error) {
    console.error(error);
    toast.error(error.response.data.message);

  } finally {
    setLoading(false);
  }
};

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    if (form.otp.length !== 6) return toast.error('Enter valid 6-digit OTP');
   try {
    setGmailLoading(true)
  await verifyOtp(form.gmail, form.otp);
  await register(form);
  toast.success('Registered successfully');
  navigate('/login');
} catch (error) {
  console.error(error);
  toast.error(error.response.data.message);
}
finally{
  setGmailLoading(false)
}
  };

  // ✅ Google OAuth success
  const handleGoogleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      setGoogleUser(decoded); // {email, name, picture, sub, ...}
      setForm((prev) => ({ ...prev, gmail: decoded.email }));
      setStep('google-form');
    } catch (err) {
      console.error(err);
      toast.error('Google authentication failed.');
    }
  };

  // ✅ Google Register Submit
  const handleGoogleRegister = async () => {
    if (!form.username) return toast.error('Please enter a username');
    try {
      setLoading(true)
      await registerOAuthUser({
      username: form.username,
      gmail: googleUser.email,
      referredBy: form.referredBy,
      googleId: googleUser.sub,
    });
    toast.success('Registered via Google!');
    navigate ( '/login')
    } catch (error) {
      toast.error(error.response.data.message)
    }finally{
      setLoading(false)
    }
  };

  const inputs = useRef([]);

  const handleChangeOtp = (e, i) => {
    const val = e.target.value.replace(/\D/, '');
    if (!val) return;
    inputs.current[i].value = val;
    if (i < 5) inputs.current[i + 1].focus();

    const newOtp = inputs.current.map(input => input.value).join('');
    setForm({...form,otp:newOtp})
  };

  const handleKeyDown = (e, i) => {
    if (e.key === 'Backspace' && !e.target.value && i > 0) {
      inputs.current[i - 1].focus();
    }
  };


  return (
    <div className="p-4 max-w-lg mx-auto font-display font-stretch-normal
">
      {step === 'manual' && (
        <>
        <img className='w-full' src={RushMedia} alt="" />
          <h2 className="text-2xl font-medium font-stretch-105% mt-4 text-gray-700">Create an account</h2>
          <div className='font-medium font-stretch-105% mb-4 text-gray-500'>All your links. One powerful hub.
Turn traffic into income with ease.</div>
          <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={!usernameValid?'#ff0000':'#00a34f'}><path d="M480-480q-51 0-85.5-34.5T360-600q0-50 34.5-85t85.5-35q50 0 85 35t35 85q0 51-35 85.5T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560ZM240-240v-76q0-21 10.5-39.5T279-385q46-27 96.5-41T480-440q54 0 104.5 14t96.5 41q18 11 28.5 29.5T720-316v76H240Zm240-120q-41 0-80 10t-74 30h308q-35-20-74-30t-80-10Zm0-240Zm0 280h154-308 154ZM160-80q-33 0-56.5-23.5T80-160v-160h80v160h160v80H160ZM80-640v-160q0-33 23.5-56.5T160-880h160v80H160v160H80ZM640-80v-80h160v-160h80v160q0 33-23.5 56.5T800-80H640Zm160-560v-160H640v-80h160q33 0 56.5 23.5T880-800v160h-80Z"/></svg>
        </div>
        <input type="username"  name="username" id={`username-${usernameValid? 'success':'error'}`}  onChange={handleChange} class={`font-stretch-105% transition-all ease-out duration-700 ${usernameValid?'bg-white border-2 text-emerald-700 border-emerald-700  text-sm rounded-lg focus:ring-offset-emerald-700 focus:border-emerald-600 block w-full ps-12 p-3.5 mb-4 font-stretch-105%':'"bg-white border-2 border-red-600 text-red-600 text-sm rounded-lg focus:ring-offset-red-600 focus:border-red-600 block w-full ps-12 p-3.5 mb-4 font-stretch-105%'}`} placeholder="Username" required />
        {usernameValid?(<div class="absolute inset-y-0 end-0 flex justify-start items-center pr-3 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00a34f"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        </div>) : (<div class="absolute inset-y-0 end-0 flex items-center pr-3 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff0000"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        </div>)}
    </div>
        <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
        </div>
        <input type="gmail"  name="gmail" id="simple-search"  onChange={handleChange} class="bg-white border-2 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full ps-12 p-3.5 mb-4 font-stretch-105%" placeholder="Gmail address" required />
    </div>
          <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
        </div>
        <input type={show ? 'text' : 'password'}  name="password" id="simple-search"  onChange={handleChange} class="bg-white border-2 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full ps-12 p-3.5 mb-4 font-stretch-105% " placeholder="Password" required />
        <div class="absolute inset-y-0 end-0 flex justify-start cursor-pointer items-center pr-3 " onClick={() => setShow((prev) => !prev)} >
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/></svg>
        </div>
    </div>
    {form.password && (
        <div className="mb-4">
          <div className="w-full h-2 rounded bg-gray-200 overflow-hidden ">
            <div className={`h-2 ${color} transition-all ease-out duration-700`} style={{ width: `${score * 25}%` }}></div>
          </div>
          <p className={`text-sm mt-1 text-gray-500`}>Password: {level}</p>
        </div>
      )}
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-80v-440H80v-240h208q-5-9-6.5-19t-1.5-21q0-50 35-85t85-35q23 0 43 8.5t37 23.5q17-16 37-24t43-8q50 0 85 35t35 85q0 11-2 20.5t-6 19.5h208v240h-80v440H160Zm400-760q-17 0-28.5 11.5T520-800q0 17 11.5 28.5T560-760q17 0 28.5-11.5T600-800q0-17-11.5-28.5T560-840Zm-200 40q0 17 11.5 28.5T400-760q17 0 28.5-11.5T440-800q0-17-11.5-28.5T400-840q-17 0-28.5 11.5T360-800ZM160-680v80h280v-80H160Zm280 520v-360H240v360h200Zm80 0h200v-360H520v360Zm280-440v-80H520v80h280Z"/></svg>
        </div>
        <input type="referredBy" value={referredBy ? referredBy : form.referredBy}  name="referredBy" id="simple-search"  onChange={handleChange} class="bg-white border-2 border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full ps-12 p-3.5 mb-4 font-stretch-105%" placeholder="Invite Code"  />
    </div>
          <button
      onClick={handleManualRegister}
      className="font-stretch-105% text-lg w-full flex items-center justify-center px-4 py-4 mb-4 bg-emerald-700 text-white font-display  rounded hover:bg-emerald-800 disabled:opacity-50  "
      disabled={!usernameValid || loading }
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
      {loading ? 'Processing...' : 'Send otp'}
    </button>

    <div className='text-gray-700  text-center mb-2 font-display font-stretch-105% font-medium'>Already have a account? <span  onClick={()=>navigate('/login')} className='text-emerald-700 font-stretch-105% font-semibold text-xl '>Login</span></div>

          <hr className="my-6   border-gray-200 " />
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google Auth failed')}
          />
          <div className='flex justify-between p-4'>
            <span className='hover:text-emerald-700 small-text transition-all ease-in hover:medium-text' onClick={()=>navigate('/TermsAndConditions')}>Terms&conditions</span>
            <span className='hover:text-emerald-700 small-text transition-all ease-in hover:medium-text' onClick={()=>navigate('/PrivacyPolicy')}>Privacy policy</span>
            <span className='hover:text-emerald-700 small-text transition-all ease-in hover:medium-text' onClick={()=>navigate('/RefundPolicy')}>Refund policy</span>
          </div>
        </>
      )}

      {step === 'otp' && (
        <>
        <BackHeader/>
        <img className='w-full mb-6' src={rushOtp} alt="" />
        <div className="flex flex-col items-center justify-center ">
      <div className=" mb-4 w-full text-start text-2xl font-medium font-stretch-105% text-gray-700">Enter your verification code</div>
      <div className="flex gap-2 mb-4 w-full">
        {[...Array(6)].map((_, i) => (
          <input 
            key={i}
            maxLength={1}
            ref={(el) => (inputs.current[i] = el)}
            onChange={(e) => handleChangeOtp(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="w-full h-16 text-center  border-2 border-gray-300 rounded text-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        ))}
      </div>
      <div className='text-lg text-gray-500 mb-2  font-normal font-stretch-105%'>We sent verification code to your email <span className='text-emerald-700 font-medium'>{form.gmail}</span>. You can check your inbox.</div>
    </div>
          <button className="font-stretch-105% btn flex items-center justify-center w-full  bg-emerald-700 text-lg text-white px-4 py-4 rounded disabled:opacity-50" disabled={gamilloading} onClick={handleVerifyOtp}>{gamilloading && (
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
      {gamilloading ? 'Processing...' : 'Verify'}</button>

          <div className='text-gray-700  text-center mb-2 font-display font-stretch-105% font-normal mt-5'>I didn’t receieve the code? <span className='text-emerald-700 cursor-pointer font-medium text-xl' disabled = {loading} onClick={handleManualRegister}>
      {loading ? 'Processing...' : 'Send again'}</span></div>
        </>
      )}

      {step === 'google-form' && (
        <>
        <BackHeader/>
         <img className='w-full mb-6' src={rushOtp} alt="" />
          <h2 className="text-xl my-4 text-gray-700 font-medium font-stretch-105%">Complete Registration</h2>
          <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={!usernameValid?'#ff0000':'#00a34f'}><path d="M480-480q-51 0-85.5-34.5T360-600q0-50 34.5-85t85.5-35q50 0 85 35t35 85q0 51-35 85.5T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560ZM240-240v-76q0-21 10.5-39.5T279-385q46-27 96.5-41T480-440q54 0 104.5 14t96.5 41q18 11 28.5 29.5T720-316v76H240Zm240-120q-41 0-80 10t-74 30h308q-35-20-74-30t-80-10Zm0-240Zm0 280h154-308 154ZM160-80q-33 0-56.5-23.5T80-160v-160h80v160h160v80H160ZM80-640v-160q0-33 23.5-56.5T160-880h160v80H160v160H80ZM640-80v-80h160v-160h80v160q0 33-23.5 56.5T800-80H640Zm160-560v-160H640v-80h160q33 0 56.5 23.5T880-800v160h-80Z"/></svg>
        </div>
        <input type="username"  name="username" id={`username-${usernameValid? 'success':'error'}`}  onChange={handleChange} class={` ${usernameValid?'bg-white border-2 border-emerald-700 text-emerald-700 text-sm rounded-lg focus:ring-offset-emerald-700 focus:border-emerald-600 block w-full ps-12 p-3.5 mb-4 font-stretch-105%':'"bg-white border-2 border-red-600 text-red-600 text-sm rounded-lg focus:ring-offset-red-600 focus:border-red-600 block w-full ps-12 p-3.5 mb-4 font-stretch-105%'}`} placeholder="Username" required />
        {usernameValid?(<div class="absolute inset-y-0 end-0 flex justify-start items-center pr-3 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#00a34f"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        </div>) : (<div class="absolute inset-y-0 end-0 flex items-center pr-3 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ff0000"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        </div>)}
    </div>
          <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M160-80v-440H80v-240h208q-5-9-6.5-19t-1.5-21q0-50 35-85t85-35q23 0 43 8.5t37 23.5q17-16 37-24t43-8q50 0 85 35t35 85q0 11-2 20.5t-6 19.5h208v240h-80v440H160Zm400-760q-17 0-28.5 11.5T520-800q0 17 11.5 28.5T560-760q17 0 28.5-11.5T600-800q0-17-11.5-28.5T560-840Zm-200 40q0 17 11.5 28.5T400-760q17 0 28.5-11.5T440-800q0-17-11.5-28.5T400-840q-17 0-28.5 11.5T360-800ZM160-680v80h280v-80H160Zm280 520v-360H240v360h200Zm80 0h200v-360H520v360Zm280-440v-80H520v80h280Z"/></svg>
        </div>
        <input type="referredBy"  name="referredBy" id="simple-search"  onChange={handleChange} class="bg-white border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full ps-12 p-3.5 mb-4 font-stretch-105%" placeholder="Invite Code"  />
    </div>
          <button className="flex items-center justify-center btn text-lg bg-emerald-700 w-full font-display  text-white px-4 py-4 rounded disabled:opacity-50 font-stretch-105%" disabled= {loading || !usernameValid} onClick={handleGoogleRegister}>
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
      )} {loading?'Registering...':'Register'}
          </button>
        </>
      )}
    </div>
  );
};

export default Register;
