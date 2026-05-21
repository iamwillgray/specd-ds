import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdSkeleton';

const meta: Meta = {
  title: 'Components/Skeleton',
  component: 'specd-skeleton',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['text', 'rect', 'circle'] },
    width:   { control: 'text' },
    height:  { control: 'text' },
    lines:   { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const Text: Story = {
  render: () => html`<specd-skeleton variant="text"></specd-skeleton>`,
};

export const TextMultiLine: Story = {
  render: () => html`<specd-skeleton variant="text" .lines=${3}></specd-skeleton>`,
};

export const Rect: Story = {
  render: () => html`<specd-skeleton variant="rect" width="200px" height="120px"></specd-skeleton>`,
};

export const Circle: Story = {
  render: () => html`<specd-skeleton variant="circle" width="48px"></specd-skeleton>`,
};

export const Card: Story = {
  render: () => html`
    <div style="display:flex;gap:12px;align-items:center;">
      <specd-skeleton variant="circle" width="40px"></specd-skeleton>
      <div style="flex:1">
        <specd-skeleton variant="text" .lines=${2}></specd-skeleton>
      </div>
    </div>
  `,
};
