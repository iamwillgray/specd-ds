import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdDivider';

const meta: Meta = {
  title: 'Components/Divider',
  component: 'specd-divider',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<specd-divider></specd-divider>`,
};

export const WithLabel: Story = {
  render: () => html`<specd-divider label="Or"></specd-divider>`,
};
