
import React from 'react';
import { Table } from 'antd';
import { type ToDoDto } from '../services/appCalls';
import dayjs from 'dayjs';

interface CompletedListProps {
  todos: ToDoDto[];
  loading: boolean;
  onChange: () => void;
}

const columns = [
  {
    title: 'Task Name',
    dataIndex: 'taskName',
    key: 'taskName',
  },
  {
    title: 'When Completed',
    dataIndex: 'updatedOn',
    key: 'updatedOn',
    render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
  },
  {
    title: 'Overdue?',
    dataIndex: 'isOverdue',
    key: 'isOverdue',
    render: (isOverdue: boolean) => (isOverdue ? 'Yes' : 'No'),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

const CompletedList: React.FC<CompletedListProps> = ({ todos, loading }) => {
  return (
    <div>
      <h2>Completed List</h2>
      <Table columns={columns} dataSource={todos} rowKey="id" loading={loading} pagination={false} />
    </div>
  );
};

export default CompletedList;
