// LoginPage.jsx — handles user login and token storage

import React, { useState } from 'react'; // useState for managing form inputs
import axios from 'axios'; // axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // navigate function to redirect after login

const LoginPage = () => {
  // Local state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Hook to navigate to homepage after login

  // Function to handle login logic
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      // Send login request to backend
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // If login is successful, store the returned token in localStorage
      localStorage.setItem('token', res.data.token);

      alert('Login successful!');

      // Redirect user to the homepage
      navigate('/');
    } catch (err) {
      // If login fails, show error alert
      alert('Login failed');
    }
  };

  return (
    // Simple login form UI with styling
    <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h2>Login</h2>

      {/* Email input field */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />

      {/* Password input field */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />

      {/* Submit button */}
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginPage; // Export component so it can be used in routes