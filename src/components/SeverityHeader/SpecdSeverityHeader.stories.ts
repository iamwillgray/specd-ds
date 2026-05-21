import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdSeverityHeader';

const meta: Meta = {
  title: 'Components/SeverityHeader',
  component: 'specd-severity-header',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-severity-header
      intent=${args.intent ?? 'info'}
      label=${args.label ?? ''}
      count=${args.count ?? ''}
    ></specd-severity-header>
  `,
  argTypes: {
    intent: { control: 'select', options: ['critical', 'warning', 'info'] },
    label:  { control: 'text' },
    count:  { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const Critical: Story = { args: { intent: 'critical', label: 'Critical Issues', count: 3 } };
export const Warning: Story  = { args: { intent: 'warning', label: 'Warnings', count: 12 } };
export const Info: Story     = { args: { intent: 'info', label: 'Info', count: 7 } };
export const NoCount: Story  = { args: { intent: 'info', label: 'All Issues' } };
