import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdIssueRow.js';

const meta: Meta = {
  title: 'Organisms/IssueRow',
  component: 'specd-issue-row',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

/* ── Helper ─────────────────────────────────────────────── */
const tags = (arr: { label: string; sev?: string }[]) => JSON.stringify(arr);

/* ── Stories ─────────────────────────────────────────────── */

export const Critical: Story = {
  name: 'Critical — Missing description',
  render: () => html`
    <div style="width:420px; padding:12px; background:var(--bg);">
      <specd-issue-row
        component="Button/Primary"
        type="Missing desc"
        severity="crit"
        tags=${tags([
          { label: 'No description', sev: 'crit' },
          { label: 'Published',      sev: 'neutral' },
        ])}
      ></specd-issue-row>
    </div>
  `,
};

export const CriticalMultiple: Story = {
  name: 'Critical — No desc + no link',
  render: () => html`
    <div style="width:420px; padding:12px; background:var(--bg);">
      <specd-issue-row
        component="Card/Default"
        type="No desc"
        severity="crit"
        tags=${tags([
          { label: 'No description', sev: 'crit' },
          { label: 'No doc link',    sev: 'crit' },
          { label: 'Published',      sev: 'neutral' },
        ])}
      ></specd-issue-row>
    </div>
  `,
};

export const Warning: Story = {
  name: 'Warning — Hard-coded values',
  render: () => html`
    <div style="width:420px; padding:12px; background:var(--bg);">
      <specd-issue-row
        component="Input/Text"
        type="Hard-coded"
        count="5"
        severity="warn"
        showfixes
        tags=${tags([
          { label: 'HC colours', sev: 'warn' },
          { label: 'HC spacing', sev: 'warn' },
        ])}
      ></specd-issue-row>
    </div>
  `,
};

export const Info: Story = {
  name: 'Advisory — No doc link',
  render: () => html`
    <div style="width:420px; padding:12px; background:var(--bg);">
      <specd-issue-row
        component="Icon/Alert"
        type="No link"
        severity="info"
        tags=${tags([
          { label: 'No documentation link', sev: 'info' },
          { label: 'Published',             sev: 'neutral' },
        ])}
      ></specd-issue-row>
    </div>
  `,
};

export const IgnoreState: Story = {
  name: 'Ignore flow',
  render: () => html`
    <div style="width:420px; padding:12px; background:var(--bg);">
      <specd-issue-row
        component="Chip/Filter"
        type="No status"
        severity="info"
        rowstate="ignore"
        tags=${tags([{ label: 'Dev status not set', sev: 'info' }])}
      ></specd-issue-row>
    </div>
  `,
};

export const AllSeverities: Story = {
  name: 'All Severities',
  render: () => html`
    <div style="width:420px; padding:12px; background:var(--bg);">
      <specd-issue-row
        component="Button/Primary"
        type="Missing desc"
        severity="crit"
        tags=${tags([
          { label: 'No description', sev: 'crit' },
          { label: 'Published',      sev: 'neutral' },
        ])}
      ></specd-issue-row>

      <specd-issue-row
        component="Input/Text"
        type="Hard-coded"
        count="5"
        severity="warn"
        showfixes
        tags=${tags([
          { label: 'HC colours', sev: 'warn' },
          { label: 'HC spacing', sev: 'warn' },
        ])}
      ></specd-issue-row>

      <specd-issue-row
        component="Avatar/Default"
        type="No link"
        severity="info"
        tags=${tags([
          { label: 'No documentation link', sev: 'info' },
        ])}
      ></specd-issue-row>
    </div>
  `,
};
