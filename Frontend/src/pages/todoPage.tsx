
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
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 w-full p-4">
      <div className="max-w-4xl w-full p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">To-Do List</h1>
        <CreateModal onCreated={getTodos} />
        <div className="mt-8">
          <PendingList todos={todos.filter(t => !t.isComplete && !t.isDeleted)} loading={loading} onChange={getTodos} />
        </div>
        <div className="mt-8">
          <CompletedList todos={todos.filter(t => t.isComplete && !t.isDeleted)} loading={loading} onChange={getTodos} />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
