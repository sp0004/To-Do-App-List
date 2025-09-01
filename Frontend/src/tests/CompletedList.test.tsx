import { render, screen } from '@testing-library/react'
import CompletedList from '../components/CompletedList'

const todos = [
  {
    id: '1',
    taskName: 'Test Task',
    createdOn: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    updatedOn: new Date().toISOString(),
    description: 'desc',
    isOverdue: false,
    isComplete: true,
    isDeleted: false,
  },
  {
    id: '2',
    taskName: 'Overdue Task',
    createdOn: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    updatedOn: new Date().toISOString(),
    description: 'overdue',
    isOverdue: true,
    isComplete: true,
    isDeleted: false,
  },
]

test('renders CompletedList with heading and items', () => {
  render(<CompletedList todos={todos} loading={false} onChange={() => {}} />)
  expect(screen.getByText('Completed List')).toBeInTheDocument()
  expect(screen.getByText('Test Task')).toBeInTheDocument()
  expect(screen.getByText('Overdue Task')).toBeInTheDocument()
  // Overdue column should render Yes for overdue item
  expect(screen.getByText('Yes')).toBeInTheDocument()
})

