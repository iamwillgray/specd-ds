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
      size=${args.size ?? 'md'}
    ></specd-health-badge>
  `,
  argTypes: {
    tier:  { control: 'select', options: ['good', 'med', 'poor'] },
    label: { control: 'text' },
    size:  { control: 'select', options: ['md', 'sm'] },
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

export const SmSize: Story = {
  name: 'sm — Score pill (replaces NavScore)',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;align-items:center;">
      <specd-health-badge size="sm" tier="good" label="87"></specd-health-badge>
      <specd-health-badge size="sm" tier="med"  label="61"></specd-health-badge>
      <specd-health-badge size="sm" tier="poor" label="34"></specd-health-badge>
    </div>
  `,
};

export const MdSize: Story = {
  name: 'md — Label badge',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;align-items:center;">
      <specd-health-badge size="md" tier="good" label="Healthy"></specd-health-badge>
      <specd-health-badge size="md" tier="med"  label="At Risk"></specd-health-badge>
      <specd-health-badge size="md" tier="poor" label="Critical"></specd-health-badge>
    </div>
  `,
};

export const AllVariants: Story = {
  name: 'All tier × size',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;padding:16px;">
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="font:10px var(--font-mono);color:var(--text-muted);width:24px">sm</span>
        <specd-health-badge size="sm" tier="good" label="87"></specd-health-badge>
        <specd-health-badge size="sm" tier="med"  label="61"></specd-health-badge>
        <specd-health-badge size="sm" tier="poor" label="34"></specd-health-badge>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="font:10px var(--font-mono);color:var(--text-muted);width:24px">md</span>
        <specd-health-badge size="md" tier="good" label="Healthy"></specd-health-badge>
        <specd-health-badge size="md" tier="med"  label="At Risk"></specd-health-badge>
        <specd-health-badge size="md" tier="poor" label="Critical"></specd-health-badge>
      </div>
    </div>
  `,
};
