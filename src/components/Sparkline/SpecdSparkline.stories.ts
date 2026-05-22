import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdSparkline';

const meta: Meta = {
  title: 'Molecules/Sparkline',
  component: 'specd-sparkline',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const RISING = JSON.stringify([45, 52, 48, 61, 58, 72, 69, 84, 87, 92]);
const FALLING = JSON.stringify([88, 82, 79, 71, 68, 59, 54, 47, 41, 38]);
const FLAT = JSON.stringify([60, 62, 59, 61, 63, 60, 62, 61, 59, 62]);

export const Positive: Story = {
  render: () => html`<specd-sparkline values=${RISING} intent="positive"></specd-sparkline>`,
};

export const Negative: Story = {
  render: () => html`<specd-sparkline values=${FALLING} intent="negative"></specd-sparkline>`,
};

export const Default: Story = {
  render: () => html`<specd-sparkline values=${FLAT}></specd-sparkline>`,
};

export const Large: Story = {
  render: () => html`<specd-sparkline values=${RISING} intent="positive" width="160" height="48"></specd-sparkline>`,
};
