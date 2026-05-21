import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdIssueRowActions.js'); });

describe('SpecdIssueRowActions', () => {
  it('renders all three buttons by default', async () => {
    const el = document.createElement('specd-issue-row-actions') as any;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.btn-jump')).not.toBeNull();
    expect(el.querySelector('.btn-view-fixes')).not.toBeNull();
    expect(el.querySelector('.btn-ghost')).not.toBeNull();
    el.remove();
  });

  it('hides jump button when showjump=false', async () => {
    const el = document.createElement('specd-issue-row-actions') as any;
    el.showjump = false;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.btn-jump')).toBeNull();
    el.remove();
  });

  it('fires specd-jump on click', async () => {
    const el = document.createElement('specd-issue-row-actions') as any;
    document.body.appendChild(el);
    await el.updateComplete;
    let fired = false;
    el.addEventListener('specd-jump', () => { fired = true; });
    el.querySelector('.btn-jump').click();
    expect(fired).toBe(true);
    el.remove();
  });
});
