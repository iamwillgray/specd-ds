import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdIssueRow.js';

const meta: Meta = {
  title: 'Organisms/IssueRow',
  component: 'specd-issue-row',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="width:360px;padding:16px;">
      <specd-issue-row title="Hard coded colour #b8ff57" severity="warn" type="token" component="Button/Primary"></specd-issue-row>
    </div>
  `,
};

export const Actions: Story = {
  render: () => html`
    <div style="width:360px;padding:16px;">
      <specd-issue-row title="Missing description" severity="crit" type="docs" component="Icon/Alert" rowstate="actions"></specd-issue-row>
    </div>
  `,
};

export const IgnoreState: Story = {
  render: () => html`
    <div style="width:360px;padding:16px;">
      <specd-issue-row title="No dev status" severity="info" type="status" rowstate="ignore"></specd-issue-row>
    </div>
  `,
};
