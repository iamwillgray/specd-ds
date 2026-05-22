import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdHealthTag.js';

const meta: Meta = {
  title: 'Atoms/HealthTag',
  component: 'specd-health-tag',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-health-tag
      tier=${args.tier ?? 'good'}
      label=${args.label ?? ''}
      size=${args.size ?? 'md'}
    ></specd-health-tag>
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
      <specd-health-tag tier="good" label="Healthy"></specd-health-tag>
      <specd-health-tag tier="med" label="Needs attention"></specd-health-tag>
      <specd-health-tag tier="poor" label="Needs work"></specd-health-tag>
    </div>
  `,
};

export const SmSize: Story = {
  name: 'sm — Score pill',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;align-items:center;">
      <specd-health-tag size="sm" tier="good" label="87"></specd-health-tag>
      <specd-health-tag size="sm" tier="med"  label="61"></specd-health-tag>
      <specd-health-tag size="sm" tier="poor" label="34"></specd-health-tag>
    </div>
  `,
};

export const MdSize: Story = {
  name: 'md — Label badge',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;align-items:center;">
      <specd-health-tag size="md" tier="good" label="Healthy"></specd-health-tag>
      <specd-health-tag size="md" tier="med"  label="At Risk"></specd-health-tag>
      <specd-health-tag size="md" tier="poor" label="Critical"></specd-health-tag>
    </div>
  `,
};

export const AllVariants: Story = {
  name: 'All tier × size',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;padding:16px;">
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="font:10px var(--font-mono);color:var(--text-muted);width:24px">sm</span>
        <specd-health-tag size="sm" tier="good" label="87"></specd-health-tag>
        <specd-health-tag size="sm" tier="med"  label="61"></specd-health-tag>
        <specd-health-tag size="sm" tier="poor" label="34"></specd-health-tag>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <span style="font:10px var(--font-mono);color:var(--text-muted);width:24px">md</span>
        <specd-health-tag size="md" tier="good" label="Healthy"></specd-health-tag>
        <specd-health-tag size="md" tier="med"  label="At Risk"></specd-health-tag>
        <specd-health-tag size="md" tier="poor" label="Critical"></specd-health-tag>
      </div>
    </div>
  `,
};
