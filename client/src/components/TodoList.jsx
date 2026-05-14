import React, { useState } from 'react';
import { Trash2, CheckCircle2, Circle, Clock, Pencil, X, Save } from 'lucide-react';

const TodoList = ({ todos, onTodoUpdate, onTodoDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPriority, setEditPriority] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleStatus = async (todo) => {
    const newStatus = todo.status === 'completed' ? 'pending' : 'completed';
    try {
      const response = await fetch(`/api/todos/${todo._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      const updatedTodo = await response.json();
      onTodoUpdate(updatedTodo);
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update to-do status.');
    }
  };

  const handleEditClick = (todo) => {
    setEditingId(todo._id);
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setEditPriority(todo.priority || 'medium');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
    setEditDescription('');
    setEditPriority('medium');
  };

  const handleSaveEdit = async (todoId) => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, description: editDescription, priority: editPriority }),
      });
      if (!response.ok) throw new Error('Failed to update to-do');
      const updatedTodo = await response.json();
      onTodoUpdate(updatedTodo);
      setEditingId(null);
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update to-do.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (todoId) => {
    if (!window.confirm('Delete this to-do?')) return;
    try {
      const response = await fetch(`/api/todos/${todoId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete to-do');
      onTodoDelete(todoId);
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete to-do.');
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getPriorityLabel = (priority) => {
    return priority ? priority.charAt(0).toUpperCase() + priority.slice(1) : 'Medium';
  };

  if (todos.length === 0) {
    return (
      <div className="card empty-state">
        <Circle size={48} />
        <h2>No to-dos here</h2>
        <p>Add a new item above to get started.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => {
        const isEditing = editingId === todo._id;

        return (
          <div key={todo._id} className={`card todo-item ${todo.status === 'completed' ? 'completed' : ''}`}>
            <div className="todo-content">
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="To-Do Title"
                    disabled={isSubmitting}
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Description"
                    disabled={isSubmitting}
                  />
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    disabled={isSubmitting}
                    style={{ maxWidth: '140px' }}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSaveEdit(todo._id)}
                      disabled={isSubmitting}
                      style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
                    >
                      <Save size={15} /> Save
                    </button>
                    <button
                      className="btn"
                      onClick={handleCancelEdit}
                      disabled={isSubmitting}
                      style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', background: 'transparent', border: '1px solid var(--surface-border)', color: 'var(--text-muted)', cursor: 'pointer' }}
                    >
                      <X size={15} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="todo-title">
                    {todo.status === 'completed' ? (
                      <CheckCircle2 size={18} color="var(--success)" />
                    ) : (
                      <Circle size={18} color="var(--primary)" />
                    )}
                    {todo.title}
                  </h3>
                  {todo.description && <p className="todo-desc">{todo.description}</p>}
                  <div className="todo-meta">
                    <span className={`badge badge-${todo.status}`}>
                      {todo.status === 'completed' ? 'Done' : 'Pending'}
                    </span>
                    <span className={`badge badge-${todo.priority || 'medium'}`}>
                      {getPriorityLabel(todo.priority)}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                      <Clock size={11} /> {formatDate(todo.createdAt)}
                    </span>
                  </div>
                </>
              )}
            </div>

            {!isEditing && (
              <div className="todo-actions">
                <button
                  className={`btn-icon ${todo.status === 'completed' ? 'btn-success' : ''}`}
                  onClick={() => handleToggleStatus(todo)}
                  title={todo.status === 'completed' ? 'Mark pending' : 'Mark done'}
                >
                  <CheckCircle2 size={18} />
                </button>
                <button
                  className="btn-icon"
                  onClick={() => handleEditClick(todo)}
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="btn-icon btn-danger"
                  onClick={() => handleDelete(todo._id)}
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
