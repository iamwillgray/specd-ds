import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdIssueRow.js'); });

describe('SpecdIssueRow', () => {
  it('renders .issue-row with data-row-state="initial" by default', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'doc-link';
    el.title = 'Add documentation link';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-row')).not.toBeNull();
    expect(el.getAttribute('data-row-state')).toBe('initial');
    el.remove();
  });

  it('renders .issue-row-title with title text', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.title = 'Add documentation link';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-row-title')?.textContent?.trim()).toContain('Add documentation link');
    el.remove();
  });

  it('renders .issue-row-desc with description text', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.description = 'No doc link set for this component.';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-row-desc')?.textContent?.trim()).toContain('No doc link set');
    el.remove();
  });

  it('shows .row-state-initial CTA in initial state', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'doc-link';
    el.title = 'Add doc link';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.row-state-initial')).not.toBeNull();
    el.remove();
  });

  it('transitions to editing state when edit CTA clicked (doc-link)', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'doc-link';
    el.title = 'Add doc link';
    document.body.appendChild(el);
    await el.updateComplete;
    el.querySelector('.btn-row-primary')?.click();
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('editing');
    expect(el.querySelector('.row-link-field')).not.toBeNull();
    el.remove();
  });

  it('transitions to editing state for description fieldtype', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'description';
    el.title = 'Write description';
    document.body.appendChild(el);
    await el.updateComplete;
    el.querySelector('.btn-ai-gradient')?.click();
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('editing');
    expect(el.querySelector('.row-textarea-field')).not.toBeNull();
    el.remove();
  });

  it('transitions to applied state when save pill clicked', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'doc-link';
    el.title = 'Add doc link';
    document.body.appendChild(el);
    await el.updateComplete;
    // Go to editing first
    el.querySelector('.btn-row-primary')?.click();
    await el.updateComplete;
    // Click save
    el.querySelector('.btn-save-pill')?.click();
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('applied');
    expect(el.querySelector('.btn-row-applied')).not.toBeNull();
    el.remove();
  });

  it('returns to initial state when cancel pill clicked', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'doc-link';
    el.title = 'Add doc link';
    document.body.appendChild(el);
    await el.updateComplete;
    el.querySelector('.btn-row-primary')?.click();
    await el.updateComplete;
    el.querySelector('.btn-cancel-pill')?.click();
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('initial');
    el.remove();
  });

  it('goes directly to applied for dev-ready fieldtype (no edit state)', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'dev-ready';
    el.title = 'Mark dev ready';
    document.body.appendChild(el);
    await el.updateComplete;
    el.querySelector('.btn-row-primary')?.click();
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('applied');
    el.remove();
  });

  it('fires specd-quick-fix for hard-coded fieldtype', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'hard-coded';
    el.title = 'Hard-coded values';
    document.body.appendChild(el);
    await el.updateComplete;
    let fired = false;
    el.addEventListener('specd-quick-fix', () => { fired = true; });
    el.querySelector('.btn-row-primary')?.click();
    await el.updateComplete;
    expect(fired).toBe(true);
    el.remove();
  });

  it('fires specd-save with value when saved', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.fieldtype = 'doc-link';
    el.title = 'Add doc link';
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-save', (e: any) => { detail = e.detail; });
    el.querySelector('.btn-row-primary')?.click();
    await el.updateComplete;
    el.querySelector('.btn-save-pill')?.click();
    await el.updateComplete;
    expect(detail?.fieldtype).toBe('doc-link');
    el.remove();
  });
});
