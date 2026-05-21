import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdIgnoreFooter.js';

const meta: Meta = {
  title: 'Molecules/IgnoreFooter',
  component: 'specd-ignore-footer',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<specd-ignore-footer></specd-ignore-footer>`,
};

export const WithSelected: Story = {
  render: () => html`<specd-ignore-footer showselected></specd-ignore-footer>`,
};
