import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import BookingForm from './pages/BookingForm';
import BookingHistory from './pages/BookingHistory';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    showToast("Logged out successfully");
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col justify-between">
        
        {toast && (
          <div className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg text-white font-semibold ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
            {toast.message}
          </div>
        )}

        <nav className="bg-blue-600 text-white p-4 shadow-md">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="text-2xl font-bold tracking-wide">GrandStay Hotel</Link>
            <div className="flex flex-wrap gap-4 items-center justify-center text-sm md:text-base">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/rooms" className="hover:underline">Rooms</Link>
              <Link to="/about" className="hover:underline">About</Link>
              <Link to="/contact" className="hover:underline">Contact</Link>
              {user ? (
                <>
                  <Link to="/history" className="hover:underline">My Bookings</Link>
                  {user.role === 'admin' && <Link to="/admin" className="bg-yellow-500 text-blue-900 px-2 py-1 rounded font-bold">Admin</Link>}
                  <span className="text-yellow-200">Hi, {user.name}</span>
                  <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:underline">Login</Link>
                  <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded font-semibold hover:bg-gray-100">Register</Link>
                </>
              )}
            </div>
          </div>
        </nav>

        <main className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room/:id" element={<RoomDetails user={user} showToast={showToast} />} />
            <Route path="/book/:id" element={<BookingForm user={user} showToast={showToast} />} />
            <Route path="/history" element={<BookingHistory user={user} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact showToast={showToast} />} />
            <Route path="/login" element={<Login setUser={setUser} showToast={showToast} />} />
            <Route path="/register" element={<Register showToast={showToast} />} />
            <Route path="/admin" element={<AdminDashboard user={user} showToast={showToast} />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white text-center p-4 text-sm mt-8">
          <p>&copy; 2026 GrandStay Hotel.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;