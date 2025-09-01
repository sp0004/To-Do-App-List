import { render, screen } from '@testing-library/react'
import TodoPage from '../pages/todoPage'
import * as appCalls from '../services/appCalls'
import { vi } from 'vitest'

const todos = [
  {
    id: '1',
    taskName: 'Test Task',
    createdOn: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    updatedOn: new Date().toISOString(),
    description: 'desc',
    isOverdue: false,
    isComplete: false,
    isDeleted: false,
  },
]

describe('TodoPage', () => {
  beforeEach(() => {
    vi.spyOn(appCalls, 'fetchTodos').mockResolvedValue(todos as any)
  })
  afterEach(() => vi.restoreAllMocks())

  test('renders page and fetches todos', async () => {
    render(<TodoPage />)
    expect(await screen.findByText('To-Do List')).toBeInTheDocument()
    expect(await screen.findByText('Test Task')).toBeInTheDocument()
  })
})
