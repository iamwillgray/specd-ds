import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdVariablePicker.js';

const meta: Meta = {
  title: 'Organisms/VariablePicker',
  component: 'specd-variable-picker',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const ALL = JSON.stringify([
  { id: 'v1', name: 'color/primary/navy',   collection: 'Brand',      color: '#0C1750', hex: '#0C1750' },
  { id: 'v2', name: 'color/lime/400',       collection: 'Primitives',  color: '#b8ff57', hex: '#B8FF57' },
  { id: 'v3', name: 'color/blue/500',       collection: 'Primitives',  color: '#3b82f6', hex: '#3B82F6' },
  { id: 'v4', name: 'color/border/default', collection: 'Semantic',    color: '#d1d5db', hex: '#D1D5DB' },
]);

const SUGG = JSON.stringify([
  { id: 'v3', name: 'color/blue/500', collection: 'Primitives', color: '#3b82f6', hex: '#3B82F6' },
]);

export const FlatList: Story = {
  name: 'Flat list (no suggestions)',
  render: () => html`
    <div style="width:320px;padding:16px;">
      <specd-variable-picker open options=${ALL} title="Pick a variable"></specd-variable-picker>
    </div>
  `,
};

export const WithSuggestions: Story = {
  name: 'With Suggested section',
  render: () => html`
    <div style="width:320px;padding:16px;">
      <specd-variable-picker open options=${ALL} suggestions=${SUGG} title="Pick a variable"></specd-variable-picker>
    </div>
  `,
};

export const Closed: Story = {
  name: 'Closed (renders nothing)',
  render: () => html`
    <div style="width:320px;padding:16px;">
      <p style="font-size:12px;color:#666;">Component renders nothing when open=false:</p>
      <specd-variable-picker options=${ALL}></specd-variable-picker>
    </div>
  `,
};
