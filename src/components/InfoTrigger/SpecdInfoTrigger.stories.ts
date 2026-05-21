import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdInfoTrigger.js';

const meta: Meta = {
  title: 'Atoms/InfoTrigger',
  component: 'specd-info-trigger',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<specd-info-trigger></specd-info-trigger>`,
};
