import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdButton';

const meta: Meta = {
  title: 'Atoms/Button',
  component: 'specd-button',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-button
      variant=${args.variant ?? 'primary'}
      size=${args.size ?? 'md'}
      label=${args.label ?? 'Button'}
      ?full=${args.full}
      ?disabled=${args.disabled}
      ?loading=${args.loading}
    ></specd-button>
  `,
  argTypes: {
    variant:  { control: 'select', options: ['primary', 'ghost', 'accent', 'danger', 'sb-good', 'sb-bad', 'sb-muted', 'ai-gradient', 'pulse'] },
    size:     { control: 'select', options: ['sm', 'md', 'lg'] },
    label:    { control: 'text' },
    full:     { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Primary: Story   = { args: { variant: 'primary', label: 'Scan now' } };
export const Ghost: Story     = { args: { variant: 'ghost',   label: 'Cancel' } };
export const Accent: Story    = { args: { variant: 'accent',  label: 'Export' } };
export const Danger: Story    = { args: { variant: 'danger',  label: 'Delete component' } };
export const Small: Story     = { args: { variant: 'primary', label: 'Small',  size: 'sm' } };
export const Large: Story     = { args: { variant: 'primary', label: 'Large',  size: 'lg' } };
export const Disabled: Story  = { args: { variant: 'primary', label: 'Disabled', disabled: true } };
export const Loading: Story   = { args: { variant: 'primary', label: 'Scanning…',  loading: true } };
export const FullWidth: Story = { args: { variant: 'primary', label: 'Full width',  full: true } };

export const SbVariants: Story = {
  name: 'SB Match variants',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;align-items:center;">
      <specd-button variant="sb-good"  label="Matched"></specd-button>
      <specd-button variant="sb-bad"   label="Missing"></specd-button>
      <specd-button variant="sb-muted" label="—"></specd-button>
    </div>
  `,
};

export const Pulse: Story = { args: { variant: 'pulse', label: 'Fix with AI' } };

export const AiGradient: Story = {
  name: 'AI Gradient',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;">
      <specd-button variant="ai-gradient" label="Fix with AI"></specd-button>
      <specd-button variant="ai-gradient" label="Generating…" disabled></specd-button>
    </div>
  `,
};

export const ActionVariants: Story = {
  name: 'Action Variants (rounded square)',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;padding:16px;max-width:300px;">
      <specd-button variant="row-primary" label="Add doc link"></specd-button>
      <specd-button variant="row-primary-ghost" label="View in Quick Fix"></specd-button>
      <specd-button variant="row-applied" label="Applied"></specd-button>
      <specd-button variant="edit-pill" label="Edit"></specd-button>
      <specd-button variant="save-pill" label="Save"></specd-button>
      <specd-button variant="cancel-pill" label="Cancel"></specd-button>
    </div>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
      <specd-button variant="primary" label="Primary"></specd-button>
      <specd-button variant="ghost"   label="Ghost"></specd-button>
      <specd-button variant="accent"  label="Accent"></specd-button>
      <specd-button variant="danger"  label="Danger"></specd-button>
      <specd-button variant="pulse"   label="Fix with AI"></specd-button>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px;">
      <specd-button variant="primary" size="sm" label="Small"></specd-button>
      <specd-button variant="primary" size="md" label="Medium"></specd-button>
      <specd-button variant="primary" size="lg" label="Large"></specd-button>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px;">
      <specd-button variant="primary" label="Disabled" disabled></specd-button>
      <specd-button variant="primary" label="Loading…"  loading></specd-button>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px;">
      <specd-button variant="row-primary"       label="Add doc link"></specd-button>
      <specd-button variant="row-primary-ghost" label="View in Quick Fix"></specd-button>
      <specd-button variant="row-applied"       label="Applied"></specd-button>
      <specd-button variant="edit-pill"         label="Edit"></specd-button>
      <specd-button variant="save-pill"         label="Save"></specd-button>
      <specd-button variant="cancel-pill"       label="Cancel"></specd-button>
    </div>
  `,
};

export const WithBadge: Story = {
  name: 'With trailing badge',
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;align-items:center;flex-wrap:wrap;">
      <specd-button variant="primary" label="View fixes" badge="3"></specd-button>
      <specd-button variant="ghost" label="Issues" badge="12"></specd-button>
      <specd-button variant="accent" label="Alerts" badge="!"></specd-button>
    </div>
  `,
};
