import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdVariablePicker.js';

const SAMPLE_OPTS = JSON.stringify([
  { id: 'v1', name: 'color/primary/navy',   collection: 'Brand',      type: 'semantic'  },
  { id: 'v2', name: 'color/lime/400',        collection: 'Primitives', type: 'primitive' },
  { id: 'v3', name: 'color/blue/500',        collection: 'Primitives', type: 'primitive' },
]);

const meta: Meta = {
  title: 'Organisms/VariablePicker',
  component: 'specd-variable-picker',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Open: Story = {
  render: () => html`
    <div style="position:relative;width:360px;padding:16px;">
      <specd-variable-picker open title="Pick a variable" options=${SAMPLE_OPTS}></specd-variable-picker>
    </div>
  `,
};

export const Empty: Story = {
  render: () => html`
    <div style="position:relative;width:360px;padding:16px;">
      <specd-variable-picker open title="Pick a variable" options='[]'></specd-variable-picker>
    </div>
  `,
};
