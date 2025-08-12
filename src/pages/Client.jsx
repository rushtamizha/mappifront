import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { getClientForms, getUserNameLink ,postLinkClick} from '../services/api.js';
import SocialLinks from './SocialLinks.jsx';
import avatar from '../assets/icons/avatar.avif'
import verified from "../assets/icons/verify.png"
const Client = () => {
  const navigate = useNavigate()
  const { username } = useParams();
  const [client, setClient] = useState([]);
  const [search, setSearch] = useState('');
  const [tab,setTab] = useState('links')
  const [forms,setForms] = useState([])
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [profile,setProfile] = useState({})

  useEffect(() => {
    GetClientLinks();
    getClientforms();
    getYouTubeVideoId()
  }, []);

  useEffect(() => {
    const filtered = client.filter((link) =>
      link.title.toLowerCase().includes(search.toLowerCase()) ||
      String(link.order  ).includes(search)
    );
    setFilteredLinks(filtered);
  }, [search, client]);


  const getYouTubeVideoId = (url) => {
  try {
    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regExp);
    return match && match[1] ? match[1] : null;
  } catch {
    return null;
  }
};

const PostLinkClicks = async(id)=>{
  try {
    await postLinkClick(id)
  } catch (error) {
    console.log(error)
  }
}

const videoId = getYouTubeVideoId(client.url);

  const GetClientLinks = async () => {
    const res = await getUserNameLink(username);
    setClient(res.data.links || []);
    setProfile(res.data.user || [])
  };

  const getClientforms = async () => {
    const res = await getClientForms(username)
    setForms(res.data || [])
  }

  return (
    <div className="max-w-xl mx-auto p-2 mb-15">

        <div className=' flex gap-2 max-w-2xl mx-auto '>
      <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
        </div>
        <input type="text" class="font-stretch-105%  border-2 border-gray-200 text-gray-500  rounded-lg  focus:outline-emerald-700 block w-full ps-10 p-4  " placeholder="Search link -or- number"
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
    </div>
    <button class="p-4 w-16 flex items-center justify-center  text-sm font-medium   border-2 border-emerald-600  rounded-lg   focus:outline-none ">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#047857"><path d="m422-232 207-248H469l29-227-185 267h139l-30 208ZM320-80l40-280H160l360-520h80l-40 320h240L400-80h-80Zm151-390Z"/></svg>
    </button>
    </div>
     <div className='flex py-3 gap-3 items-center max-w-2xl mx-auto'>
      <div className="relative w-18 h-18 rounded-full p-[2px] animate-borderColorChange">
  <img
    src={profile.profilePic || avatar}
    alt=""
    className="w-full h-full shadow-sm rounded-full object-cover"
  />

  <style>{`
    @keyframes borderColorChange {
      0% { border-color: #ff6b6b; }
      25% { border-color: #f59e0b; }
      50% { border-color: #60a5fa; }
      75% { border-color: #7c3aed; }
      100% { border-color: #06b6d4; }
    }
    .animate-borderColorChange {
      border: 2px solid #ff6b6b;
      animation: borderColorChange 6s linear infinite;
    }
  `}</style>
</div>
      <div>
        <div className='big-text font-semibold text-neutral-800 font-display capitalize'>{profile.username} <img className='h-3 inline' src={profile.plan=='pro' || profile.plan=='premium'?verified:''} alt="" /></div>
        <div className='text-sm text-gray-500 capitalize'>{profile.bio}</div>
      </div>
    </div>
    <SocialLinks/>
    <a href={`${window.location.origin}/register?ref=${username}`}>
    <div  className=' shadow-[1px_50px_100px_9px_rgba(234,_179,_8,_0.5)] fixed flex items-center justify-evenly gap-1 bg-linear-65 from-amber-400 to-amber-500 bottom-10 translate-x-1 border-1 px-6 py-3  text-white text-xl rounded-full outline-amber-300 outline-2 active:translate-1 hover:bg-linear-65 hover:from-amber-500 hover:to-amber-400 transition-all ease-in-out duration-700'>
      <span className='font-stretch-105% text-xs '>Free mappi</span>
      <span><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff"><path d="M160-280v80h640v-80H160Zm0-440h88q-5-9-6.5-19t-1.5-21q0-50 35-85t85-35q30 0 55.5 15.5T460-826l20 26 20-26q18-24 44-39t56-15q50 0 85 35t35 85q0 11-1.5 21t-6.5 19h88q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720Zm0 320h640v-240H596l84 114-64 46-136-184-136 184-64-46 82-114H160v240Zm200-320q17 0 28.5-11.5T400-760q0-17-11.5-28.5T360-800q-17 0-28.5 11.5T320-760q0 17 11.5 28.5T360-720Zm240 0q17 0 28.5-11.5T640-760q0-17-11.5-28.5T600-800q-17 0-28.5 11.5T560-760q0 17 11.5 28.5T600-720Z"/></svg></span>
    </div>
    </a>

    <hr className='h-0.25 bg-gray-100 my-2 border-none ' />

    <div className='flex justify-between'><p className='my-3 medium-text text-emerald-600' >All Links</p> <button className='flex items-center text-[#D62F2F] capitalize medium-text' onClick={()=> tab=="links" ? setTab('forms'):setTab('links')}>{tab=='links'?'forms':'links'}<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#D62F2F"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/></svg></button> </div>

      {tab === 'links' ? (
  filteredLinks.length === 0 ? (
    <div className="text-gray-500 text-center">No matching links found</div>
  ) : (
    <div className="space-y-4 flex flex-col transition-all ease-initial duration-700">
      {filteredLinks.map((link, index) => {
        const videoId = getYouTubeVideoId(link.url);

        return (
          <a onClick={()=>PostLinkClicks(link._id)}
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className=" transition-all ease-initial duration-700"
          >
            <div className="bg-white w-full border border-gray-200 rounded-xl p-4 shadow-2xs hover:shadow-sm transition ease-in">
              {videoId ? (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    className="w-full rounded"
                    alt="YouTube Thumbnail"
                  />
                  <span className="inline-block text-red-600 font-medium rounded ml-3 p-2 mt-2 capitalize">
                    {link.title}
                    <span className="text-green-600 bg-green-50 ml-2 px-3 rounded-full text-center align-middle">
                      {link.order}
                    </span>
                  </span>
                </>
              ) : (
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex gap-4 items-center">
                    {link.logo && (
                      <div>
                        <img
                          src={link.logo}
                          alt="logo"
                          className="w-full h-12 object-contain rounded shrink contain"
                        />
                      </div>
                    )}
                    <div>
                      {link.title && (
                        <>
                          <div className="flex gap-2 items-center">
                            <p className="text-gray-700 capitalize text-xl">
                              {link.title}
                            </p>
                            <span className="text-emerald-600 bg-green-50 px-3 rounded-full text-center align-middle">
                              {link.order}
                            </span>
                          </div>
                          <span className="text-gray-500 capitalize">
                            {link.description}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                  </svg>
                </div>
              )}
            </div>
          </a>
        );
      })}
    </div>
  )
) : <div className='gap-2 flex flex-col'>
  {forms.map((res,idx)=>(
    <div key={idx} onClick={()=>navigate(`/form/${res._id}`)} className='p-4 border-1 rounded-xl border-gray-200 flex justify-between'>
      <div className='text-xl text-gray-700'>{res.title}</div>
      <div><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFCB5C"><path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v240h-80v-240H160v525l46-45h394v80H240L80-80Zm80-240v-480 480ZM760-40v-200h-80v-240h200l-68 160h88L760-40Z"/></svg></div>
    </div>
  ))}
  </div>}

    </div>
  );
};

export default Client;
