import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'; // ajusta la ruta según tu estructura

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* otras rutas como dashboard */}
      </Routes>
    </Router>
  );
}

export default App;