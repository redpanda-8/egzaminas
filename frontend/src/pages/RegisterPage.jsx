// RegisterPage.jsx — handles user registration logic and form state

import React, { useState } from 'react'; // useState to manage form input state
import axios from 'axios'; // axios to make HTTP requests to the backend
import { useNavigate } from 'react-router-dom'; // useNavigate hook for redirection

const RegisterPage = () => {
  //  Local state for each input field (name, email, password)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Hook to programmatically navigate to login page after registration

  // Function that runs on form submit
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    try {
      // Send a POST request to the backend registration endpoint with input data
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      alert('Registered successfully! Please log in.'); // Notify user of success
      navigate('/login'); // Redirect to login page
    } catch (err) {
      // If registration fails (e.g. duplicate email), show alert
      alert('Registration failed. Email might already be taken.');
    }
  };

  return (
    // Registration form UI with inline styles for simplicity
    <form onSubmit={handleRegister} style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h2>Register</h2>

      {/* Name input field */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)} // update name state
        required
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />

      {/* Email input field */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // update email state
        required
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />

      {/* Password input field */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // update password state
        required
        style={{ display: 'block', marginBottom: '10px', width: '100%' }}
      />

      {/* Submit registration button */}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage; // Export component to be used in routing