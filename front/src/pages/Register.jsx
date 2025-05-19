import { useState } from 'react';
import API, { setToken } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register({ onLogin }) {  // Ajout du prop onLogin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/register', {
        email, password, firstname, name
      });
      const token = res.data.token;
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', token);
      }
      
      setToken(token);
      
      // Appeler onLogin pour mettre à jour l'état isLogged dans App.jsx
      if (onLogin) onLogin();
      
      navigate('/todos');
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      alert(err.response?.data?.msg || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Créer un compte</h2>
      <input
        value={firstname}
        onChange={e => setFirstname(e.target.value)}
        placeholder="Prénom"
        required
      />
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nom"
        required
      />
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Mot de passe"
        required
      />
      <button type="submit">Créer un compte</button>
      <Link to="/">Déjà un compte? Se connecter</Link>
    </form>
  );
}
