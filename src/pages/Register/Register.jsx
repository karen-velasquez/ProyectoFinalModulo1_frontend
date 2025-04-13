import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Login/Login'; // Usamos el mismo CSS del login para mantener el estilo

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Error al registrarse');
        return;
      }

      setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
      setTimeout(() => navigate('/login'), 2000);
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
          <h1 className="opacity">REGISTRARSE</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <button type="submit" className="opacity">Registrarse</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
          </form>
          <div className="register-forget opacity">
            <a href="/login">¿Ya tienes cuenta? Inicia sesión</a>
          </div>
        </div>
        <div className="circle circle-two"></div>
      </div>
    </section>
  );
};

export default Register;
