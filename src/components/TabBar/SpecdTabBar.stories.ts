import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdTabBar';

const OVERVIEW_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`;
const ISSUES_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2L2 19h20L12 2z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="17" r="0.5" fill="currentColor"/></svg>`;
const COMPONENTS_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></svg>`;
const VARIABLES_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2a5 5 0 1 0 5 5"/><path d="M7 13l5 5 5-5"/></svg>`;
const STORYBOOK_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 2h12l4 4v16H4z"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>`;
const LIBRARY_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>`;

const SIX_TABS = JSON.stringify([
  { id: 'overview', label: 'Overview', icon: OVERVIEW_ICON },
  { id: 'issues', label: 'Issues', icon: ISSUES_ICON },
  { id: 'components', label: 'Components', icon: COMPONENTS_ICON },
  { id: 'variables', label: 'Variables', icon: VARIABLES_ICON },
  { id: 'storybook', label: 'Storybook', icon: STORYBOOK_ICON },
  { id: 'library', label: 'Library', icon: LIBRARY_ICON },
]);

const meta: Meta = {
  title: 'Components/TabBar',
  component: 'specd-tab-bar',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-tab-bar
      tabs=${args.tabs ?? '[]'}
      active=${args.active ?? ''}
      columns=${args.columns ?? 6}
    ></specd-tab-bar>
  `,
  argTypes: {
    tabs:    { control: 'text' },
    active:  { control: 'text' },
    columns: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const SixTabs: Story = {
  args: {
    tabs: SIX_TABS,
    active: 'overview',
    columns: 6,
  },
};

export const FourTabs: Story = {
  args: {
    tabs: JSON.stringify([
      { id: 'overview', label: 'Overview', icon: OVERVIEW_ICON },
      { id: 'issues', label: 'Issues', icon: ISSUES_ICON },
      { id: 'components', label: 'Components', icon: COMPONENTS_ICON },
      { id: 'variables', label: 'Variables', icon: VARIABLES_ICON },
    ]),
    active: 'overview',
    columns: 4,
  },
};

export const WithBadge: Story = {
  args: {
    tabs: JSON.stringify([
      { id: 'overview', label: 'Overview', icon: OVERVIEW_ICON },
      { id: 'issues', label: 'Issues', icon: ISSUES_ICON, badge: 7 },
      { id: 'components', label: 'Components', icon: COMPONENTS_ICON },
      { id: 'variables', label: 'Variables', icon: VARIABLES_ICON },
      { id: 'storybook', label: 'Storybook', icon: STORYBOOK_ICON },
      { id: 'library', label: 'Library', icon: LIBRARY_ICON },
    ]),
    active: 'issues',
    columns: 6,
  },
};
