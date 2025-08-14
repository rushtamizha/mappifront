import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getFormResponses, handleDeleteResponse} from '../services/api.js';
import toast from 'react-hot-toast';

export default function FormResponses() {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  const [previewImg, setPreviewImg] = useState(null); // stores selected image URL
  const [imgList, setImgList] = useState([]); // list of all images for navigation
  const [currentIndex, setCurrentIndex] = useState(0); // current preview index
    const [loader,setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    getFormResponses(formId).then((res) => {
      const data = res.data || [];
      setResponses(data);
      // extract all image URLs
    const imgs = [];
data.forEach((item) => {
  Object.values(item.responses || {}).forEach((val) => {
    if (typeof val === 'string' && (val.startsWith('http://') || val.startsWith('https://'))) {
      imgs.push(val);
    }
  });
});

      setImgList(imgs);
      setLoader(false)
    });
    
  }, [formId]);

  const handleDelete = async (deleteId) => {
  try {
    await handleDeleteResponse(deleteId);
      setResponses(prev => prev.filter(r => r._id !== deleteId));
      toast.success('Response Deleted')
  } catch (err) {
    console.error('Delete failed:', err);
    alert('Failed to delete the response');
  }
};

  const handleImgClick = (url) => {
    setCurrentIndex(imgList.indexOf(url));
    setPreviewImg(url);
  };

  const handleClose = () => {
    setPreviewImg(null);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setPreviewImg(imgList[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex < imgList.length ) {
      const newIndex = currentIndex + 1;
      setPreviewImg(imgList[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  return (
    loader ? (
    <div className="loader h-full w-full"> 
      <div className='flex justify-center items-center h-full fixed w-full '>
        <div role="status">
    <svg aria-hidden="true" className="inline w-8 h-8 text-gray-100 animate-spin  fill-emerald-700" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    </div>
      </div>
    </div> ) : ( <>
    <div className="max-w-2xl font-stretch-105% mx-auto  p-4 relative">
      <h1 className="text-xl font-medium font-stretch-105% mb-4">Responses</h1>
      {responses.length === 0 ? (
        <p className="text-gray-500 text-center">No response data available</p>
      ) : (
        responses.map((res, i) => (
  <div key={i} className="border border-gray-200 p-4 mb-3 rounded-lg">
    <p className="text-sm text-gray-700 mb-2">
      Submitted <span className='text-blue-600'>{new Date(res.createdAt).toLocaleString("en-IN")}</span>
    </p>
    {res.responses &&
      Object.entries(res.responses).map(([key, value], idx) => (
        <div key={idx} className="mb-2 text-gray-700 flex gap-2">
          <span className="font-medium capitalize">{key}</span>:
          {Array.isArray(value) && value.every((v) => typeof v === 'string' && v.startsWith('http')) ? (
            <div className="flex flex-wrap gap-2 mt-1">
              {value.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`${key}-${i}`}
                  onClick={() => handleImgClick(url)}
                  className="w-10 h-10 object-cover rounded cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          ) : typeof value === 'string' && value.startsWith('http') ? (
            <img
              src={value}
              alt={key}
              onClick={() => handleImgClick(value)}
              className="w-10 h-10 object-cover rounded mt-1 cursor-pointer hover:opacity-80 transition"
            />
          ) : (
            <p className='text-emerald-700 capitalize'>{value}</p>
          )}
        </div>
      ))}
    <div
      onClick={() => handleDelete(res._id)}
      className="mt-2 w-full text-end "
    >
      <button className='text-[#d22a2f] text-end hover:text-[#a60c0c] px-4.25 py-1 rounded'>Delete</button>
    </div>
  </div>
))

      )}

      {/* Fullscreen Image Preview Modal */}
      {previewImg && (
        <div className="fixed inset-0 backdrop-blur-3xl   flex items-center justify-center z-50">
          <div className="">
            <img
              src={previewImg}
              alt="Preview"
              className="max-h-[90vh] max-w-[90vw] rounded-lg "
            />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-black text-3xl bg-white bg-opacity-60 p-2 rounded-full hover:bg-opacity-80"
            >
              &times;
            </button>

            {/* Left Arrow */}
            {currentIndex > 0 && (
              <button
                onClick={handlePrev}
                className="absolute top-3 left-3 text-white text-4xl bg-white bg-opacity-40 p-2 rounded-full hover:bg-opacity-70 transform -translate-y-1/2"
              >
                &#8592;
              </button>
            )}

            {/* Right Arrow */}
            {currentIndex < imgList.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 text-transparent text-4xl  bg-opacity-40 p-2 rounded-full hover:bg-opacity-70 transform -translate-y-1/2"
              >
                &#8594;
              </button>
            )}
          </div>
        </div>
      )}
    </div> </> )
  );
}

