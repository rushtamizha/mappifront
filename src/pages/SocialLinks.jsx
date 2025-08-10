import React, { useEffect, useState } from 'react';
import { getSocialLinks } from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import defaultLinkIcon from '../assets/icons/link.png';

const SocialLinks = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await getSocialLinks();
        setLinks(res.data);
      } catch (error) {
        console.error('Error fetching social links:', err);
        toast.error(error.response.data.message)
      }
    };

    fetchLinks();
  }, []);

  const getPlatformLogo = (platform) => {
    const logos = {
      instagram: '/src/assets/icons/insta.webp',
      facebook: '/src/assets/icons/facebook.png',
      twitter: '/src/assets/icons/x.jpg',
      youtube: '/src/assets/icons/youtube.webp',
      linkedin: '/src/assets/icons/linkedin.png',
      whatsapp: '/src/assets/icons/whatsapp.avif',
      snapchat: '/src/assets/icons/snapchat.jpg',
      telegram: '/src/assets/icons/telegram.webp',
      x: '/src/assets/icons/x.jpg',
      tiktok: '/src/assets/icons/tiktok.png',
    };

    return logos[platform.toLowerCase()] || defaultLinkIcon;
  };

  return (
    <div className=" p-2 mb-2 max-w-2xl mx-auto">
      {links.length === 0 ? (
        <p className="text-gray-500 font-stretch-105%">No social links found.</p>
      ) : (
        <ul className="flex gap-2 flex-wrap ">
          {links.map((link,i) => (
            <div
              key={i}
              className=" flex flex-wrap gap-2 max-w-2xl  cursor-pointer"
              onClick={() => window.open(link.url, '_blank')}
            >
              <div className="border-2 rounded-4xl border-gray-100 flex py-2 px-3.5 gap-3 items-center hover:shadow-sm font-stretch-105%">
                <img className="h-5 rounded" src={getPlatformLogo(link.platform)  }  />
                <span className="text-gray-600 text-1xl capitalize">{link.platform}</span>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SocialLinks;
