import React, { useEffect, useState } from 'react';
import { purchasePlan, getProfile } from '../services/api';

const PlanPurchase = () => {
  const [plan, setPlan] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    const { data } = await getProfile();
    setUser(data.user);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const { data } = await purchasePlan(plan);
      alert(data.message);
      fetchProfile(); // refresh wallet/plan
    } catch (err) {
      alert(err.response?.data?.error || 'Purchase failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Choose a Plan</h2>
      <div className="mb-4">
        <label className="block mb-2">Current Wallet: ₹{user.wallet}</label>
        <select
          className="border w-full px-3 py-2 rounded"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <option value="">Select Plan</option>
          <option value="free">Free - ₹0</option>
          <option value="pro">Pro - ₹100</option>
          <option value="premium">Premium - ₹250</option>
        </select>
      </div>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
        onClick={handlePurchase}
        disabled={loading || !plan}
      >
        {loading ? 'Processing...' : 'Activate Plan'}
      </button>
    </div>
  );
};

export default PlanPurchase;
