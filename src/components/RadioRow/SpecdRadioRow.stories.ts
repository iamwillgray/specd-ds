import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdRadioRow.js';

const meta: Meta = {
  title: 'Molecules/RadioRow',
  component: 'specd-radio-row',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="width:320px;display:flex;flex-direction:column;gap:4px;padding:16px;">
      <specd-radio-row
        value="a"
        label="theme/background"
        collection="Theme · Primary"
        color="#1d4ed8"
        hex="#1D4ED8"
        checked
      ></specd-radio-row>
      <specd-radio-row
        value="b"
        label="semantic/fill/primary"
        collection="Semantic · Fills"
        color="#2563eb"
        hex="#2563EB"
      ></specd-radio-row>
      <specd-radio-row
        value="c"
        label="primitives/blue-500"
        collection="Primitives"
        color="#3b82f6"
        hex="#3B82F6"
      ></specd-radio-row>
    </div>
  `,
};

export const NoSwatch: Story = {
  render: () => html`
    <div style="width:320px;display:flex;flex-direction:column;gap:4px;padding:16px;">
      <specd-radio-row value="sp1" label="spacing/300" collection="Spacing scale" checked></specd-radio-row>
      <specd-radio-row value="sp2" label="spacing/400" collection="Spacing scale"></specd-radio-row>
    </div>
  `,
};
