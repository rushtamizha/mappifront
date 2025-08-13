import React, { useEffect, useState } from 'react';
import { getMyProfile, getSocialLinks } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import defaultLinkIcon from '../assets/icons/link.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import instagramIcon from '../assets/icons/insta.webp';
import facebookIcon from '../assets/icons/facebook.png';
import twitterIcon from '../assets/icons/x.jpg';
import youtubeIcon from '../assets/icons/youtube.webp';
import linkedinIcon from '../assets/icons/linkedin.png';
import whatsappIcon from '../assets/icons/whatsapp.avif';
import snapchatIcon from '../assets/icons/snapchat.jpg';
import telegramIcon from '../assets/icons/telegram.webp';
import xIcon from '../assets/icons/x.jpg';
import tiktokIcon from '../assets/icons/tiktok.png';

export const icons = {
  instagram: instagramIcon,
  facebook: facebookIcon,
  twitter: twitterIcon,
  youtube: youtubeIcon,
  linkedin: linkedinIcon,
  whatsapp: whatsappIcon,
  snapchat: snapchatIcon,
  telegram: telegramIcon,
  x: xIcon,
  tiktok: tiktokIcon,
};
const SocialLinks = () => {
  const [links, setLinks] = useState([]);
  const { username } = useParams();
  const [tempName, setTempName] = useState('');

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        let finalUsername = username;

        // If no username in params, get from profile
        if (!finalUsername) {
          const rest = await getMyProfile();
          finalUsername = rest.data.username;
          setTempName(finalUsername);
        }

        const res = await getSocialLinks(finalUsername); // finalUsername passed as param
        setLinks(res.data || []);
      } catch (error) {
        console.error('Error fetching social links:', error);
        toast.error(error?.response?.data?.message || 'Failed to fetch social links');
      }
    };

    fetchLinks();
  }, [username]);

  const getPlatformLogo = (platform) => {
    return icons[platform?.toLowerCase()] || defaultLinkIcon;
  };

  return (
    <div className=" p-2 mb-2 max-w-2xl mx-auto">
      {links.length === 0 ? (
        <p className="text-gray-500 font-stretch-105%">No social links found.</p>
      ) : (
        <Swiper
          spaceBetween={10}
          slidesPerView={2}
        >
          {links.map((link, i) => (
            <SwiperSlide key={i}>
              <div
                className="border-1 rounded-4xl border-gray-100 justify-center items-center flex py-2 px-3 gap-2  hover:shadow-sm cursor-pointer"
                onClick={() => window.open(link.url, '_blank')}
              >
                <img
                  className="h-5 w-5 rounded"
                  src={getPlatformLogo(link.platform)}
                  alt={link.platform}
                />
                <span className=' text-gray-600'>{link.platform}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default SocialLinks;
