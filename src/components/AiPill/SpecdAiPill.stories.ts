import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdAiPill';

const meta: Meta = {
  title: 'Components/AiPill',
  component: 'specd-ai-pill',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-ai-pill label=${args.label ?? 'Fix with AI'}></specd-ai-pill>
  `,
  argTypes: {
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story  = { args: { label: 'Fix with AI' } };
export const AutoFix: Story  = { args: { label: 'Auto-fix' } };
export const Suggest: Story  = { args: { label: 'Suggest fix' } };
