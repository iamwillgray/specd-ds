import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdChoiceCard';

const meta: Meta = {
  title: 'Components/ChoiceCard',
  component: 'specd-choice-card',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<div style="width:280px"><specd-choice-card title="Free Plan" description="Everything you need to get started."></specd-choice-card></div>`,
};

export const Gradient: Story = {
  render: () => html`<div style="width:280px"><specd-choice-card title="Pro Plan" description="Unlock advanced features." variant="gradient"></specd-choice-card></div>`,
};

export const WithPill: Story = {
  render: () => html`<div style="width:280px"><specd-choice-card title="Enterprise" description="For large teams." pill="Most Popular"></specd-choice-card></div>`,
};

export const Grid: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;width:580px">
      <specd-choice-card title="Free" description="No cost forever."></specd-choice-card>
      <specd-choice-card title="Pro" description="Advanced features." variant="gradient" pill="Recommended"></specd-choice-card>
    </div>
  `,
};
