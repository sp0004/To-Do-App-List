
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

  // Pass getTodos to children so they can refresh after create/update/delete
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1>To-Do List</h1>
      <CreateModal onCreated={getTodos} />
      <div style={{ marginTop: 32 }}>
        <PendingList todos={todos.filter(t => !t.isComplete && !t.isDeleted)} loading={loading} onChange={getTodos} />
      </div>
      <div style={{ marginTop: 32 }}>
        <CompletedList todos={todos.filter(t => t.isComplete && !t.isDeleted)} loading={loading} onChange={getTodos} />
      </div>
    </div>
  );
};

export default TodoPage;
