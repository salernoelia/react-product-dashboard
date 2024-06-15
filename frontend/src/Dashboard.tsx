import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <Link to="/products">Product List</Link>
        <Link to="/add-product">Add Product</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
