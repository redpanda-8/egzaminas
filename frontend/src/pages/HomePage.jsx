import React, { useEffect, useState } from 'react';
// Import function to fetch sales from backend
import { fetchSales } from '../services/api';
// Import StarRating component
// import StarRating from '../components/StarRating';

const HomePage = () => {
  // State to store all sales
  const [sales, setSales] = useState([]);
  // State for filtering by category
  const [searchCategory, setSearchCategory] = useState('');
  // State for filtering by sale name
  const [searchName, setSearchName] = useState('');

  // useEffect runs when either `searchCategory` or `searchName` changes
  useEffect(() => {
    const load = async () => {
      // Fetch sales based on filters
      const data = await fetchSales({ name: searchName, category: searchCategory });
      setSales(data); // Save to state
    };
    load();
  }, [searchCategory, searchName]);

  return (
    <div style={{ padding: '20px' }}>
      {/* Filters for name and category of the week */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)} // update state
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)} // update state
          style={{ padding: '5px' }}
        >
          <option value="">All categories</option>
          <option>Maistas</option>
          <option>Daiktai</option>
          <option>Gyvunai</option>
          <option>Elektronika</option>
          <option>Rubai</option>
        </select>
      </div>

      {/* If no sales match, show message */}
      {sales.length === 0 && <p>No sales found.</p>}

      {/* Loop through all sales and display their info */}
      {sales.map((sale) => (
        <div
          key={sale.id}
          style={{
            border: '1px solid #ddd',
            padding: '16px',
            marginBottom: '20px',
            borderRadius: '10px',
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '20px'
          }}
        >
          {/* Show sale image, or fallback to placeholder */}
          <img
            src={sale.photo || 'https://via.placeholder.com/150'}
            alt={sale.name}
            style={{
              width: '150px',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '8px'
            }}
          />

          {/* sale info section */}
          <div>
            <h3 style={{ margin: '0 0 10px' }}>{sale.name}</h3>
            <p>{sale.description}</p>
            <p><strong>Price:</strong> €{sale.price}</p>
            <p><strong>category:</strong> {sale.category}</p>
            <p><strong>Total Rating:</strong> {sale.total_rating}</p>

            {/* Include StarRating component for this sale */}
            {/* <StarRating
              saleId={sale.id}
              token={localStorage.getItem('token')} // pass token from browser storage
            /> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;