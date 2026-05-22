import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdColorSwatch.js';

const meta: Meta = {
  title: 'Atoms/ColorSwatch',
  component: 'specd-color-swatch',
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['square', 'chip', 'typography'] },
    color:   { control: 'color' },
    label:   { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Square: Story = {
  args: { color: '#3b82f6', label: 'Blue', variant: 'square' },
  render: (args) => html`<specd-color-swatch color=${args.color} label=${args.label} variant="square"></specd-color-swatch>`,
};

export const Chip: Story = {
  args: { color: '#3b82f6', label: 'Blue 500', variant: 'chip' },
  render: (args) => html`<specd-color-swatch color=${args.color} label=${args.label} variant="chip"></specd-color-swatch>`,
};

export const Typography: Story = {
  args: { color: '#0C1750', label: 'Navy', variant: 'typography' },
  render: (args) => html`<specd-color-swatch color=${args.color} label=${args.label} variant="typography"></specd-color-swatch>`,
};

export const AllVariants: Story = {
  name: 'All three variants',
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:16px;padding:16px;">
      <div style="display:flex;gap:12px;align-items:center;">
        <specd-color-swatch color="#3b82f6" variant="square"></specd-color-swatch>
        <specd-color-swatch color="#b8ff57" variant="square"></specd-color-swatch>
        <specd-color-swatch color="#ef4444" variant="square"></specd-color-swatch>
        <specd-color-swatch color="#0C1750" variant="square"></specd-color-swatch>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        <specd-color-swatch color="#3b82f6" label="Blue 500" variant="chip"></specd-color-swatch>
        <specd-color-swatch color="#b8ff57" label="Lime" variant="chip"></specd-color-swatch>
        <specd-color-swatch color="#ef4444" label="Red 500" variant="chip"></specd-color-swatch>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <specd-color-swatch color="#0C1750" variant="typography"></specd-color-swatch>
        <specd-color-swatch color="#3b82f6" variant="typography"></specd-color-swatch>
        <specd-color-swatch color="#ef4444" variant="typography"></specd-color-swatch>
      </div>
    </div>
  `,
};
