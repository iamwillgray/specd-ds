import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdJumpBtn';

const meta: Meta = {
  title: 'Components/JumpBtn',
  component: 'specd-jump-btn',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-jump-btn label=${args.label ?? 'Jump to layer'}></specd-jump-btn>
  `,
  argTypes: {
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story     = { args: { label: 'Jump to layer' } };
export const ToComponent: Story = { args: { label: 'Jump to component' } };
