import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdStatTileLg';

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
