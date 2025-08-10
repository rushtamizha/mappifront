import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import UserLinks from './pages/UserLinks';
import FormDashboard from './pages/FormDashboard';
import FormResponses from './pages/FormResponses';
import FormSubmit from './pages/FormSubmit';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import SocialLinks from './pages/SocialLinks';
import Client from './pages/Client';
import Subscription from './pages/Subscription';
export default function App() {
  return (
    <Routes>
      <Route path="/form/:id" element={<FormSubmit />} />
      <Route path="/:username" element={<Client />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/SocialLinks" element={<SocialLinks />} />
      <Route path="/profileup" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/plan" element={<Subscription />} />
      <Route path="/add" element={<Login />} />
      <Route path="/forms" element={<FormDashboard />} />
      <Route path="/responses/:formId" element={<FormResponses />} />
       <Route path="/links" element={<UserLinks />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}
