import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdSbPill';

const meta: Meta = {
  title: 'Components/SbPill',
  component: 'specd-sb-pill',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-sb-pill
      intent=${args.intent ?? 'muted'}
      label=${args.label ?? ''}
    ></specd-sb-pill>
  `,
  argTypes: {
    intent: { control: 'select', options: ['good', 'bad', 'muted'] },
    label:  { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Good: Story  = { args: { intent: 'good',  label: 'Matched' } };
export const Bad: Story   = { args: { intent: 'bad',   label: 'Missing' } };
export const Muted: Story = { args: { intent: 'muted', label: 'Unknown' } };

export const AllIntents: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;align-items:center;">
      <specd-sb-pill intent="good" label="Matched"></specd-sb-pill>
      <specd-sb-pill intent="bad" label="Missing"></specd-sb-pill>
      <specd-sb-pill intent="muted" label="Unknown"></specd-sb-pill>
    </div>
  `,
};
