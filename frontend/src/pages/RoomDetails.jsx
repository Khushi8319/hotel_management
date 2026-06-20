import React, { useState, useEffect } from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';

const RoomDetails = ({ user, showToast }) => {
  const { id } = useParams();
  const location = useLocation();
  const room = location.state?.room;
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const fetchReviews = () => {
    fetch(`https://hotel-management-8mwb.onrender.com/api/reviews/${id}`)
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  if (!room) return <p className="text-center text-red-500 font-bold">Room context failed to index. Browse via Room tab.</p>;

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) return showToast("Log in to submit performance feedback scores", "error");

    const reviewPayload = { user_id: user.id, room_id: room.id, rating, comment };
    
    fetch('https://hotel-management-8mwb.onrender.com/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewPayload)
    })
    .then(res => {
      if(res.ok) {
        showToast("Review submitted successfully!");
        setComment('');
        fetchReviews();
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <img src={room.image} alt={room.type} className="w-full h-80 object-cover rounded mb-6" />
      <h2 className="text-3xl font-bold mb-2">{room.type} Luxury Suite Room</h2>
      <p className="text-xl text-blue-600 font-semibold mb-4">Price: ₹{room.price} per operational night</p>
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-1">Structural Overview Layout</h4>
        <p className="text-gray-600">{room.description}</p>
      </div>
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 mb-1">Amenity Specifications Included</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {room.features.split(',').map((f, i) => (
            <span key={i} className="bg-gray-200 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">{f.trim()}</span>
          ))}
        </div>
      </div>
      <Link to={`/book/${room.id}`} state={{ room }} className="inline-block bg-green-500 text-white font-bold px-6 py-3 rounded shadow hover:bg-green-600 transition">Proceed to Registration Setup</Link>
      <hr className="my-8" />
      <h3 className="text-2xl font-bold mb-4">Guest Verified Testimonials</h3>
      <div className="space-y-4 mb-6">
        {reviews.map(r => (
          <div key={r.id} className="border-b pb-2">
            <div className="flex justify-between font-semibold text-gray-700">
              <span>{r.name}</span>
              <span className="text-yellow-500">{"★".repeat(r.rating)}</span>
            </div>
            <p className="text-gray-600 text-sm">{r.comment}</p>
          </div>
        ))}
        {reviews.length === 0 && <p className="text-gray-400 text-sm">No historical reviews written for this structural item.</p>}
      </div>
      <form onSubmit={handleReviewSubmit} className="bg-gray-50 p-4 rounded">
        <h4 className="font-bold text-gray-800 mb-2">Leave a Custom Review</h4>
        <div className="mb-2">
          <label className="block text-sm">Rating Metric Level</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)} className="border p-1 rounded w-full">
            <option value="5">5 Stars - Exceptionally Outstanding</option>
            <option value="4">4 Stars - Highly Satisfactory</option>
            <option value="3">3 Stars - Average Competency</option>
            <option value="2">2 Stars - Requires Improvement</option>
            <option value="1">1 Star - Highly Disappointing</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="block text-sm">Feedback Commentary</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required placeholder="Provide descriptive feedback loops" className="border p-2 w-full rounded h-20"></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-1.5 text-sm rounded font-medium">Post Review Data</button>
      </form>
    </div>
  );
};

export default RoomDetails;