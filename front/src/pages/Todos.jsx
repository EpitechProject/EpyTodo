import { useEffect, useState } from 'react'
import API from '../api'

export default function Todos() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    API.get('/user/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      <h2>Mes Tâches</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <strong>{todo.title}</strong> — {todo.status}
          </li>
        ))}
      </ul>
    </div>
  )
}
