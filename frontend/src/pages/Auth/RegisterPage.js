const handleRegister = async (e) => {
  e.preventDefault();
  console.log('Registration attempt with data:', formData);
  try {
    const response = await api.post('/api/register', formData); // Rota correta: /api/register
    console.log('Registration successful:', response.data);
    alert('User registered successfully');
    navigate('/login');
  } catch (error) {
    console.error('Registration error:', error);
    alert('Registration failed');
  }
};
