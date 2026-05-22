import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdIssueRow.js';
import '../IssueRowActions/SpecdIssueRowActions.js';
import '../IgnoreFooter/SpecdIgnoreFooter.js';

const meta: Meta = {
  title: 'Organisms/IssueRow',
  component: 'specd-issue-row',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: 'Default (collapsed)',
  render: () => html`
    <div style="width:400px; padding:16px; background:var(--bg);">
      <specd-issue-row
        title="Hard coded colour #b8ff57"
        severity="warn"
        type="Colour"
        component="Button/Primary"
      ></specd-issue-row>
      <specd-issue-row
        title="Missing description"
        severity="crit"
        type="Docs"
        component="Icon/Alert"
      ></specd-issue-row>
      <specd-issue-row
        title="No dev status set"
        severity="info"
        type="Status"
        component="Card/Base"
      ></specd-issue-row>
    </div>
  `,
};

export const Actions: Story = {
  name: 'Expanded — Actions',
  render: () => html`
    <div style="width:400px; padding:16px; background:var(--bg);">
      <specd-issue-row
        title="Missing description"
        severity="crit"
        type="Docs"
        component="Icon/Alert"
        rowstate="actions"
      ></specd-issue-row>
    </div>
  `,
};

export const IgnoreState: Story = {
  name: 'Expanded — Ignore',
  render: () => html`
    <div style="width:400px; padding:16px; background:var(--bg);">
      <specd-issue-row
        title="No dev status"
        severity="info"
        type="Status"
        component="Card/Base"
        rowstate="ignore"
      ></specd-issue-row>
    </div>
  `,
};

export const AllSeverities: Story = {
  name: 'All Severities',
  render: () => html`
    <div style="width:400px; padding:16px; background:var(--bg); display:flex; flex-direction:column; gap:4px;">
      <specd-issue-row title="Hard coded spacing 16px" severity="warn" type="Spacing" component="FormRow/Default"></specd-issue-row>
      <specd-issue-row title="Hard coded colour #1d4ed8" severity="warn" type="Colour" component="Badge/Info"></specd-issue-row>
      <specd-issue-row title="Published but no description" severity="crit" type="Docs" component="Avatar/Default"></specd-issue-row>
      <specd-issue-row title="No documentation link" severity="crit" type="Docs" component="Modal/Confirm"></specd-issue-row>
      <specd-issue-row title="Dev status not set" severity="info" type="Status" component="Chip/Filter"></specd-issue-row>
    </div>
  `,
};
