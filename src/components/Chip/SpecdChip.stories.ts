import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdChip';

const meta: Meta = {
  title: 'Components/Chip',
  component: 'specd-chip',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-chip
      label=${args.label ?? 'Chip'}
      count=${args.count ?? nothing}
      severity=${args.severity ?? nothing}
      ?active=${args.active}
    ></specd-chip>
  `,
  argTypes: {
    label:    { control: 'text' },
    count:    { control: 'number' },
    active:   { control: 'boolean' },
    severity: { control: 'select', options: ['', 'crit', 'warn'] },
  },
};
export default meta;
type Story = StoryObj;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nothing = undefined as any;

export const Default: Story = { args: { label: 'All issues' } };
export const Active: Story  = { args: { label: 'Critical', active: true } };
export const WithCount: Story = { args: { label: 'Warnings', count: 7 } };
export const CritSeverity: Story = { args: { label: 'Critical', count: 3, severity: 'crit', active: true } };
export const WarnSeverity: Story = { args: { label: 'Warning',  count: 5, severity: 'warn' } };

export const FilterBar: Story = {
  render: () => html`
    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      <specd-chip label="All"      active data-filter="all"></specd-chip>
      <specd-chip label="Critical" count="3" severity="crit" data-filter="critical"></specd-chip>
      <specd-chip label="Warning"  count="5" severity="warn" data-filter="warning"></specd-chip>
      <specd-chip label="Info"     count="2" data-filter="info"></specd-chip>
      <specd-chip label="Ignored"  count="1" data-filter="ignored"></specd-chip>
    </div>
  `,
};
