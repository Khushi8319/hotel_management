import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="text-center py-12">
      <div className="bg-cover bg-center h-96 rounded-xl shadow-lg flex flex-col justify-center items-center text-white px-4" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1000')" }}>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to GrandStay Hotel</h1>
        <p className="text-lg md:text-xl max-w-2xl mb-6">Experience ultimate relaxation, structural luxury, and five-star hospitality at the lowest reasonable prices.</p>
        <Link to="/rooms" className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">Browse Our Premium Rooms</Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Luxury Rooms</h3>
          <p className="text-gray-600">Equipped with premium structural bedding and stunning scenic views.</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-xl font-bold text-blue-600 mb-2">24/7 Service</h3>
          <p className="text-gray-600">Our front desk counters and cleaning staffs are operational around the clock.</p>
        </div>
        <div className="p-6 bg-white rounded shadow">
          <h3 className="text-xl font-bold text-blue-600 mb-2">Free Wi-Fi & Food</h3>
          <p className="text-gray-600">High speed internet access limits along with complimentary breakfast packages.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;