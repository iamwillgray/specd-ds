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
  args: { color: '#b8ff57', label: 'Lime' },
  render: (args) => html`<specd-color-swatch color=${args.color} label=${args.label}></specd-color-swatch>`,
};

export const Swatches: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;padding:16px;">
      ${['#0C1750','#b8ff57','#3b82f6','#f59e0b','#ef4444','#22c55e'].map(c => html`
        <specd-color-swatch color=${c} label=${c}></specd-color-swatch>
      `)}
    </div>
  `,
};
