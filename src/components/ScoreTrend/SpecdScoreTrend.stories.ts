import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdScoreTrend';

const meta: Meta = {
  title: 'Molecules/ScoreTrend',
  component: 'specd-score-trend',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-score-trend
      delta=${args.delta ?? ''}
      direction=${args.direction ?? 'flat'}
      meta=${args.meta ?? ''}
    ></specd-score-trend>
  `,
  argTypes: {
    delta:     { control: 'text' },
    direction: { control: 'select', options: ['up', 'down', 'flat'] },
    meta:      { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Up: Story     = { args: { delta: '+4.2', direction: 'up', meta: 'vs last scan' } };
export const Down: Story   = { args: { delta: '-1.8', direction: 'down', meta: 'vs last week' } };
export const Flat: Story   = { args: { delta: '±0', direction: 'flat', meta: 'no change' } };
export const NoMeta: Story = { args: { delta: '+2.1', direction: 'up' } };
