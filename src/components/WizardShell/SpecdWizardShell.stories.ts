import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdWizardShell';
import '../Chip/SpecdChip';
import '../Button/SpecdButton';

const meta: Meta = {
  title: 'Organisms/WizardShell',
  component: 'specd-wizard-shell',
  tags: ['autodocs'],
  argTypes: {
    open:       { control: 'boolean' },
    title:      { control: 'text' },
    mode:       { control: { type: 'inline-radio' }, options: ['single', 'bulk'] },
    hidetoggle: { control: 'boolean' },
    hideclose:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const SingleMode: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => html`
    <specd-wizard-shell .open=${true} title="Quick-Fix Issues" mode="single">
      <div class="qf-filter-chips" style="padding:12px 16px;">
        <specd-chip label="All"      count="12" active></specd-chip>
        <specd-chip label="Colour"   count="7"></specd-chip>
        <specd-chip label="Spacing"  count="5"></specd-chip>
      </div>
      <div class="qf-body" style="padding:16px; color:rgba(255,255,255,0.85); text-align:center;">
        <p>Wizard body slot — e.g. the QF replace card, fix navigation, footer.</p>
      </div>
    </specd-wizard-shell>
  `,
};

export const BulkMode: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => html`
    <specd-wizard-shell .open=${true} title="Quick-Fix Issues" mode="bulk">
      <div class="qf-bulk-header" style="padding:8px 16px; color:rgba(255,255,255,0.7); display:flex; justify-content:space-between;">
        <span>Bulk mode</span>
        <span>67 issues</span>
      </div>
      <div class="qf-bulk-view" style="margin:16px;">
        <p>Bulk wizard body content area.</p>
      </div>
    </specd-wizard-shell>
  `,
};

export const NoToggle: Story = {
  parameters: { layout: 'fullscreen' },
  name: 'Hidden mode toggle',
  render: () => html`
    <specd-wizard-shell .open=${true} title="Settings Wizard" hidetoggle>
      <div style="padding:24px; color:rgba(255,255,255,0.85); text-align:center;">
        Brand-only mode — no mode toggle in the topbar.
      </div>
    </specd-wizard-shell>
  `,
};
