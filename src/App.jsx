import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'make love with Amelie', completed: false },
    { id: 2, text: 'eat', completed: false },
    { id: 3, text: 'again make love with Amelie', completed: false },
  ])
  const [input, setInput] = useState('')

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: input,
        completed: false
      }])
      setInput('')
    }
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">My tasks for Sunday</h1>
        
        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="add new task..."
            className="task-input"
          />
          <button onClick={addTask} className="add-button">
            <span className="plus-icon">+</span>
          </button>
        </div>

        <div className="tasks-list">
          {tasks.length === 0 ? (
            <p className="empty-message">Нет задач. Добавьте первую!</p>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="task-checkbox"
                />
                <span className="task-text">{task.text}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-button"
                >
                  <span className="trash-icon">🗑️</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
