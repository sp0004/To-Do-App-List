
import React, { useEffect, useState } from 'react';
import CreateModal from '../components/createModal';
import PendingList from '../components/PendingList';
import CompletedList from '../components/CompletedList';
import { fetchTodos, type ToDoDto } from '../services/appCalls';
import { message } from 'antd';

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<ToDoDto[]>([]);
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    setLoading(true);
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (error) {
      message.error('Failed to fetch todos');
    }
    setLoading(false);
  };

  useEffect(() => {
    getTodos();
  }, []);

  
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f8f9fa',
      }}
    >
      <div style={{ maxWidth: 900, width: '100%', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <h1 style={{ textAlign: 'center' }}>To-Do List</h1>
        <CreateModal onCreated={getTodos} />
        <div style={{ marginTop: 32 }}>
          <PendingList todos={todos.filter(t => !t.isComplete && !t.isDeleted)} loading={loading} onChange={getTodos} />
        </div>
        <div style={{ marginTop: 32 }}>
          <CompletedList todos={todos.filter(t => t.isComplete && !t.isDeleted)} loading={loading} onChange={getTodos} />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
