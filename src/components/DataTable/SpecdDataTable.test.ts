import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdDataTable.js');
});

const COLS = JSON.stringify([
  { key: 'name',   label: 'Name',   sortable: true  },
  { key: 'status', label: 'Status', sortable: false },
]);

const ROWS = JSON.stringify([
  { name: 'Button',  status: 'Published' },
  { name: 'Alert',   status: 'Draft'     },
  { name: 'Card',    status: 'Published' },
]);

describe('SpecdDataTable', () => {
  it('renders .comp-table', async () => {
    const el = document.createElement('specd-data-table') as any;
    el.columns = COLS;
    el.rows = ROWS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.comp-table')).not.toBeNull();
    el.remove();
  });

  it('renders correct number of rows', async () => {
    const el = document.createElement('specd-data-table') as any;
    el.columns = COLS;
    el.rows = ROWS;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelectorAll('tbody tr').length).toBe(3);
    el.remove();
  });

  it('renders header columns', async () => {
    const el = document.createElement('specd-data-table') as any;
    el.columns = COLS;
    el.rows = ROWS;
    document.body.appendChild(el);
    await el.updateComplete;
    const headers = [...el.querySelectorAll('th')].map((th: HTMLElement) => th.textContent?.trim());
    expect(headers).toContain('Name');
    expect(headers).toContain('Status');
    el.remove();
  });

  it('shows no results when rows is empty', async () => {
    const el = document.createElement('specd-data-table') as any;
    el.columns = COLS;
    el.rows = '[]';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.table-empty')).not.toBeNull();
    el.remove();
  });
});
