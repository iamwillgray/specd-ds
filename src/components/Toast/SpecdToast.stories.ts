import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdToast';

const meta: Meta = {
  title: 'Components/Toast',
  component: 'specd-toast',
  tags: ['autodocs'],
  argTypes: {
    title:       { control: 'text' },
    description: { control: 'text' },
    intent:      { control: 'select', options: ['default', 'positive', 'warning', 'negative'] },
    duration:    { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<specd-toast title="Notification" .duration=${0}></specd-toast>`,
};

export const Positive: Story = {
  render: () => html`<specd-toast intent="positive" title="Success!" description="Changes saved" .duration=${0}></specd-toast>`,
};

export const Warning: Story = {
  render: () => html`<specd-toast intent="warning" title="Warning" description="Check your input" .duration=${0}></specd-toast>`,
};

export const Negative: Story = {
  render: () => html`<specd-toast intent="negative" title="Error" description="Something went wrong" .duration=${0}></specd-toast>`,
};

export const Persistent: Story = {
  render: () => html`<specd-toast title="Persistent Toast" description="This won't auto-dismiss" .duration=${0}></specd-toast>`,
};
