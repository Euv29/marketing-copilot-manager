import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      const decodedToken = JSON.parse(atob(res.data.token.split('.')[1]));
      const userName = decodedToken.name.replace(/\s+/g, '-').toLowerCase(); // Replace spaces with hyphens and convert to lowercase
      if (decodedToken.role === 'admin') {
        navigate(`/${userName}/admin-dashboard`);
      } else {
        navigate(`/${userName}/user-dashboard`);
      }
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;