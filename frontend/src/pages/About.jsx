import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8 md:p-12 mt-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          About GrandStay Hotel
        </h1>
        
        <div className="space-y-6 text-gray-600 text-lg leading-relaxed text-center">
          <p>
            GrandStay Hotel is a fully functional Full-Stack Hotel Management System. 
            It is designed to streamline hotel operations, allowing users to effortlessly 
            browse available rooms, check real-time pricing, and book their stay online.
          </p>
          
          <p>
            Built using React for a dynamic frontend, Node.js and Express for a robust backend, 
            and MySQL to securely manage database entries. The project features role-based 
            access control with dedicated panels for both regular customers and administrators.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;