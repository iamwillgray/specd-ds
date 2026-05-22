import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdIssueRow.js');
  await import('../IgnoreFooter/SpecdIgnoreFooter.js');
});

describe('SpecdIssueRow', () => {
  it('renders .issue-card with default state', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.component = 'Button/Primary';
    el.type = 'Missing desc';
    el.severity = 'crit';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-card')).not.toBeNull();
    expect(el.getAttribute('data-row-state')).toBe('default');
    el.remove();
  });

  it('renders component name in .issue-comp-tag', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.component = 'Card/Default';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-comp-tag')?.textContent?.trim()).toContain('Card/Default');
    el.remove();
  });

  it('renders severity badge with correct class', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.severity = 'crit';
    el.type = 'Missing desc';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-card-count')?.className).toContain('crit');
    el.remove();
  });

  it('renders tags from JSON', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.tags = JSON.stringify([
      { label: 'No description', sev: 'crit' },
      { label: 'Published', sev: 'neutral' },
    ]);
    document.body.appendChild(el);
    await el.updateComplete;
    const tagEls = el.querySelectorAll('specd-tag');
    expect(tagEls.length).toBe(2);
    expect((tagEls[0] as any).label).toBe('No description');
    expect((tagEls[0] as HTMLElement).getAttribute('intent')).toBe('crit');
    expect((tagEls[1] as HTMLElement).getAttribute('intent')).toBe('neutral');
    el.remove();
  });

  it('shows footer with Jump button in default state', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.component = 'Button/Primary';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-card-footer')).not.toBeNull();
    expect(el.querySelector('specd-jump-btn')).not.toBeNull();
    el.remove();
  });

  it('shows View Fixes button when showfixes=true', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.showfixes = true;
    el.count = '5';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.btn-view-fixes')).not.toBeNull();
    el.remove();
  });

  it('transitions to ignore state on Ignore… click', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.component = 'Button/Primary';
    document.body.appendChild(el);
    await el.updateComplete;
    el.querySelector('.btn-ghost').click();
    await el.updateComplete;
    expect(el.getAttribute('data-row-state')).toBe('ignore');
    expect(el.querySelector('specd-ignore-footer')).not.toBeNull();
    el.remove();
  });

  it('returns to default after ignore cancel', async () => {
    const el = document.createElement('specd-issue-row') as any;
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

  it('auto-sets badge to "!" for crit severity with no count', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.severity = 'crit';
    el.type = 'Missing desc';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.issue-card-count-badge')?.textContent?.trim()).toBe('!');
    el.remove();
  });

  it('renders specd-tag elements for each tag', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.tags = JSON.stringify([{ label: 'No description', sev: 'crit' }, { label: 'Published', sev: 'neutral' }]);
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelectorAll('specd-tag').length).toBe(2);
    el.remove();
  });

  it('renders specd-jump-btn in the footer', async () => {
    const el = document.createElement('specd-issue-row') as any;
    el.component = 'Button/Primary';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('specd-jump-btn')).not.toBeNull();
    el.remove();
  });
});
