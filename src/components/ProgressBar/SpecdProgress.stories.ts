import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdProgress.js';

const meta: Meta = {
  title: 'Atoms/ProgressBar',
  component: 'specd-progress',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-progress
      .value=${args.value}
      intent=${args.intent ?? ''}
      height=${args.height ?? 8}
      aria-label=${args.ariaLabel ?? ''}
    ></specd-progress>
  `,
  argTypes: {
    value:     { control: { type: 'range', min: 0, max: 100, step: 1 } },
    intent:    { control: 'select', options: ['', 'positive', 'warning', 'negative'] },
    height:    { control: 'number' },
    ariaLabel: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story      = { args: { value: 65 } };
export const Positive: Story     = { args: { value: 80, intent: 'positive' } };
export const Warning: Story      = { args: { value: 45, intent: 'warning' } };
export const Negative: Story     = { args: { value: 20, intent: 'negative' } };
export const Indeterminate: Story = { args: {} };
export const Thin: Story         = { args: { value: 60, height: 4 } };

export const AllIntents: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:8px;max-width:320px;">
      <specd-progress value="80" intent="positive" aria-label="Positive"></specd-progress>
      <specd-progress value="50" intent="warning"  aria-label="Warning"></specd-progress>
      <specd-progress value="20" intent="negative" aria-label="Negative"></specd-progress>
      <specd-progress value="60" aria-label="Default"></specd-progress>
    </div>
  `,
};
