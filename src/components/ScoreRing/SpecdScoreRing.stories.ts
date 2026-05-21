import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdScoreRing';

const meta: Meta = {
  title: 'Components/ScoreRing',
  component: 'specd-score-ring',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-score-ring
      score=${args.score ?? 0}
      tier=${args.tier ?? 'good'}
      size=${args.size ?? 104}
    ></specd-score-ring>
  `,
  argTypes: {
    score: { control: 'number' },
    tier:  { control: 'select', options: ['excellent', 'good', 'med', 'poor'] },
    size:  { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const Excellent: Story = { args: { score: 92, tier: 'excellent' } };
export const Good: Story      = { args: { score: 74, tier: 'good' } };
export const Med: Story       = { args: { score: 51, tier: 'med' } };
export const Poor: Story      = { args: { score: 28, tier: 'poor' } };
export const Large: Story     = { args: { score: 87, tier: 'good', size: 140 } };
export const Small: Story     = { args: { score: 65, tier: 'med', size: 72 } };
