import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdIssueRow.js');
  await import('../IssueRowActions/SpecdIssueRowActions.js');
  await import('../IgnoreFooter/SpecdIgnoreFooter.js');
});

describe('SpecdIssueRow', () => {
  it('renders .issue-row with default state', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.title = 'Hard coded colour';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-row')).not.toBeNull();
    expect(el.getAttribute('data-row-state')).toBe('default');
    el.remove();
  });

  it('transitions to actions state on click', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.title = 'Test';
    document.body.appendChild(el);
    await el.updateComplete;
    el.querySelector('.issue-row').click();
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('actions');
    expect(el.querySelector('specd-issue-row-actions')).not.toBeNull();
    el.remove();
  });

  it('transitions to ignore state when specd-ignore fires', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.title = 'Test';
    el.rowstate = 'actions';
    document.body.appendChild(el);
    await el.updateComplete;
    el.querySelector('specd-issue-row-actions').dispatchEvent(
      new CustomEvent('specd-ignore', { bubbles: true, composed: true })
    );
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('ignore');
    expect(el.querySelector('specd-ignore-footer')).not.toBeNull();
    el.remove();
  });

  it('returns to default state after ignore cancel', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.title = 'Test';
    el.rowstate = 'ignore';
    document.body.appendChild(el);
    await el.updateComplete;
    el.querySelector('specd-ignore-footer').dispatchEvent(
      new CustomEvent('specd-ignore-cancel', { bubbles: true, composed: true })
    );
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('default');
    el.remove();
  });

  it('applies severity class', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.severity = 'crit';
    el.title = 'Critical';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-row')?.className).toContain('sev-crit');
    el.remove();
  });
});
