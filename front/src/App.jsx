import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Todos from './pages/Todos'
import { useState, useEffect } from 'react'
import API, { setToken } from './api'

function App() {
  const [isLogged, setIsLogged] = useState(false)
  const navigate = useNavigate()

  // Vérifier le token au chargement
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken(token) // Important: définir le token dans les headers d'API
      setIsLogged(true)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    setIsLogged(false)
    navigate('/')
  }

  return (
    <div>
      <h1>EpyTodo</h1>
      {isLogged && <button onClick={logout}>Logout</button>}
      <Routes>
        <Route path="/" element={<Login onLogin={() => setIsLogged(true)} />} />
        <Route path="/register" element={<Register onLogin={() => setIsLogged(true)} />} />
        <Route path="/todos" element={
          isLogged ? <Todos /> : <Login onLogin={() => setIsLogged(true)} />
        } />
      </Routes>
    </div>
  )
}

export default App