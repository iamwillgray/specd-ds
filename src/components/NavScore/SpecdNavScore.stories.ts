import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdNavScore';

const meta: Meta = {
  title: 'Atoms/NavScore',
  component: 'specd-nav-score',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-nav-score score=${args.score ?? ''}></specd-nav-score>
  `,
  argTypes: {
    score: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = { args: { score: '87' } };
export const Low: Story    = { args: { score: '42' } };
export const Perfect: Story = { args: { score: '100' } };
