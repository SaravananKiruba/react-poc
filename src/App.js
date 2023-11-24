import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import OrderTable from './pages/OrderTable';
import LoginForm from './pages/LoginForm';
import './index.css';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<LoginForm />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/OrderTable" element={<OrderTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
