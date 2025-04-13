import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importando los iconos de ojo
import './Login.css'; // Asegúrate de importar el CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

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
      navigate('/tasks'); // Redirige a la página de tareas
    } catch (err) {
      console.error(err);
      setError('Error de conexión al servidor');
    }
  };

  const goToRegister = () => {
    navigate('/register');
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
          <h1 className="opacity">INICIO SESIÓN</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-container" style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'} // Cambia entre 'text' y 'password'
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '60%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={() => setShowPassword(!showPassword)} // Cambia la visibilidad de la contraseña
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Muestra el icono dependiendo del estado */}
              </span>
            </div>
            <button type="submit" className="opacity">Iniciar sesión</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          <div className="register-forget opacity">
            <button type="button" onClick={goToRegister} className="link-button">
              REGISTRARSE
            </button>
          </div>
        </div>
        <div className="circle circle-two"></div>
      </div>
    </section>
  );
};

export default Login;
