import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdCheckboxGroup';

const meta: Meta = {
  title: 'Molecules/CheckboxGroup',
  component: 'specd-checkbox-group',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-checkbox-group
      options=${args.options ?? '[]'}
      values=${args.values ?? '[]'}
      ?inline=${args.inline}
    ></specd-checkbox-group>
  `,
  argTypes: {
    options: { control: 'text' },
    values:  { control: 'text' },
    inline:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

const OPTIONS = JSON.stringify([
  { value: 'colours', label: 'Hard-coded colours' },
  { value: 'spacing', label: 'Hard-coded spacing' },
  { value: 'text', label: 'Hard-coded text' },
]);

export const Vertical: Story = {
  args: {
    options: OPTIONS,
    values: '[]',
    inline: false,
  },
};

export const Inline: Story = {
  args: {
    options: OPTIONS,
    values: '[]',
    inline: true,
  },
};

export const PreChecked: Story = {
  args: {
    options: OPTIONS,
    values: JSON.stringify(['colours', 'text']),
    inline: false,
  },
};
