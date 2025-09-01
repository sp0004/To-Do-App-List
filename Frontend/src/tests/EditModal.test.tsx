import { render, screen } from '@testing-library/react'
import EditModal from '../components/EditModal'

import { fireEvent } from '@testing-library/react'
import dayjs from 'dayjs'

const todo = {
  id: '1',
  taskName: 'Test Task',
  createdOn: new Date().toISOString(),
  dueDate: new Date().toISOString(),
  updatedOn: new Date().toISOString(),
  description: 'desc',
  isOverdue: false,
  isComplete: false,
  isDeleted: false,
}

describe('EditModal', () => {
  test('renders when visible and pre-fills fields', async () => {
    render(<EditModal visible={true} todo={todo as any} onClose={() => {}} onUpdated={() => {}} />)
    expect(await screen.findByText('Edit Task')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test Task')).toBeInTheDocument()
  })

  test('due date picker disables today and past dates', async () => {
    render(<EditModal visible={true} todo={todo as any} onClose={() => {}} onUpdated={() => {}} />)
    // Open the date picker
    const dateInput = screen.getByLabelText('Due Date') || screen.getByPlaceholderText('Select date')
    fireEvent.mouseDown(dateInput)
   
    // The antd DatePicker renders days as buttons with aria-labels or text
    // Check today and past are disabled
    expect(document.querySelector('.ant-picker-cell-today.ant-picker-cell-disabled')).toBeInTheDocument()
    // Find a cell for a future date (e.g., today + 1)
    const future = dayjs().add(1, 'day').date()
    const futureCell = Array.from(document.querySelectorAll('.ant-picker-cell')).find(cell => cell.textContent === future.toString())
    expect(futureCell?.className).not.toContain('ant-picker-cell-disabled')
  })
})
