import React, { useState, useEffect } from 'react';

const BookingHistory = ({ user }) => {
  const [history, setHistory] = useState([]);

useEffect(() => {
  if (user) {
    fetch('https://hotel-management-8mwb.onrender.com/api/bookings')
      .then(res => res.json())
      .then(data => {
        
        const myBookings = data.filter(b => b.user_id === user.id);
        setHistory(myBookings);
      })
      .catch(err => console.error(err));
  }
}, [user]);
  if (!user) return <p className="text-center text-red-500 font-bold mt-10">Access denied. Sign in to analyze personal records statements.</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Personal Stay History</h2>
      <div className="space-y-4">
        {history.map(b => (
          <div key={b.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
            <img src={b.image} alt={b.type} className="w-24 h-24 rounded object-cover" />
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-800">{b.type} Tier (Room {b.room_number})</h3>
              <p className="text-gray-500 text-sm">Timeline Span: {b.check_in.split('T')[0]} to {b.check_out.split('T')[0]}</p>
              <p className="text-blue-600 font-bold text-sm">Paid Clearance: ₹{b.total_price}</p>
            </div>
            <div>
              <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{b.status}</span>
            </div>
          </div>
        ))}
        {history.length === 0 && <p className="text-center text-gray-500 py-10">No history found on this matching user id token key.</p>}
      </div>
    </div>
  );
};

export default BookingHistory;