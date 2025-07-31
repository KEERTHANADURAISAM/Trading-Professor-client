import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 mt-10">
      <div className="max-w-7xl mx-auto text-center text-sm sm:text-base font-medium">
        © {new Date().getFullYear()} Trading Professor. All rights reserved.
        Developed by C<sup>2</sup> Technologies
      </div>
    </footer>
  );
};

export default Footer;
