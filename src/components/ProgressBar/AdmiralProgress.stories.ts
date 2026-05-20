import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './AdmiralProgress';

const meta: Meta = {
  title: 'Components/ProgressBar',
  component: 'admiral-progress',
  tags: ['autodocs'],
  render: (args) => html`
    <admiral-progress
      value=${args.value ?? nothing}
      intent=${args.intent ?? nothing}
      height=${args.height ?? 8}
      aria-label=${args.ariaLabel ?? ''}
    ></admiral-progress>
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nothing = undefined as any;

export const Default: Story      = { args: { value: 65 } };
export const Positive: Story     = { args: { value: 80, intent: 'positive' } };
export const Warning: Story      = { args: { value: 45, intent: 'warning' } };
export const Negative: Story     = { args: { value: 20, intent: 'negative' } };
export const Indeterminate: Story = { args: {} };
export const Thin: Story         = { args: { value: 60, height: 4 } };

export const AllIntents: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:8px;max-width:320px;">
      <admiral-progress value="80" intent="positive" aria-label="Positive"></admiral-progress>
      <admiral-progress value="50" intent="warning"  aria-label="Warning"></admiral-progress>
      <admiral-progress value="20" intent="negative" aria-label="Negative"></admiral-progress>
      <admiral-progress value="60" aria-label="Default"></admiral-progress>
    </div>
  `,
};
