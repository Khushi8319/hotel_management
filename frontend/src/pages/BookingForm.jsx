import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookingForm = ({ user, showToast }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state?.room;
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  if (!room) return <p className="text-center text-red-500 font-bold">Session parameters dropped. Please re-select booking targets.</p>;

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = Math.abs(new Date(checkOut) - new Date(checkIn));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (diffDays || 1) * room.price;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      showToast("Authentication missing. Log in to reserve catalog rooms.", "error");
      return navigate('/login');
    }
    const payload = { user_id: user.id, room_id: room.id, check_in: checkIn, check_out: checkOut, total_price: calculateTotal() };
    fetch('https://hotel-management-8mwb.onrender.com/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (res.ok) {
        showToast("Reservation successfully indexed into system matrix!");
        navigate('/history');
      } else {
        showToast("Failed to secure allocation limits.", "error");
      }
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Confirm Reservation Schedule</h2>
      <div className="bg-blue-50 p-3 rounded mb-4 text-sm text-blue-800">
        <p><strong>Selected Target:</strong> Room {room.room_number} ({room.type})</p>
        <p><strong>Standard Rate Base:</strong> ₹{room.price} per calendar night</p>
      </div>
      <form onSubmit={handleBookingSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">Check-In Calendar Index</label>
          <input type="date" required value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-1">Check-Out Calendar Index</label>
          <input type="date" required value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border p-2 rounded" />
        </div>
        <div className="border-t pt-4 text-right">
          <p className="text-gray-600 text-sm">Calculated Aggregate Valuation:</p>
          <p className="text-2xl font-bold text-green-600">Extractions: ₹{calculateTotal()}</p>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">Confirm Financial Lock</button>
      </form>
    </div>
  );
};

export default BookingForm;