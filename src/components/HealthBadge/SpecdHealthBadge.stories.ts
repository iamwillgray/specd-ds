import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdHealthBadge';

const meta: Meta = {
  title: 'Atoms/HealthBadge',
  component: 'specd-health-badge',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-health-badge
      tier=${args.tier ?? 'good'}
      label=${args.label ?? ''}
    ></specd-health-badge>
  `,
  argTypes: {
    tier:  { control: 'select', options: ['good', 'med', 'poor'] },
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Good: Story = { args: { tier: 'good', label: 'Healthy' } };
export const Med: Story  = { args: { tier: 'med',  label: 'Needs attention' } };
export const Poor: Story = { args: { tier: 'poor', label: 'Needs work' } };

export const AllTiers: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;align-items:center;">
      <specd-health-badge tier="good" label="Healthy"></specd-health-badge>
      <specd-health-badge tier="med" label="Needs attention"></specd-health-badge>
      <specd-health-badge tier="poor" label="Needs work"></specd-health-badge>
    </div>
  `,
};
