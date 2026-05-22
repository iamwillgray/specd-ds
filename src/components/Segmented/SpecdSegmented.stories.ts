import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdSegmented';

const meta: Meta = {
  title: 'Molecules/Segmented',
  component: 'specd-segmented',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-segmented
      options=${args.options ?? '[]'}
      value=${args.value ?? ''}
    ></specd-segmented>
  `,
  argTypes: {
    options: { control: 'text' },
    value:   { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const TwoOptions: Story = {
  args: {
    options: JSON.stringify([
      { value: 'coverage', label: 'Coverage' },
      { value: 'rules', label: 'Rules' },
    ]),
    value: 'coverage',
  },
};

export const ThreeOptions: Story = {
  args: {
    options: JSON.stringify([
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
    ]),
    value: 'week',
  },
};

export const ViewToggle: Story = {
  args: {
    options: JSON.stringify([
      { value: 'grid', label: 'Grid' },
      { value: 'list', label: 'List' },
      { value: 'table', label: 'Table' },
    ]),
    value: 'list',
  },
};

export const Dark: Story = {
  name: 'Dark variant',
  render: () => html`
    <div style="padding:16px;background:var(--navy,#0C1750);border-radius:8px;display:inline-flex;">
      <specd-segmented
        dark
        options='[{"value":"overview","label":"Overview"},{"value":"issues","label":"Issues"},{"value":"components","label":"Components"}]'
        value="overview"
      ></specd-segmented>
    </div>
  `,
};
