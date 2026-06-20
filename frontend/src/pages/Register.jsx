import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = ({ showToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch('https://hotel-management-8mwb.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    .then(res => {
      if (!res.ok) throw new Error();
      showToast("User record registered! Forwarding to validation gate.");
      navigate('/login');
    })
    .catch(() => showToast("Registration rejected. Email might be duplicate.", "error"));
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Account Onboarding Provision</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-gray-600">Full Structural Name</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-600">Email Identification Target</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-600">New Password String</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded font-bold">Register Profile Data</button>
      </form>
    </div>
  );
};

export default Register;