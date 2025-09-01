import { render, screen, fireEvent } from '@testing-library/react'
import CreateModal from '../components/createModal'
import { PopupProvider } from '../contexts/popupContext'
import * as appCalls from '../services/appCalls'
import { vi } from 'vitest'

import dayjs from 'dayjs'

describe('CreateModal', () => {
  beforeEach(() => {
    vi.spyOn(appCalls, 'createTodo').mockResolvedValue({} as any)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('renders create button and opens modal', async () => {
    render(
      <PopupProvider>
        <CreateModal />
      </PopupProvider>
    )

    const createBtn = screen.getByText('Create Task')
    expect(createBtn).toBeInTheDocument()
    fireEvent.click(createBtn)
    // Modal title should appear
    expect(await screen.findByText('Create Task')).toBeInTheDocument()
  })

  test('due date picker disables today and past dates', async () => {
    render(
      <PopupProvider>
        <CreateModal />
      </PopupProvider>
    )
    const createBtn = screen.getByText('Create Task')
    fireEvent.click(createBtn)
    // Open the date picker
    const dateInput = screen.getByLabelText('Due Date') || screen.getByPlaceholderText('Select date')
    fireEvent.mouseDown(dateInput)
    // Check today and past are disabled
    expect(document.querySelector('.ant-picker-cell-today.ant-picker-cell-disabled')).toBeInTheDocument()
    // Find a cell for a future date (e.g., today + 1)
    const future = dayjs().add(1, 'day').date()
    const futureCell = Array.from(document.querySelectorAll('.ant-picker-cell')).find(cell => cell.textContent === future.toString())
    expect(futureCell?.className).not.toContain('ant-picker-cell-disabled')
  })
})
