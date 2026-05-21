import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdFormRow';

const meta: Meta = {
  title: 'Components/FormRow',
  component: 'specd-form-row',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    hint:  { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => html`
    <specd-form-row label="API Token">
      <input type="text" placeholder="Enter your token..." style="width:100%" />
    </specd-form-row>
  `,
};

export const WithHint: Story = {
  render: () => html`
    <specd-form-row label="Figma PAT" hint="Personal Access Token from Figma account settings">
      <input type="password" placeholder="figd_..." style="width:100%" />
    </specd-form-row>
  `,
};
