import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdInput';

const meta: Meta = {
  title: 'Atoms/Input',
  component: 'specd-input',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-input
      type=${args.type ?? 'text'}
      placeholder=${args.placeholder ?? ''}
      value=${args.value ?? ''}
      ?disabled=${args.disabled}
      ?search=${args.search}
    ></specd-input>
  `,
  argTypes: {
    type:        { control: 'select', options: ['text', 'number', 'password', 'url', 'email', 'date', 'search'] },
    placeholder: { control: 'text' },
    value:       { control: 'text' },
    disabled:    { control: 'boolean' },
    search:      { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story   = { args: { placeholder: 'Enter value…' } };
export const Search: Story    = { args: { placeholder: 'Search components…', search: true } };
export const Password: Story  = { args: { type: 'password', placeholder: 'Password' } };
export const Disabled: Story  = { args: { placeholder: 'Disabled', disabled: true } };
export const WithValue: Story = { args: { value: 'Specd DS', placeholder: 'Name' } };
