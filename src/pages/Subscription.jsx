import React, { useEffect, useState } from 'react'
import { getMyProfile, planBuy } from '../services/api';
import toast from 'react-hot-toast';

const Wallet = () => {
  const [plan,setPlan] = useState('free');
  useEffect(()=>{
    fetchProfile()
  },[])
  const fetchProfile =async () =>{
    const res = await getMyProfile()
    setPlan(res.data.plan)
  }
  const purchase = async (plan) => {
    try {
      const res = await planBuy(plan)
      console.log(res)
      res.response.data.error ? toast.error(res.response.data.error) : toast.success(res.response.data.message)
    } catch (error) {
      console.log(error)
    toast.error(error.data.message);
    }
  }
  return (
    <div className='p-2 max-w-2xl mx-auto'>
      <div className='text-3xl font-stretch-105% font-semibold text-emerald-700 text-center'>Mappi's Subscription</div>
      <div className='mt-4'>
        <div className='border-2 border-emerald-400 rounded-xl font-stretch-105% p-4'>
          <div className='text-3xl text-center font-medium mb-2 bg-emerald-200'>🌟 Free Plan Features (₹0 / month)</div>
          <div className='flex justify-center '>
            <ul className=' text-xl '>
              <li className='p-2 flex items-center'> <svg class="w-3.5 h-3.5 me-2 text-emerald-700 dark:text-green-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Up to 5 links on your profile</li>
              <li className='p-2 flex items-center'> <svg class="w-3.5 h-3.5 me-2 text-emerald-700 dark:text-green-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Custom bio & profile picture</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2 text-emerald-700 dark:text-green-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Basic click analytics total clicks per link</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2 text-emerald-700 dark:text-green-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>One-click sharing for all your socials</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2 text-emerald-700 dark:text-green-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Mobile-friendly, responsive profile page</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2 text-emerald-700 dark:text-green-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Custom username subject to availability</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2 text-emerald-700 dark:text-green-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Basic referral link to invite others</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2 text-emerald-700 dark:text-green-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Secure account login (Email + Password with OTP)</li>
            </ul>
          </div>
        </div>
         <div className='border-2 mt-4 border-amber-400 rounded-xl font-stretch-105% p-4'>
          <div className='text-3xl text-center font-medium mb-2 bg-amber-200'>🚀 Pro Plan Features (₹100 / month)</div>
          <div className='flex justify-center '>
            <ul className=' text-xl '>
              <li className='p-2 flex items-center'> <svg class="w-3.5 h-3.5 me-2  text-amber-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Up to 25 links on your profile</li>
              <li className='p-2 flex items-center'> <svg class="w-3.5 h-3.5 me-2 text-amber-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Unlimited monthly clicks – no limits</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2 text-amber-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Custom bio & profile picture</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2  text-amber-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Referral link – earn 10% from referred sign-ups</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2  text-amber-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Forms – create up to 10 forms with file uploads</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2  dark:text-amber-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Priority support</li>
         <button onClick={()=>purchase('pro')} className='bg-blue-600 text-white w-full p-2 rounded'>Buy Plan</button>
            </ul>
          </div>
        </div>
        <div className='border-2 mt-4 border-red-400 rounded-xl font-stretch-105% p-4'>
          <div className='text-3xl text-center font-medium mb-2 bg-red-200'>💎 Premium Plan Features (₹250 / month)</div>
          <div className='flex justify-center '>
            <ul className=' text-xl '>
              <li className='p-2 flex items-center'> <svg class="w-3.5 h-3.5 me-2  text-red-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Unlimited links on your profile</li>
              <li className='p-2 flex items-center'> <svg class="w-3.5 h-3.5 me-2 text-red-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Unlimited monthly clicks – no limits</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2 text-red-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Custom bio & profile picture</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2  text-red-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Custom Designs ( limited )</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2  text-red-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Forms – create up to 50 forms with file uploads</li>
              <li className='p-2 flex items-center'><svg class="w-3.5 h-3.5 me-2  text-red-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>Priority support</li>
         <button onClick={()=>purchase('premium')} className='bg-red-600 text-white w-full p-2 rounded'>Buy Plan</button>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet