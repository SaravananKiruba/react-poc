import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Change 'Switch' to 'Routes'
import './index.css';
import './App.css'
import Home from './pages/Home';
import ListTable from './pages/ListTable';
import NewBookingForm from './pages/NewBookingForm';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Use 'element' instead of 'component' */}
          <Route path="/ListTable" element={<ListTable />} /> {/* Use 'element' instead of 'component' */}
          <Route path="/NewBookingForm" element={<NewBookingForm />} /> {/* Use 'element' instead of 'component' */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
