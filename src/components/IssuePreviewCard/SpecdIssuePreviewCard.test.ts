import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdIssuePreviewCard.js';

describe('SpecdIssuePreviewCard', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-issue-preview-card');
    el.setAttribute('component', 'Button/Primary');
    el.setAttribute('type', 'Missing desc');
    el.setAttribute('severity', 'crit');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('renders issue-card-icon element (not issue-comp-tag)', async () => {
    await (el as any).updateComplete;
    expect(el.querySelector('.issue-card-icon')).toBeTruthy();
    expect(el.querySelector('.issue-comp-tag')).toBeNull();
  });

  it('renders issue-name element', async () => {
    await (el as any).updateComplete;
    expect(el.querySelector('.issue-name')).toBeTruthy();
    expect(el.querySelector('.issue-name')?.textContent?.trim()).toBe('Button/Primary');
  });

  it('does not render Ignore button in default footer', async () => {
    await (el as any).updateComplete;
    const buttons = Array.from(el.querySelectorAll('button'));
    const ignoreBtn = buttons.find(b => b.textContent?.includes('Ignore'));
    expect(ignoreBtn).toBeUndefined();
  });

  it('renders View Fixes button by default', async () => {
    await (el as any).updateComplete;
    const buttons = Array.from(el.querySelectorAll('button'));
    const fixesBtn = buttons.find(b => b.textContent?.trim().startsWith('View Fixes'));
    expect(fixesBtn).toBeTruthy();
  });

  it('fires specd-fixes event when View Fixes clicked', async () => {
    await (el as any).updateComplete;
    let fired = false;
    el.addEventListener('specd-fixes', () => { fired = true; });
    const fixesBtn = Array.from(el.querySelectorAll('button')).find(b => b.textContent?.trim().startsWith('View Fixes'));
    (fixesBtn as HTMLButtonElement)?.click();
    await (el as any).updateComplete;
    expect(fired).toBe(true);
  });

  it('renders expand slot area when expanded prop set', async () => {
    el.setAttribute('expanded', '');
    await (el as any).updateComplete;
    expect(el.querySelector('.issue-card-fixes')).toBeTruthy();
  });
});
