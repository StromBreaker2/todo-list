import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { ClipboardList } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch to-dos');
      }
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Could not load to-dos. Ensure the backend is running and connected to MongoDB.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTodoAdded = (newTodo) => {
    setTodos([newTodo, ...todos]);
  };

  const handleTodoUpdate = (updatedTodo) => {
    setTodos(todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo));
  };

  const handleTodoDelete = (todoId) => {
    setTodos(todos.filter(todo => todo._id !== todoId));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return todo.status === 'pending';
    if (filter === 'completed') return todo.status === 'completed';
    return true;
  });

  const totalCount = todos.length;
  const pendingCount = todos.filter(t => t.status === 'pending').length;
  const completedCount = todos.filter(t => t.status === 'completed').length;

  return (
    <div className="container">
      <header>
        <div className="header-icon">
          <ClipboardList size={32} color="white" />
        </div>
        <h1>To-Do List</h1>
        <p>Cloud-Based Task Manager</p>
      </header>

      {error && (
        <div className="error-message">
          <strong>Error: </strong> {error}
        </div>
      )}

      <TodoForm onTodoAdded={handleTodoAdded} />

      {!isLoading && todos.length > 0 && (
        <>
          <div className="stats-bar">
            <div className="stat-chip">
              <strong>{totalCount}</strong> Total
            </div>
            <div className="stat-chip">
              <strong>{pendingCount}</strong> Pending
            </div>
            <div className="stat-chip">
              <strong>{completedCount}</strong> Done
            </div>
          </div>

          <div className="filter-bar">
            <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
            <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
            <button className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
          </div>
        </>
      )}

      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <div className="loading-spinner"></div>
          <p style={{ color: 'var(--text-muted)' }}>Loading to-dos...</p>
        </div>
      ) : (
        <TodoList
          todos={filteredTodos}
          onTodoUpdate={handleTodoUpdate}
          onTodoDelete={handleTodoDelete}
        />
      )}
    </div>
  );
}

export default App;
