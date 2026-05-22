import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdTag.js';

const meta: Meta = {
  title: 'Atoms/Tag',
  component: 'specd-tag',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const AllIntents: Story = {
  name: 'All Intents',
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;padding:16px;">
      <specd-tag label="No description" intent="crit"></specd-tag>
      <specd-tag label="HC colours"     intent="warn"></specd-tag>
      <specd-tag label="No doc link"    intent="info"></specd-tag>
      <specd-tag label="Published"      intent="neutral"></specd-tag>
    </div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;padding:0 16px 16px;">
      <specd-tag label="HC colours" sub="Fill" intent="warn"></specd-tag>
      <specd-tag label="HC spacing" sub="Padding" intent="warn"></specd-tag>
    </div>
  `,
};
