import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdAiGradientBtn.js';

const meta: Meta = {
  title: 'Atoms/AiGradientBtn',
  component: 'specd-ai-gradient-btn',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { label: 'Fix with AI', disabled: false },
  render: (args) => html`<specd-ai-gradient-btn label=${args.label} ?disabled=${args.disabled}></specd-ai-gradient-btn>`,
};
