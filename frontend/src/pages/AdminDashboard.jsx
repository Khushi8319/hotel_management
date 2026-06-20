import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ user, showToast }) => {
  const [bookings, setBookings] = useState([]);
  const [newRoom, setNewRoom] = useState({ room_number: '', type: 'Standard', price: '', image: '', description: '', features: '' });

  useEffect(() => {
    fetch('https://hotel-management-8mwb.onrender.com/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error(err));
  }, []);

  const handleAddRoom = (e) => {
    e.preventDefault();
    fetch('https://hotel-management-8mwb.onrender.com/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRoom)
    })
    .then(res => {
      if(res.ok) {
        showToast("Room added successfully");
        setNewRoom({ room_number: '', type: 'Standard', price: '', image: '', description: '', features: '' });
      }
    });
  };

  return (
    <div className="space-y-8 p-8">
      <h2 className="text-3xl font-bold border-b pb-2">Admin Dashboard</h2>
      
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Add New Room</h3>
        <form onSubmit={handleAddRoom} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Room Number" required value={newRoom.room_number} onChange={(e)=>setNewRoom({...newRoom, room_number:e.target.value})} className="border p-2 rounded"/>
          <select value={newRoom.type} onChange={(e)=>setNewRoom({...newRoom, type:e.target.value})} className="border p-2 rounded">
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
          </select>
          <input type="number" placeholder="Price (INR)" required value={newRoom.price} onChange={(e)=>setNewRoom({...newRoom, price:e.target.value})} className="border p-2 rounded"/>
          <input type="text" placeholder="Image Link" required value={newRoom.image} onChange={(e)=>setNewRoom({...newRoom, image:e.target.value})} className="border p-2 rounded"/>
          <input type="text" placeholder="Features" required value={newRoom.features} onChange={(e)=>setNewRoom({...newRoom, features:e.target.value})} className="border p-2 rounded md:col-span-2"/>
          <textarea placeholder="Room Description" required value={newRoom.description} onChange={(e)=>setNewRoom({...newRoom, description:e.target.value})} className="border p-2 rounded md:col-span-2 h-20"></textarea>
          <button type="submit" className="bg-blue-600 text-white font-bold p-2 rounded md:col-span-2">Add Room</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <h3 className="text-xl font-bold mb-4">Booking History</h3>
        <table className="w-full text-left">
          <thead className="bg-gray-100 uppercase text-xs">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Room</th>
              <th className="p-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} className="border-b">
                <td className="p-3">#{b.id}</td>
                <td className="p-3">{b.user_name}</td>
                <td className="p-3">{b.type}</td>
                <td className="p-3">₹{b.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;