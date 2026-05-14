import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TodoForm = ({ onTodoAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, priority }),
      });

      if (!response.ok) {
        throw new Error('Failed to create to-do');
      }

      const newTodo = await response.json();
      onTodoAdded(newTodo);
      setTitle('');
      setDescription('');
      setPriority('medium');
    } catch (error) {
      console.error('Error creating todo:', error);
      alert('Failed to create to-do. Make sure the server is running and MongoDB is connected.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">What needs to be done?</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a to-do item..."
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="description">Details (optional)</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a short note..."
              disabled={isSubmitting}
            />
          </div>
          <div className="form-group" style={{ maxWidth: '140px' }}>
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              disabled={isSubmitting}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting || !title.trim()}>
          <Plus size={18} />
          {isSubmitting ? 'Adding...' : 'Add To-Do'}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
