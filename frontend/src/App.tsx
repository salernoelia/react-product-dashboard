import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserList from './UserList';
import Register from './Register';
import Login from './Login';
import ProductList from './ProductList';
import AddProduct from './AddProduct';
import Dashboard from './Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/">Dashboard</Link>
            <Link to="/users">Users</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
