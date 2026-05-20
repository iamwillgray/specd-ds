import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './AdmiralBadge';

const meta: Meta = {
  title: 'Components/Badge',
  component: 'admiral-badge',
  tags: ['autodocs'],
  render: (args) => html`
    <admiral-badge
      value=${args.value ?? ''}
      intent=${args.intent ?? 'neutral'}
      ?dot=${args.dot}
      ?anchored=${args.anchored}
    ></admiral-badge>
  `,
  argTypes: {
    value:    { control: 'text' },
    intent:   { control: 'select', options: ['positive', 'negative', 'warning', 'neutral'] },
    dot:      { control: 'boolean' },
    anchored: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Neutral: Story  = { args: { value: '3', intent: 'neutral' } };
export const Positive: Story = { args: { value: '12', intent: 'positive' } };
export const Negative: Story = { args: { value: '5', intent: 'negative' } };
export const Warning: Story  = { args: { value: '2', intent: 'warning' } };
export const Dot: Story      = { args: { dot: true, intent: 'negative' } };

export const AllIntents: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;align-items:center;">
      <admiral-badge value="1" intent="positive"></admiral-badge>
      <admiral-badge value="2" intent="negative"></admiral-badge>
      <admiral-badge value="3" intent="warning"></admiral-badge>
      <admiral-badge value="4" intent="neutral"></admiral-badge>
      <admiral-badge dot intent="negative"></admiral-badge>
    </div>
  `,
};
