import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdDataTable.js';

const COLS = JSON.stringify([
  { key: 'name',      label: 'Component',  sortable: true  },
  { key: 'status',    label: 'Status',     sortable: false },
  { key: 'coverage',  label: 'Coverage',   sortable: true  },
]);

const ROWS = JSON.stringify([
  { name: 'Button/Primary',   status: 'Published', coverage: '92%' },
  { name: 'Alert',            status: 'Draft',      coverage: '64%' },
  { name: 'Card',             status: 'Published', coverage: '88%' },
  { name: 'Modal',            status: 'Review',     coverage: '71%' },
]);

const meta: Meta = {
  title: 'Organisms/DataTable',
  component: 'specd-data-table',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="width:480px;padding:16px;">
      <specd-data-table columns=${COLS} rows=${ROWS}></specd-data-table>
    </div>
  `,
};

export const Empty: Story = {
  render: () => html`
    <div style="width:480px;padding:16px;">
      <specd-data-table columns=${COLS} rows='[]'></specd-data-table>
    </div>
  `,
};
