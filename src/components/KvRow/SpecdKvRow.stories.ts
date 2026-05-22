import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdKvRow';

const meta: Meta = {
  title: 'Molecules/KvRow',
  component: 'specd-kv-row',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    mono:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => html`<specd-kv-row label="Status" value="Active"></specd-kv-row>`,
};

export const Mono: Story = {
  render: () => html`<specd-kv-row label="Component ID" value="abc-123-def" mono></specd-kv-row>`,
};

export const List: Story = {
  render: () => html`
    <div>
      <specd-kv-row label="Name" value="Specd Button"></specd-kv-row>
      <specd-kv-row label="Version" value="2.1.0"></specd-kv-row>
      <specd-kv-row label="Key" value="comp_btn_primary" mono></specd-kv-row>
    </div>
  `,
};
