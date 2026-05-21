import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdToggleRow';

const meta: Meta = {
  title: 'Components/ToggleRow',
  component: 'specd-toggle-row',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-toggle-row
      label=${args.label ?? ''}
      hint=${args.hint ?? ''}
      ?checked=${args.checked}
    ></specd-toggle-row>
  `,
  argTypes: {
    label:   { control: 'text' },
    hint:    { control: 'text' },
    checked: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Unchecked: Story = {
  args: { label: 'Ignore hidden layers', checked: false },
};

export const Checked: Story = {
  args: { label: 'Ignore hidden layers', checked: true },
};

export const WithHint: Story = {
  args: {
    label: 'Ignore hidden layers',
    hint: 'Skip layers with visibility set to hidden',
    checked: false,
  },
};
