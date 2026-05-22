import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdStatTileLg.js';

const meta: Meta = {
  title: 'Molecules/StatTileLg',
  component: 'specd-stat-tile-lg',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<specd-stat-tile-lg num="1,247" title="Components" subtitle="in library"></specd-stat-tile-lg>`,
};

export const Green: Story = {
  render: () => html`<specd-stat-tile-lg num="94%" title="Descriptions" trend="+3%" trenddir="up" color="green"></specd-stat-tile-lg>`,
};

export const Red: Story = {
  render: () => html`<specd-stat-tile-lg num="12" title="Critical Issues" trend="+2" trenddir="down" color="red"></specd-stat-tile-lg>`,
};

export const Amber: Story = {
  render: () => html`<specd-stat-tile-lg num="47%" title="Token Coverage" color="amber"></specd-stat-tile-lg>`,
};

export const AllColors: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;width:600px;">
      <specd-stat-tile-lg num="1,247" title="Components" subtitle="in library"></specd-stat-tile-lg>
      <specd-stat-tile-lg num="94%" title="Descriptions" trend="+3%" trenddir="up" color="green"></specd-stat-tile-lg>
      <specd-stat-tile-lg num="12" title="Critical Issues" trend="+2" trenddir="down" color="red"></specd-stat-tile-lg>
      <specd-stat-tile-lg num="47%" title="Token Coverage" color="amber"></specd-stat-tile-lg>
    </div>
  `,
};

export const WithCustomIcon: Story = {
  name: 'Custom icon',
  render: () => html`
    <div style="max-width:280px;">
      <specd-stat-tile-lg
        num="42"
        title="Alerts"
        trend="-8%" trenddir="down"
        color="red"
        icon='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>'
      ></specd-stat-tile-lg>
    </div>
  `,
};
