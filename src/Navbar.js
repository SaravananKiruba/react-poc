import React from 'react';

function Navbar() {
    return (
        <nav className="bg-blue-500 p-4">
            <div className="flex flex-col md:flex-row md:justify-start">
                <a href="/" className="text-white mb-2 md:mb-0 md:mr-4">Home</a>
                <a href="/about" className="text-white mb-2 md:mb-0 md:mr-4">List Tables</a>
                <a href="/contact" className="text-white">New Booking Form</a>
            </div>           
        </nav>
    );
}

export default Navbar;
