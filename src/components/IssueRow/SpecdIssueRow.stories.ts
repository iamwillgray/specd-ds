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

export const DocLink: Story = {
  name: 'Doc Link — Initial',
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-row
        fieldtype="doc-link"
        title="Add documentation link"
        description="No doc link is set for this component."
      ></specd-issue-row>
    </div>
  `,
};

export const DocLinkEditing: Story = {
  name: 'Doc Link — Editing',
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-row
        fieldtype="doc-link"
        title="Add documentation link"
        description="No doc link is set for this component."
        rowstate="editing"
        value="https://zeroheight.com/button"
      ></specd-issue-row>
    </div>
  `,
};

export const DocLinkApplied: Story = {
  name: 'Doc Link — Applied',
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-row
        fieldtype="doc-link"
        title="Add documentation link"
        rowstate="applied"
      ></specd-issue-row>
    </div>
  `,
};

export const Description: Story = {
  name: 'Description — Initial (AI)',
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-row
        fieldtype="description"
        title="Write component description"
        description="This component has no description."
      ></specd-issue-row>
    </div>
  `,
};

export const DevReady: Story = {
  name: 'Dev Ready — Initial',
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-row
        fieldtype="dev-ready"
        title="Mark as dev ready"
        description="Dev status has not been set."
      ></specd-issue-row>
    </div>
  `,
};

export const HardCoded: Story = {
  name: 'Hard Coded — Initial (ghost)',
  render: () => html`
    <div style="width:420px;padding:12px;">
      <specd-issue-row
        fieldtype="hard-coded"
        title="Hard-coded colour values"
        description="5 layers use raw hex values instead of variables."
      ></specd-issue-row>
    </div>
  `,
};

export const AllFieldTypes: Story = {
  name: 'All Field Types',
  render: () => html`
    <div style="width:420px;padding:12px;display:flex;flex-direction:column;gap:8px;">
      <specd-issue-row fieldtype="doc-link" title="Add documentation link" description="No doc link set."></specd-issue-row>
      <specd-issue-row fieldtype="description" title="Write description" description="No description set."></specd-issue-row>
      <specd-issue-row fieldtype="dev-ready" title="Mark dev ready" description="Dev status not set."></specd-issue-row>
      <specd-issue-row fieldtype="mark-complete" title="Mark complete" description="Not marked complete."></specd-issue-row>
      <specd-issue-row fieldtype="hard-coded" title="Hard-coded values" description="5 layers have raw values."></specd-issue-row>
    </div>
  `,
};
