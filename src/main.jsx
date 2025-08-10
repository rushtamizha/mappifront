import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import SplashCursor from './pages/SplashCursor.jsx';
const googleKey = import.meta.env.VITE_GOOGLE_KEY;

createRoot(document.getElementById('root')).render(

    <GoogleOAuthProvider clientId={googleKey}>
      <BrowserRouter>
     <Toaster
  position="top-center"
  toastOptions={{
    style: {
      background: '#333',
      color: '#333',
      borderRadius: '8px',
    },
    success: {
      style: {
        background: '#ffff',
      },
    },
    error: {
      style: {
        background: '#ffff',
      },
    },
  }}
/>    <SplashCursor/>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
);
