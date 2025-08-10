import React, { useEffect, useState } from 'react';
import {
  getMyProfile,
  updateProfilePic,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
  getSocialLinks,
  createOrder, verifyPayment,userWithdraw
} from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;
const razorpay = import.meta.env.VITE_RAZORPAY_KEY

const Profile = () => {
  const [user, setUser] = useState({});
  const [profilePic, setProfilePic] = useState('');
  const [bio, setBio] = useState('');
  const [plan, setPlan] = useState('free');
  const [loading, setLoading] = useState(false);
  const [addMoney, setAddMoney] = useState(false);
  const [Withdraw, setWithdraw] = useState(false);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('UPI');
  const [accountInfo, setAccountInfo] = useState('');

  const navigate = useNavigate()

  const [socialLinks, setSocialLinks] = useState([]);
  const [newPlatform, setNewPlatform] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();
      const socialmedia = await getSocialLinks()
      setUser(res.data);
      setProfilePic(res.data.profilePic || '');
      setBio(res.data.bio || '');
      setPlan(res.data.plan || '')
      setSocialLinks(socialmedia.data || [])
    } catch (error) {
      console.error('Error loading profile:', err);
      toast.error(error.response.data.message)
    }
  };
 const handleLogOut = async () => {
  localStorage.removeItem('token');
  navigate('/login'); 
  toast.error('User Logged out')// or wherever you want to redirect after logout
};

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        setProfilePic(data.secure_url);
       await updateProfilePic({profilePic:data.secure_url})
        toast.success('Profile pic updated')
      } else {
        toast.error('Image upload failed');
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.error('Upload error:', err);
    }
  };

    const handleBioSave = async () => {
    setLoading(true);
    try {
      await updateProfilePic({ bio });
      toast.success('Profile updated!');
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAddLink = async () => {
    if (!newPlatform || !newUrl) return alert('Fill both fields');
    try {
      const res = await addSocialLink({platform: newPlatform, url: newUrl });
      setSocialLinks([...socialLinks, res.data]);
      setNewPlatform('');
      setNewUrl('');
      toast.success('Link added successfully')
    } catch (err) {
      toast.error('Failed to add link');
    }finally{
      fetchProfile()
    }
  };

  const handleUpdateLink = async (id, platform, url) => {
    try {
      const res = await updateSocialLink({ platform, url });
      setSocialLinks((prev) =>
        
        prev.map((link) => (link._id === id ? res.sociallinks : link))
      );
      toast.success('Link Updated')
    } catch (err) {
      toast.error('Failed to update link');
    }
  };

  const handleDeleteLink = async (id) => {
    try {
      await deleteSocialLink(id);
      setSocialLinks((prev) => prev.filter((link) => link._id !== id));
      toast.success('link deleted')
    } catch (err) {
      toast.error('Delete failed');
    }
    finally{
      fetchProfile()
    }
  };

  const HandleAddMoney = async()=>{
    try {
          const { data: order } = await createOrder(Number(amount));
    
          const options = {
            key: razorpay,
            amount: order.amount,
            currency: 'INR',
            name: 'Mappi',
            description: 'Wallet Recharge',
            order_id: order.id,
            handler: async function (response) {
              const paymentData = {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: amount,
              };
    
              const res = await verifyPayment(paymentData);
              toast.success(res.data.message);
              console.log(res)
              setAmount('');
            },
            theme: { color: '#6366f1' }
          };
    
          const razor = new window.Razorpay(options);
          razor.open();
        } catch (err) {
          toast.error('Payment Failed');
        } finally{
          setAddMoney(false)
        }
  }

const HandleWithdrawMoney = async () => {
  if (!amount || !accountInfo) return toast.error('Details missing');
  if (isNaN(amount) || amount <= 0) return toast.error('Invalid amount');

  try {
    const res = await userWithdraw({ amount, accountInfo, method });
    toast.success(res.response.data.message);
  } catch (error) {
    console.log(error)
    toast.error('Insufficient balance ');
  }
};

  return (
    <div className="max-w-xl mx-auto mb-30 font-stretch-105% p-6 bg-white rounded-xl animate-fadeIn duration-700 ">
      <h1 className="text-2xl font-bold mb-6 "> Profile</h1>
      <div className="flex flex-col items-center mb-6">
        <label htmlFor="profilepic" className=' relative transition-transform duration-300 hover:scale-105 group'><img
          src={profilePic || ''}
          alt={profilePic || 'not available'}
          className="w-28 h-28  object-cover rounded-full  border-4 border-transparent group-hover:border-emerald-300 transition duration-500 "
         />
         <span className='absolute bottom-0 right-0 bg-white rounded-full p-2 group-hover:scale-110 transition duration-300 '>
         <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="oklch(0.44 0 0)"><path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z" /></svg>
         </span>
         </label>
        <input type="file" accept="image/*" id='profilepic' onChange={handleImageUpload} className="mt-3 hidden" />
      </div>
      <div className='text-amber-600 w-full p-1 capitalize text-center text-xl'> Plan - {plan} </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Bio</label>
        <textarea
          rows="1"
          value={bio}
          onChange={(e) =>setBio(e.target.value )}
          className="w-full p-2 border-2 border-gray-100 rounded  "
        ></textarea>
      </div>

      <div className='flex gap-3'>
        <button
        onClick={handleBioSave}
        disabled={loading}
        className="bg-emerald-700 w-full py-4 text-white px-4 rounded hover:bg-emerald-800 transition duration-300 ease-in-out hover:scale-102"
      >
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
      <button onClick={()=>navigate('/plan')} className="bg-lime-600 w-full py-4 text-white px-4 rounded hover:bg-lime-700 transition duration-300 ease-in-out hover:scale-102">Become Pro</button>
      </div>

      <hr className="my-6 h-0.25 bg-gray-200 border-none" />

      { addMoney && !Withdraw && ( <input className='border-2 border-gray-100 p-3 w-full mb-4 rounded transition-all duration-300 ease-in-out focus:ring-2 focus:ring-emerald-500 ' placeholder='Enter Deposit Amount' type="text" onChange={(e) => setAmount(e.target.value)} />)}

      { !addMoney &&Withdraw  && <div>
        <select
        className="w-full border-2 border-gray-200 p-2 focus:outline-none  mb-3 rounded"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="UPI">UPI</option>
        <option value="Crypto">Crypto</option>
      </select>

      <input 
        type="text"
        placeholder={
          method === 'UPI' ? 'Enter UPI ID' :
          'Enter Wallet Address'
        }
        className="w-full border-2 border-gray-200 p-2 mb-3 rounded"
        onChange={(e) => setAccountInfo(e.target.value)}
      />

      <input
        type="number"
        placeholder="Enter Amount"
        className="w-full border-2 border-gray-200 p-2 mb-3 rounded"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

</div>}

      <div className='flex gap-2 mb-5 transition-all'>
        <button className={`bg-green-100 text-green-700 px-3 py-3 w-full rounded  ease-in-out ${Withdraw?'hidden':'block'}`} onClick={addMoney? HandleAddMoney : ()=> setAddMoney((prev)=> !prev) }>Add Money</button>
        <button className={`bg-red-100 text-red-700 px-3 py-3 w-full rounded ${addMoney?'hidden':'block'}`} onClick={Withdraw? HandleWithdrawMoney : ()=> setWithdraw((prev)=> !prev) }>Withdraw Money</button>
        { (addMoney || Withdraw) && <button onClick={()=>{ setAddMoney(false) ; setWithdraw(false) ; setAmount('')}}  className='bg-amber-300 w-1/3 rounded'>Cancel</button> }
      </div>

      <h2 className="text-xl font-bold mb-3">Social Links</h2>

      {socialLinks.map((link, idx) => (
        <div key={link._id} className="flex items-center gap-2 mb-3">
          <input
            type="text"
            value={link.platform}
            onChange={(e) =>
              setSocialLinks((prev) =>
                prev.map((l) =>
                  l._id === link._id ? { ...l, platform: e.target.value } : l
                )
              )
            }
            className="p-2 border rounded w-1/3 border-gray-200 bg-gray-50"
          />
          <input
            type="text"
            value={link.url}
            onChange={(e) =>
              setSocialLinks((prev) =>
                prev.map((l) =>
                  l._id === link._id ? { ...l, url: e.target.value } : l
                )
              )
            }
            className="p-2 border border-gray-200 bg-gray-50 rounded w-2/3"
          />
          <button
            onClick={() => handleUpdateLink(link.id, link.platform, link.url)}
            className="bg-emerald-700 text-white  px-2 py-2 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>
          </button>
          <button
            onClick={() => handleDeleteLink(link.id)}
            className="bg-red-700 text-white px-2 py-2 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </button>
        </div>
      ))}

      <div className="flex items-center gap-2 mt-4">
        <input
          type="text"
          placeholder="Platform"
          value={newPlatform}
          onChange={(e) => setNewPlatform(e.target.value)}
          className="p-2 border rounded w-1/3 border-gray-200 bg-gray-50"
        />
        <input
          type="text"
          placeholder="URL"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className="p-2 border rounded w-2/3 border-gray-200 bg-gray-50"
        />
        <button
          onClick={handleAddLink}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z"/></svg>
        </button>
      </div>
      <div className='text-center my-5'>
        <button className='text-[20px] w-full py-4 flex justify-center  items-center gap-1 text-[#D12E2E]' onClick={ handleLogOut}>Logout 
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#D12E2E"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
        </button>
      </div>
    </div>
  );
};

export default Profile;
