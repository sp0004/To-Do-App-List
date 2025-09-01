



import React, { useState } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import { deleteTodo, updateTodo, type ToDoDto } from '../services/appCalls';
import EditModal from './EditModal';
import dayjs from 'dayjs';

interface PendingListProps {
  todos: ToDoDto[];
  loading: boolean;
  onChange: () => void;
}

const PendingList: React.FC<PendingListProps> = ({ todos, loading, onChange }) => {
  const [editing, setEditing] = useState<ToDoDto | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      message.success('Task deleted');
      onChange();
    } catch {
      message.error('Failed to delete task');
    }
  };

  const handleComplete = async (id: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) {
        message.error('Task not found');
        return;
      }
      if (todo) {
        await updateTodo(todo.id, {
          id: todo.id,
          taskName: todo.taskName,
          dueDate: todo.dueDate,
          description: todo.description,
          isOverdue: todo.isOverdue,
          isComplete: true,
          isDeleted: todo.isDeleted,
          createdOn: todo.createdOn,
          updatedOn: new Date().toISOString(),
        });
      }
      message.success('Task marked as complete');
      onChange();
    } catch {
      message.error('Failed to complete task');
    }
  };

  const columns = [
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      key: 'taskName',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Created Date',
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Update',
      key: 'update',
      render: (_: any, record: ToDoDto) => (
        <Button type="link" onClick={() => setEditing(record)}>Update</Button>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (_: any, record: ToDoDto) => (
        <Popconfirm title="Delete this task?" onConfirm={() => handleDelete(record.id)}>
          <Button type="link" danger>Delete</Button>
        </Popconfirm>
      ),
    },
    {
      title: 'Complete',
      key: 'complete',
      render: (_: any, record: ToDoDto) => (
        <Button type="link" onClick={() => handleComplete(record.id)}>Complete</Button>
      ),
    },
  ];


  return (
    <div>
      <h2>Pending List</h2>
      <Table
        columns={columns}
        dataSource={todos}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
      <EditModal
        visible={!!editing}
        todo={editing}
        onClose={() => setEditing(null)}
        onUpdated={onChange}
      />
    </div>
  );
};

export default PendingList;
