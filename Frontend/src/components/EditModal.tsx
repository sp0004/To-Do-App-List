import React from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import { type ToDoDto, updateTodo } from '../services/appCalls';
import dayjs from 'dayjs';

interface EditModalProps {
  visible: boolean;
  onClose: () => void;
  todo: ToDoDto | null;
  onUpdated: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ visible, onClose, todo, onUpdated }) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (todo) {
      form.setFieldsValue({
        taskName: todo.taskName,
        dueDate: dayjs(todo.dueDate),
        reason: todo.description,
      });
    }
  }, [todo, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (todo) {
        await updateTodo(todo.id, {
          id: todo.id,
          taskName: values.taskName,
          dueDate: values.dueDate.format('YYYY-MM-DD'),
          description: values.reason,
          isOverdue: todo.isOverdue,
          isComplete: todo.isComplete,
          isDeleted: todo.isDeleted,
          createdOn: todo.createdOn,
          updatedOn: new Date().toISOString(),
        });
        onUpdated();
        onClose();
        form.resetFields();
      }
    } catch {
      // Validation failed
    }
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title="Edit Task"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Update"
      cancelText="Cancel"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Task Name"
          name="taskName"
          rules={[{ required: true, message: 'Please enter the task name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Due Date"
          name="dueDate"
          rules={[{ required: true, message: 'Please select a due date' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            format="YYYY-MM-DD"
            disabledDate={current => current && current.startOf('day') <= dayjs().startOf('day')}
          />
        </Form.Item>
        <Form.Item label="Reason" name="reason">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
