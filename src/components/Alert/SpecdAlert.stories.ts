import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdAlert';

const meta: Meta = {
  title: 'Components/Alert',
  component: 'specd-alert',
  tags: ['autodocs'],
  argTypes: {
    intent:      { control: 'select', options: ['neutral', 'positive', 'warning', 'negative'] },
    title:       { control: 'text' },
    description: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Neutral: Story = {
  render: () => html`<specd-alert intent="neutral" title="Information" description="Here is some info."></specd-alert>`,
};

export const Positive: Story = {
  render: () => html`<specd-alert intent="positive" title="Success" description="Your changes have been saved."></specd-alert>`,
};

export const Warning: Story = {
  render: () => html`<specd-alert intent="warning" title="Warning" description="Please review your settings."></specd-alert>`,
};

export const Negative: Story = {
  render: () => html`<specd-alert intent="negative" title="Error" description="Something went wrong."></specd-alert>`,
};

export const TitleOnly: Story = {
  render: () => html`<specd-alert intent="neutral" title="Just a title"></specd-alert>`,
};
