import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdCovRow';

const FILE_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`;
const LINK_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
const TAG_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z"/><path d="M7 7h.01"/></svg>`;
const DEV_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;

const meta: Meta = {
  title: 'Components/CovRow',
  component: 'specd-cov-row',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Excellent: Story = { render: () => html`<specd-cov-row label="Descriptions" pct="94" icon=${FILE_SVG}></specd-cov-row>` };
export const Good: Story     = { render: () => html`<specd-cov-row label="Doc Links" pct="61" icon=${LINK_SVG}></specd-cov-row>` };
export const Med: Story      = { render: () => html`<specd-cov-row label="Token Coverage" pct="47" icon=${TAG_SVG}></specd-cov-row>` };
export const Poor: Story     = { render: () => html`<specd-cov-row label="Dev Status" pct="23" icon=${DEV_SVG}></specd-cov-row>` };
export const AllRows: Story  = {
  render: () => html`
    <div style="border:1px solid var(--border);border-radius:8px;overflow:hidden;width:500px;">
      <specd-cov-row label="Descriptions"   pct="94" icon=${FILE_SVG}></specd-cov-row>
      <specd-cov-row label="Doc Links"      pct="61" icon=${LINK_SVG}></specd-cov-row>
      <specd-cov-row label="Token Coverage" pct="47" icon=${TAG_SVG}></specd-cov-row>
      <specd-cov-row label="Dev Status"     pct="23" icon=${DEV_SVG}></specd-cov-row>
    </div>
  `,
};
