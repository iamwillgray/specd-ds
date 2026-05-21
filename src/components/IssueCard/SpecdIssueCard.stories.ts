import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdIssueCard';

const meta: Meta = {
  title: 'Components/IssueCard',
  component: 'specd-issue-card',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

const TAGS_CRIT = JSON.stringify([
  { label: 'No Description', sub: '6 layers', severity: 'crit' },
  { label: 'Hard-coded colour', sub: '#0C1750', severity: 'warn' },
]);

export const Critical: Story = {
  render: () => html`<div style="width:340px"><specd-issue-card name="Button/Primary" count="3" severity="crit" tags=${TAGS_CRIT}></specd-issue-card></div>`,
};

export const Warning: Story = {
  render: () => html`<div style="width:340px"><specd-issue-card name="Card/Elevated" count="5" severity="warn" tags=${JSON.stringify([{ label: 'Hard-coded spacing', sub: '8px gap', severity: 'warn' }])}></specd-issue-card></div>`,
};

export const Info: Story = {
  render: () => html`<div style="width:340px"><specd-issue-card name="Icon/Arrow" count="1" severity="info" tags=${JSON.stringify([{ label: 'No doc link', severity: 'info' }])}></specd-issue-card></div>`,
};

export const NoTags: Story = {
  render: () => html`<div style="width:340px"><specd-issue-card name="Toggle/Default" count="2" severity="warn"></specd-issue-card></div>`,
};
