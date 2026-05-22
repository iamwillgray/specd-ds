import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdInteractiveTag.js';

const meta: Meta = {
  title: 'Atoms/InteractiveTag',
  component: 'specd-interactive-tag',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-interactive-tag
      variant=${args.variant ?? 'matched'}
      label=${args.label ?? 'Matched'}
    ></specd-interactive-tag>
  `,
  argTypes: {
    variant: { control: 'select', options: ['matched', 'missing', 'muted'] },
    label:   { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Matched: Story = { args: { variant: 'matched', label: 'Matched' } };
export const Missing: Story = { args: { variant: 'missing', label: 'Missing' } };
export const Muted: Story   = { args: { variant: 'muted',   label: '—' } };

export const AllVariants: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;align-items:center;padding:12px;">
      <specd-interactive-tag variant="matched" label="Matched"></specd-interactive-tag>
      <specd-interactive-tag variant="missing" label="Missing"></specd-interactive-tag>
      <specd-interactive-tag variant="muted"   label="—"></specd-interactive-tag>
    </div>
  `,
};
