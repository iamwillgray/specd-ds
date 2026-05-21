import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdEmptyState';

const meta: Meta = {
  title: 'Components/EmptyState',
  component: 'specd-empty-state',
  tags: ['autodocs'],
  argTypes: {
    title:       { control: 'text' },
    description: { control: 'text' },
    icon:        { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => html`<specd-empty-state title="No components found" description="Run a scan to see results."></specd-empty-state>`,
};

export const WithIcon: Story = {
  render: () => html`
    <specd-empty-state
      title="Nothing here yet"
      description="Add some components to get started."
      icon='<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>'
    ></specd-empty-state>
  `,
};

export const WithCTA: Story = {
  render: () => html`
    <specd-empty-state title="No results" description="Try a different filter.">
      <specd-button variant="primary">Clear filters</specd-button>
    </specd-empty-state>
  `,
};
