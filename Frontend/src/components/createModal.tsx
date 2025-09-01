

import React from 'react';

import { Modal, Button, Form, Input, DatePicker, message } from 'antd';
import { usePopupContext } from '../contexts/popupContext';
import { createTodo } from '../services/appCalls';
import { useState } from 'react';
import dayjs from 'dayjs';

interface CreateModalProps {
  onCreated?: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ onCreated }) => {

  const { isOpen, setIsOpen } = usePopupContext();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      await createTodo({
        id: crypto.randomUUID(),
        taskName: values.taskName,
        dueDate: values.dueDate.format('YYYY-MM-DD'),
        description: values.reason,
        isComplete: false,
        isOverdue: false,
        isDeleted: false,
        createdOn: new Date().toISOString(),
        updatedOn: new Date().toISOString(),
      });
  setLoading(false);
  setIsOpen(false);
  form.resetFields();
  message.success('Task created successfully');
  if (onCreated) onCreated();
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) message.error(error.message);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Create Task
      </Button>
      <Modal
        title="Create Task"
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Add"
        cancelText="Cancel"
        confirmLoading={loading}
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
          <Form.Item label="Description" name="reason">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateModal;
