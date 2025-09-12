
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
    <div style={{ maxWidth: 900, padding: 24 ,justifyContent: 'center', alignItems: 'center'}} >
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
