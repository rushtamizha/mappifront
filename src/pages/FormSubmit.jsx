import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFormById, submitFormResponse } from '../services/api';
import confetti from 'canvas-confetti';
const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET;


const FormSubmit = () => {
  const { id } = useParams(); // form ID from route
  const [form, setForm] = useState(null);
  const [inputs, setInputs] = useState({});
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await getFormById(id);
        console.log(res.data)
        setForm(res.data);
      } catch (error) {
        console.error('Failed to fetch form:', error);
      }
    };

    fetchForm();
  }, [id]);

  const handleChange = (label, value) => {
    setInputs({ ...inputs, [label]: value });
  };
const handleFileChange = async (label, files) => {
  const urls = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset); // replace with your preset
    formData.append("cloud_name", cloudName); // replace with your cloud

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        urls.push(data.secure_url);
      }
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
    }
  }

  setInputs((prev) => ({
    ...prev,
    [label]: urls,
  }));
};


const handleSubmit = async (e) => {
  e.preventDefault();
  const emptyFields = form.fields.filter((field) => {
  const value = inputs[field.label];

  if (field.type === 'file') {
    return !value || value.length === 0;
  }

  return !value || value.toString().trim() === '';
});

if (emptyFields.length > 0) {
  alert('Please fill all required fields before submitting.');
  return;
}


  const payload = {};

  for (const field of form.fields) {
    const label = field.label;
    payload[label] = inputs[label] || '';
  }

  try {
    setLoading(true);
    await submitFormResponse(id, payload); // Send JSON object now
    setSubmitted(true);
    confetti({
  particleCount: 100,
  spread: 90,
  startVelocity: 40,
  gravity: 2,
  colors: [
  "#f87171", // red-400
  "#fb923c", // orange-400
  "#fbbf24", // amber-400
  "#facc15", // yellow-400
  "#a3e635", // lime-400
  "#4ade80", // green-400
  "#34d399", // emerald-400
  "#2dd4bf", // teal-400
  "#22d3ee", // cyan-400
  "#38bdf8", // sky-400
  "#60a5fa", // blue-400
  "#818cf8", // indigo-400
  "#a78bfa", // violet-400
  "#c084fc", // purple-400
  "#e879f9", // fuchsia-400
  "#f472b6", // pink-400
  "#fb7185", // rose-400
  "#a8a29e", // stone-400
  "#a3a3a3", // neutral-400
  "#a1a1aa", // zinc-400
  "#9ca3af", // gray-400
  "#94a3b8"  // slate-400
],
  origin: { y: 0.2 },
  ticks: 700,
});
    
  } catch (err) {
    console.error('Form submission failed:', err);
  } finally {
    setLoading(false);
  }
};

  if (!form) return <p className="p-6">Loading form...</p>;
  if (submitted) return <div className='flex items-center flex-col justify-center w-screen h-screen'>
    <svg xmlns="http://www.w3.org/2000/svg" height="124px" viewBox="0 -960 960 960" width="124px" fill="#008236"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
    <p className="p-6 text-green-700 text-lg text-center">Form submitted successfully!</p>
     </div> ;

  return (
    <div className="max-w-xl mx-auto mt-5  p-6 bg-white rounded-xl shadow">
      <h2 className="medium-text font-medium capitalize">{form.title}</h2>
      <form onSubmit={handleSubmit} className="space-y-3 my-2 capitalize">
        {form.fields.map((field, index) => (
          <div key={index}>
            <label className="block mb-1 font-medium">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                value={inputs[field.label] || ''}
                onChange={(e) => handleChange(field.label, e.target.value)}
                className="border-2 border-gray-200 w-full px-3 py-2 rounded"
                rows={4}
              />
            ) : field.type === 'file' ? (
               <div>
    <input
      type="file"
      multiple
      onChange={(e) => handleFileChange(field.label, e.target.files)}
      className="block w-full p-4 text-sm text-gray-900 border border-gray-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
    />
    {Array.isArray(inputs[field.label]) && inputs[field.label].map((url, index) => (
        <img
        key={index}
        src={url}
        alt={`Uploaded ${index}`}
        className="mt-2 w-full h-fit object-cover rounded inline-flex  mr-2"
      />
    ))}
  </div>
            ) : (
              <input
                type={field.type}
                value={inputs[field.label] || ''}
                onChange={(e) => handleChange(field.label, e.target.value)}
                className="border-2 border-gray-200 w-full px-3 py-2 rounded"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-emerald-700 w-full py-4 text-white px-4  rounded hover:bg-emerald-800 flex items-center justify-center"
          disabled={loading}
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
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default FormSubmit;
