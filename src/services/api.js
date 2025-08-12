// src/api.js
import axios from 'axios';
export const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
export const checkUsername = (username) => API.get(`/auth/check-username/${username}`);
export const sendOtp = (gmail) => API.post(`/auth/register/send-otp`, { gmail });
export const register = (data) => API.post(`/auth/register`, data);
export const verifyOtp = (gmail, otp) => API.post(`/auth/register/verify-otp`, { gmail, otp });
export const login = (data) => API.post(`/auth/login`, data);
export const forgotPassword = (gmail) => API.post(`/auth/forgot-password/send-otp`, { gmail });
export const resetPassword = (data) => API.post(`/auth/forgot-password/verify`, data);
export const registerOAuthUser = (data) => API.post('/auth/register-google', data); // NEW
export const googleAuthLogin = async (token) => {
  const res = await API.post('/auth/google-login', { token });
  return res;
};
export const updateLinkOrder = async (orderedLinks) => {
  const token = localStorage.getItem('token');
  return await API.put('/links/reorder', { links: orderedLinks },{ headers: { Authorization: `Bearer ${token}`} })
};

export const getUserLinks = async (userId) => {
  const token = localStorage.getItem('token');
  return await API.get(`/links/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteLink = async(id) => {
  const token = localStorage.getItem('token');
  return await API.delete(`/links/delete/${id}`,{
    headers:{Authorization:`Bearer ${token}`},
  })
}

export const updateLink = async (id, data) =>{
  const token = localStorage.getItem('token');
  return await API.put(`/links/update/${id}`, data,{
    headers:{Authorization:`Bearer ${token}`},
  });
}
// services/api.js
export const createLink = async (linkData) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append('title', linkData.title);
  formData.append('url', linkData.url);
  formData.append('description', linkData.description);

  // Cloudinary logo already uploaded
  if (linkData.logo) {
    formData.append('logo', linkData.logo); // 💡 backend expects 'logo' field name
  }

  return await API.post('/links/add', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};


export const visibility = async (id, data) => {
  const token = localStorage.getItem('token');
  return await API.patch(`/links/toggle/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


import {jwtDecode} from 'jwt-decode';

export const getUserStats = async () => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token); // This will give you the payload
  const userId = decoded.userId || decoded._id || decoded.userId;

  return await API.get(`/links/stats/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ Create Form
export const createForm = async (formData) => {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const userId = decoded.userId || decoded._id || decoded.id;

  return await API.post(`/form/create`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ Get My Forms
export const getMyForms = async () => {
  const token = localStorage.getItem('token');
  return await API.get(`/form/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ Delete Form
export const deleteForm = async (id) => {
  const token = localStorage.getItem('token');
  return await API.delete(`/form/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ✅ Get Form by ID (for public viewing)
export const getFormById = async (formId) => {
  return await API.get(`/form/${formId}`);
};

// ✅ Submit a form response (multipart/form-data)
export const submitFormResponse = async (formId, formData) => {
  return await API.post(`/formresponse/submit/${formId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};


export const updateProfilePic = async (data) => {
  const token = localStorage.getItem('token');
  return await API.put('/auth/update-profile-pic', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMyProfile = async () => {
  const token = localStorage.getItem('token');
  return await API.get('/auth/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const getSocialLinks =async () =>{
  const token = localStorage.getItem('token');
  return await API.get(`/social-links/`,{
    headers: { Authorization: `Bearer ${token}` },
  });
}
export const getFormResponses= async (formId) =>{
  try {
    const token = localStorage.getItem('token');
    return await API.get(`formresponse/responses/${formId}`,{
      headers:{Authorization:`Bearer ${token}`} }
    )
  } catch (error) {
    console.error('Failed to fetch form responses:', err);
  }
}
export const handleDeleteResponse = async (formId) => {
  try {
    const token = localStorage.getItem('token');
    await API.delete(`/formresponse/${formId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Update UI after deletion
  } catch (err) {
    console.error('Failed to delete:', err);
  }
};

export const addSocialLink = async (data) => {
  try {
    const token = localStorage.getItem('token');
    return await API.post(`/social-links/`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (err) {
    console.error('Failed to delete:', err);
  }
};

export const updateSocialLink = async (data) => {
  try {
    const token = localStorage.getItem('token');
    await API.post(`social-links/`,data ,{
      headers: { Authorization: `Bearer ${token}` }
    });
    // Update UI after deletion
  } catch (err) {
    console.error('Failed to delete:', err);
  }
};
export const deleteSocialLink = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await API.delete(`/social-links/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Update UI after deletion
  } catch (err) {
    console.error('Failed to delete:', err);
  }
};

export const getreferrals = async (id) => {
  try {
    const token = localStorage.getItem('token');
    return await API.get(`/referral/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Update UI after deletion
  } catch (err) {
    console.error('Failed to get referrals:', err);
  }
};
export const getUserWallet = async (id) => {
  try {
    const token = localStorage.getItem('token');
    return await API.get(`/wallet/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Update UI after deletion
  } catch (err) {
    console.error('Failed to get referrals:', err);
  }
};
export const createOrder = async (amount) => {
  try {
    const token = localStorage.getItem('token');
    return await API.post(`/payment/order/`, { amount } ,{
      headers: { Authorization: `Bearer ${token}` }
    });
    // Update UI after deletion
  } catch (err) {
    console.error('Failed to get referrals:', err);
  }
};
export const verifyPayment = async (paymentData) => {
  try {
    const token = localStorage.getItem('token');
    return await API.post(`/payment/verify`,paymentData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Update UI after deletion
  } catch (err) {
    console.error('Failed to get referrals:', err);
  }
};

//pending
export const purchasePlan = async (id) => {
  try {
    const token = localStorage.getItem('token');
    return await API.post(`/wallet/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Update UI after deletion
  } catch (err) {
    console.error('Failed to get referrals:', err);
  }
};

export const userWithdraw = async (data) => {
  try {
    const token = localStorage.getItem('token');
    return await API.post(`/wallet/withdraw/`,data , {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Update UI after deletion
  } catch (err) {
    console.error('Failed to get referrals:', err);
  }
};

export const planBuy = async (plan) => {
  try {
    const token = localStorage.getItem('token');
  return await API.post('/plan/buy', {plan} ,{headers:{Authorization: `Bearer ${token}`}})
  } catch (error) {
    console.log(error)
  }
}

export const getClientForms = async (username) => {
  try {
    const token = localStorage.getItem('token');
  return await API.get(`/form/forms/${username}`,
    {headers:{Authorization: `Bearer ${token}`}})
  } catch (error) {
    console.log(error)
  }
}

export const postLinkClick = async (id) => {
  try {
    return await API.post(`/links/click/${id}`)
  } catch (error) {
    console.log(error)
  }
}

export const getUserNameLink = async(username) =>{
  return await API.get(`/links/username/${username}`)
}
export default API;