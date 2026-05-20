import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './AdmiralChip';

const meta: Meta = {
  title: 'Components/Chip',
  component: 'admiral-chip',
  tags: ['autodocs'],
  render: (args) => html`
    <admiral-chip
      label=${args.label ?? 'Chip'}
      count=${args.count ?? nothing}
      severity=${args.severity ?? nothing}
      ?active=${args.active}
    ></admiral-chip>
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
      <admiral-chip label="All"      active data-filter="all"></admiral-chip>
      <admiral-chip label="Critical" count="3" severity="crit" data-filter="critical"></admiral-chip>
      <admiral-chip label="Warning"  count="5" severity="warn" data-filter="warning"></admiral-chip>
      <admiral-chip label="Info"     count="2" data-filter="info"></admiral-chip>
      <admiral-chip label="Ignored"  count="1" data-filter="ignored"></admiral-chip>
    </div>
  `,
};
