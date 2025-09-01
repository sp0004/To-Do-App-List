import { render, screen, fireEvent } from '@testing-library/react'
import PendingList from '../components/PendingList'
import * as appCalls from '../services/appCalls'
import { vi } from 'vitest'

// Mock EditModal so we don't rely on antd Modal behavior in these unit tests
vi.mock('../components/EditModal', () => ({
  default: (props: any) => (
    <div data-testid="edit-modal">{props.visible ? 'EDIT_OPEN' : 'EDIT_CLOSED'}</div>
  ),
}))

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

describe('PendingList', () => {
  beforeEach(() => {
    vi.spyOn(appCalls, 'deleteTodo').mockResolvedValue(undefined as any)
    vi.spyOn(appCalls, 'updateTodo').mockResolvedValue({} as any)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('renders heading and data', () => {
    render(<PendingList todos={todos} loading={false} onChange={() => {}} />)
    expect(screen.getByText('Pending List')).toBeInTheDocument()
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  test('opens edit modal when Update is clicked', () => {
    render(<PendingList todos={todos} loading={false} onChange={() => {}} />)
    const updateBtn = screen.getByText('Update')
    fireEvent.click(updateBtn)
    expect(screen.getByTestId('edit-modal')).toHaveTextContent('EDIT_OPEN')
  })

  test('shows Delete button for each row', () => {
    render(<PendingList todos={todos} loading={false} onChange={() => {}} />)
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })
})
