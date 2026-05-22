import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdStatTileSm';

const meta: Meta = {
  title: 'Molecules/StatTileSm',
  component: 'specd-stat-tile-sm',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<specd-stat-tile-sm num="42" label="Components"></specd-stat-tile-sm>`,
};

export const Positive: Story = {
  render: () => html`<specd-stat-tile-sm num="94%" label="Coverage" intent="positive"></specd-stat-tile-sm>`,
};

export const Negative: Story = {
  render: () => html`<specd-stat-tile-sm num="12" label="Critical Issues" intent="negative"></specd-stat-tile-sm>`,
};

export const Warning: Story = {
  render: () => html`<specd-stat-tile-sm num="5" label="Warnings" intent="warning"></specd-stat-tile-sm>`,
};

export const Grid: Story = {
  render: () => html`
    <div class="stat-tiles-row" style="display:flex;gap:8px;flex-wrap:wrap;">
      <specd-stat-tile-sm num="1,247" label="Components"></specd-stat-tile-sm>
      <specd-stat-tile-sm num="94%" label="Descriptions" intent="positive"></specd-stat-tile-sm>
      <specd-stat-tile-sm num="12" label="Critical Issues" intent="negative"></specd-stat-tile-sm>
      <specd-stat-tile-sm num="5" label="Warnings" intent="warning"></specd-stat-tile-sm>
    </div>
  `,
};
