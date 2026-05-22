import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdColorSwatch.js';

const meta: Meta = {
  title: 'Atoms/ColorSwatch',
  component: 'specd-color-swatch',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<specd-color-swatch color="#3b82f6" label="Blue"></specd-color-swatch>`,
};

export const Small: Story = {
  name: 'sm variant',
  render: () => html`<specd-color-swatch color="#3b82f6" label="Blue" sm></specd-color-swatch>`,
};

export const AllSwatches: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;align-items:center;padding:12px;">
      <specd-color-swatch color="#0C1750"></specd-color-swatch>
      <specd-color-swatch color="#b8ff57"></specd-color-swatch>
      <specd-color-swatch color="#3b82f6"></specd-color-swatch>
      <specd-color-swatch color="#f59e0b"></specd-color-swatch>
      <specd-color-swatch color="#ef4444"></specd-color-swatch>
      <specd-color-swatch color="#22c55e"></specd-color-swatch>
    </div>
    <div style="display:flex;gap:6px;align-items:center;padding:0 12px 12px;">
      <specd-color-swatch color="#0C1750" sm></specd-color-swatch>
      <specd-color-swatch color="#b8ff57" sm></specd-color-swatch>
      <specd-color-swatch color="#3b82f6" sm></specd-color-swatch>
    </div>
  `,
};
