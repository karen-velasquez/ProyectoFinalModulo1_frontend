import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Asegúrate de importar el CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

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

      localStorage.setItem('token', data.token);
      navigate('/tasks');
    } catch (err) {
      console.error(err);
      setError('Error de conexión al servidor');
    }
  };

  return (
    <section className="container">
      <div className="login-container">
        <div className="circle circle-one"></div>
        <div className="form-container">
          <img
            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
            alt="illustration"
            className="illustration"
          />
          <h1 className="opacity">LOGIN</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="opacity">Iniciar sesión</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          <div className="register-forget opacity">
            <a href="#">REGISTRARSE</a>
            <a href="#">¿OLVIDASTE TU CONTRASEÑA?</a>
          </div>
        </div>
        <div className="circle circle-two"></div>
      </div>
    </section>
  );
};

export default Login;
