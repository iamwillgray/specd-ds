import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdFieldMessage.js';

const meta: Meta = {
  title: 'Atoms/FieldMessage',
  component: 'specd-field-message',
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['hint', 'error', 'success'] },
  },
};
export default meta;
type Story = StoryObj;

export const Hint: Story = {
  args: { type: 'hint', message: 'This field is required.' },
  render: (args) => html`<specd-field-message type=${args.type} message=${args.message}></specd-field-message>`,
};

export const Error: Story = {
  args: { type: 'error', message: 'Please enter a valid email address.' },
  render: (args) => html`<specd-field-message type=${args.type} message=${args.message}></specd-field-message>`,
};

export const Success: Story = {
  args: { type: 'success', message: 'Changes saved successfully.' },
  render: (args) => html`<specd-field-message type=${args.type} message=${args.message}></specd-field-message>`,
};
