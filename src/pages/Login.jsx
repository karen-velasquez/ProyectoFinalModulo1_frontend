import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Error al iniciar sesión');
        return;
      }

      // Guarda el token en localStorage
      localStorage.setItem('token', data.token);

      // Redirige o actualiza estado global (según cómo manejes auth)
      alert('¡Inicio de sesión exitoso!');
      // window.location.href = '/dashboard'; // si no usas router
    } catch (err) {
      console.error(err);
      setError('Error de conexión al servidor');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
        <br />
        <input 
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <br />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
};

export default Login;
