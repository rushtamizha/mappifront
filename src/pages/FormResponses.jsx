import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {getFormResponses, handleDeleteResponse} from '../services/api.js';

export default function FormResponses() {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  const [previewImg, setPreviewImg] = useState(null); // stores selected image URL
  const [imgList, setImgList] = useState([]); // list of all images for navigation
  const [currentIndex, setCurrentIndex] = useState(0); // current preview index

  useEffect(() => {
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
    });
  }, [formId]);

  const handleDelete = async (deleteId) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this response?');
  if (!confirmDelete) return;

  try {
    await handleDeleteResponse(deleteId);
      setResponses(prev => prev.filter(r => r._id !== deleteId));
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
    <div className="max-w-2xl font-stretch-105% mx-auto  p-4 relative">
      <h1 className="text-2xl font-semibold font-stretch-105% mb-4">Responses</h1>
      {responses.length === 0 ? (
        <p className="text-gray-500 text-center">No response data available</p>
      ) : (
        responses.map((res, i) => (
  <div key={i} className="border border-gray-200 p-4 mb-3 rounded-lg">
    <p className="text-sm text-gray-500 mb-2">
      Submitted <span className='text-lime-600'>{new Date(res.createdAt).toLocaleString("en-IN")}</span>
    </p>
    {res.responses &&
      Object.entries(res.responses).map(([key, value], idx) => (
        <div key={idx} className="mb-2 flex gap-2">
          <span className="font-semibold capitalize">{key}</span>:
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
    </div>
  );
}
