import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdIssueRowActions.js';

const meta: Meta = {
  title: 'Molecules/IssueRowActions',
  component: 'specd-issue-row-actions',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<specd-issue-row-actions></specd-issue-row-actions>`,
};

export const JumpOnly: Story = {
  render: () => html`<specd-issue-row-actions showfixes="false" showignore="false"></specd-issue-row-actions>`,
};
