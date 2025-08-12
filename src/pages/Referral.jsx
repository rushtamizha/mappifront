import React, { useEffect, useState } from 'react'
import { getreferrals, getUserWallet,getMyProfile } from '../services/api'
import moneyPng from "../assets/icons/money.png" 
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast'
const Referral = () => {
  const [users,setUsers] = useState([])
  const [wallet,setWallet] = useState(0)
  const [username,setUsername] = useState('')
  
  useEffect(()=>{
    getReferUser()
  },[])

const getReferUser = async () => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const res = await getreferrals(decoded.userId || decoded.id);
  const prof = await getMyProfile(decoded.userId || decoded.id);
  const wallet = await getUserWallet(decoded.userId || decoded.id );

  setUsers(res.data || []); // assuming API returns { referredUsers: [...] }
  setWallet(wallet.data.wallet)
  setUsername(prof.data.referralCode || '');
};

const handleCopyLink = () => {
  const referralLink = `${window.location.origin}/register?ref=${username}`;
  navigator.clipboard.writeText(referralLink);
  toast.success('Referral link copied')
};

  return (
    <div className='max-w-2xl font-display font-stretch-105% mx-auto bg-radial-[at_50%_195%] rounded-2xl from-emerald-500 h-60 text-gray-700 to-emerald-800'>
      <div className='p-4 text-3xl font-bold text-white' >Mappi.in</div>
      <hr className='bg-gray-100 border-none h-0.25 mx-6' />
      <div className='px-6 pt-2 text-2xl text-white font-semibold capitalize'>Hey! {username}</div>
      <div className='px-6  text-white'>You've been choosen for the exclusive referral programme</div>
      <div className='bg-white mx-6 mt-4 p-4 flex gap-3 rounded-xl drop-shadow-xs'>
        <img src={moneyPng}alt="" className='rounded-full w-14'/>
        <div className='flex flex-col justify-center'>
          <span className='medium-text text-gray-500'>Total Earnings</span>
          <span className='text-2xl font-bold '>₹ {wallet}.00</span>
        </div>
      </div>
      <div className='mx-6 mt-2 bg-white rounded-xl p-4 drop-shadow-xs'>
        <div className='text-2xs'>Earn Passive Income</div>
        <div className='flex border-2 border-dotted border-amber-300 rounded-xl p-3 w-full items-center mt-4'>
          <div className='text-xl text-gray-400'>Code:</div>
          <input type="text" value={username} readOnly className=' h-full w-full p-2 text-xl uppercase font-semibold outline-none'/>
          <div className=' text-xl'  onClick={handleCopyLink}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#047857"><path d="M120-220v-80h80v80h-80Zm0-140v-80h80v80h-80Zm0-140v-80h80v80h-80ZM260-80v-80h80v80h-80Zm100-160q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480Zm40 240v-80h80v80h-80Zm-200 0q-33 0-56.5-23.5T120-160h80v80Zm340 0v-80h80q0 33-23.5 56.5T540-80ZM120-640q0-33 23.5-56.5T200-720v80h-80Zm420 80Z"/></svg></div>
        </div>
        <div className='text-center mt-4 '>
          <button onClick={handleCopyLink} className='bg-emerald-700 text-white  py-4 w-full rounded-xl'>Share Referral Link</button>
        </div>
        <div className='text-center text-gray-400 mt-3'>You'll get 10% commission on each successfull referrals</div>
      </div>
      <div className='mx-6  mt-4 py-4'>
        <div>Your Referrals</div>
        <div className='mt-2'>
          {users.length === 0 ? (
    <p className="text-gray-500">No referrals yet.</p>
  ) : (
    <ul className="space-y-2 mb-30">
      {users.map((u, idx) => (
        <li key={idx} className=' border-b-gray-300 border-b-1 border-dashed  py-3 flex justify-between text-gray-700 items-center'>
          <span className="text-sm text-gray-500">{u.createdAt}</span>
          <span className={`font-medium  text-center  capitalize text-emerald-950`}>{u.username}</span>
          <span className="text-sm text-gray-500">{u.plan=='free'?'Pending':'Successfull'}</span>
        </li>
      ))}
    </ul>
  )}
        </div>
      </div>
    </div>
  )
}

export default Referral