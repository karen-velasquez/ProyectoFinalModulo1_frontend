import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import TaskList from './pages/TaskList/TaskList';
import ProtectedLayout from './layouts/ProtectedLayout';

import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedLayout />}>
          <Route path="/tasks" element={<TaskList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
