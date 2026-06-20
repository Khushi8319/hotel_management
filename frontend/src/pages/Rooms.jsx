import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    axios.get('https://hotel-management-8mwb.onrender.com/api/rooms')
      .then(res => {
        setRooms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredRooms = rooms.filter(room => {
    const matchesType = typeFilter === '' || room.type.toLowerCase() === typeFilter.toLowerCase();
    const matchesPrice = maxPrice === '' || room.price <= parseInt(maxPrice);
    return matchesType && matchesPrice;
  });

  if (loading) return <div className="text-center text-xl mt-10 font-bold">Loading Premium Rooms...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Explore Our Available Accommodation</h2>
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="w-full md:w-1/2">
          <label className="block text-gray-700 font-medium mb-1">Filter By Category Type</label>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full border p-2 rounded">
            <option value="">All Categories</option>
            <option value="Standard">Standard Budget</option>
            <option value="Deluxe">Deluxe Premium</option>
            <option value="Suite">Elite Luxury Suite</option>
          </select>
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-gray-700 font-medium mb-1">Max Price per Night (INR)</label>
          <input type="number" placeholder="Enter maximum price limits" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="w-full border p-2 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredRooms.map(room => (
          <div key={room.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between">
            <img src={room.image} alt={room.type} className="w-full h-48 object-cover" />
            <div className="p-4 flex-grow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-gray-800">{room.type} Class</h3>
                <span className="text-sm bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded">No. {room.room_number}</span>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{room.description}</p>
              <p className="text-blue-600 font-bold text-lg mb-4">₹{room.price} / Night</p>
            </div>
            <div className="p-4 pt-0">
              <Link to={`/room/${room.id}`} state={{ room }} className="block text-center bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700">View Configuration Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;