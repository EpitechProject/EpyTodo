import { useState } from 'react'
import API, { setToken } from '../api'
import { useNavigate, Link } from 'react-router-dom'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/login', { email, password })
      const token = res.data.token
      localStorage.setItem('token', token)
      setToken(token)
      onLogin()
      navigate('/todos')
    } catch (err) {
      alert(err.response?.data?.msg || 'Erreur')
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Connexion</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button type="submit">Connexion</button>
      <Link to="/register">Créer un compte</Link>
    </form>
  )
}
