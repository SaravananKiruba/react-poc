import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {


  return (
    <nav className="bg-amber-500 p-4">
      <div className="flex flex-col md:flex-row md:justify-start">
        <Link to="/" className="text-black mb-2 md:mb-0 md:mr-4">
          Home
        </Link>
        <Link to="/OrderTable" className="text-black mb-2 md:mb-0 md:mr-4">
        Order Details
        </Link>       
      </div>
    </nav>
  );
}

export default Navbar;