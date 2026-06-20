import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser, showToast }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('https://hotel-management-8mwb.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      showToast("Access token validation approved!");
      navigate('/');
    })
    .catch(() => showToast("Invalid authorization strings provided.", "error"));
  };

  return (
    <div className="max-w-sm mx-auto bg-white p-6 rounded shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">User Identification Center</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-gray-600">Registered Email Pointer</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-600">Security Key Phrase</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold">Authenticate Session</button>
      </form>
    </div>
  );
};

export default Login;