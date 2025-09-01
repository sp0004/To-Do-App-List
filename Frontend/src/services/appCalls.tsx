import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface ToDoDto {
  id: string;
  taskName: string;
  createdOn: string;
  dueDate: string;
  updatedOn: string;
  description: string;
  isOverdue: boolean;
  isComplete: boolean;
  isDeleted: boolean;
}

// Get all todos
export const fetchTodos = async () => {
  try {
    console.log('Fetching todos...');
    const res = await axios.get<ToDoDto[]>(`${API_BASE_URL}/ToDo`);
    console.log('Fetched todos:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Create a new todo
export const createTodo = async (todo: ToDoDto) => {
  try {
    console.log('Creating todo:', todo);
    const res = await axios.post<ToDoDto>(`${API_BASE_URL}/ToDo`, todo);
    console.log('Created todo:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Update a todo
export const updateTodo = async (id: string, todo: ToDoDto) => {
  try {
    console.log(`Updating todo ${id}:`, todo);
    const res = await axios.put<ToDoDto>(`${API_BASE_URL}/ToDo/${id}`, todo);
    console.log('Updated todo:', res.data);
    return res.data;
  } catch (error) {
    console.error(`Error updating todo ${id}:`, error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id: string) => {
  try {
    console.log(`Deleting todo ${id}`);
    const res = await axios.delete(`${API_BASE_URL}/ToDo/${id}`);
    console.log('Deleted todo:', res.data);
    return res.data;
  } catch (error) {
    console.error(`Error deleting todo ${id}:`, error);
    throw error;
  }
};

// Mark as complete
export const completeTodo = async (id: string) => {
   console.log(`Updating todo to complete ${id}`);
  const res = await axios.put<ToDoDto>(`${API_BASE_URL}/ToDo/${id}/complete`);
  return res.data;
};
