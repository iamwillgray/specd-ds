import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdStepScore.js';

describe('SpecdStepScore', () => {
  let el: HTMLElement & { updateComplete: Promise<boolean> };

  beforeEach(() => {
    el = document.createElement('specd-step-score') as HTMLElement & { updateComplete: Promise<boolean> };
    document.body.appendChild(el);
  });
  afterEach(() => { el.remove(); });

  it('registers as specd-step-score', () => {
    expect(customElements.get('specd-step-score')).toBeDefined();
  });

  it('fills step+1 segments for the tier (good = 4 filled of 5)', async () => {
    el.setAttribute('tier', 'good');
    await el.updateComplete;
    const segs = el.querySelectorAll('.step-seg');
    expect(segs.length).toBe(5);
    expect(el.querySelectorAll('.step-seg.on').length).toBe(4);
  });

  it('fills all 5 for great and 1 for bad', async () => {
    el.setAttribute('tier', 'great');
    await el.updateComplete;
    expect(el.querySelectorAll('.step-seg.on').length).toBe(5);
    el.setAttribute('tier', 'bad');
    await el.updateComplete;
    expect(el.querySelectorAll('.step-seg.on').length).toBe(1);
  });

  it('shows the tier word label by default and hides it with nolabel', async () => {
    el.setAttribute('tier', 'ok');
    await el.updateComplete;
    expect(el.querySelector('.step-score-label')?.textContent).toBe('ok');
    el.setAttribute('nolabel', '');
    await el.updateComplete;
    expect(el.querySelector('.step-score-label')).toBeNull();
  });
});
