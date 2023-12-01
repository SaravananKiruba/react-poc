import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import OrderTable from './pages/OrderTable';
import LoginForm from './pages/LoginForm';
import { PrimeReactProvider } from 'primereact/api';
import './index.css';
import './App.css';

function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/OrderTable" element={<OrderTable />} />
          </Routes>
        </div>
      </Router>
    </PrimeReactProvider>
  );
}

export default App;
