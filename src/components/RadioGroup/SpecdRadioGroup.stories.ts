import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdRadioGroup';

const meta: Meta = {
  title: 'Components/RadioGroup',
  component: 'specd-radio-group',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-radio-group
      options=${args.options ?? '[]'}
      value=${args.value ?? ''}
      name=${args.name ?? 'radio-group'}
      ?inline=${args.inline}
    ></specd-radio-group>
  `,
  argTypes: {
    options: { control: 'text' },
    value:   { control: 'text' },
    name:    { control: 'text' },
    inline:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Vertical: Story = {
  args: {
    options: JSON.stringify([
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
    ]),
    value: 'day',
    name: 'period',
    inline: false,
  },
};

export const Inline: Story = {
  args: {
    options: JSON.stringify([
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
    ]),
    value: 'week',
    name: 'period-inline',
    inline: true,
  },
};

export const WithHints: Story = {
  args: {
    options: JSON.stringify([
      { value: 'severity', label: 'By Severity', hint: 'Group issues into critical, warning, and info sections' },
      { value: 'component', label: 'By Component', hint: 'One card per component with all its issues' },
    ]),
    value: 'severity',
    name: 'view-mode',
    inline: false,
  },
};
