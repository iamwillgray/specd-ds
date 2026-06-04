import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdPropAlignRow.js';

describe('SpecdPropAlignRow', () => {
  let el: HTMLElement & { updateComplete: Promise<boolean> };

  beforeEach(() => {
    el = document.createElement('specd-prop-align-row') as HTMLElement & { updateComplete: Promise<boolean> };
    document.body.appendChild(el);
  });
  afterEach(() => { el.remove(); });

  it('registers as specd-prop-align-row', () => {
    expect(customElements.get('specd-prop-align-row')).toBeDefined();
  });

  it('renders name + detail + primary/secondary actions', async () => {
    el.setAttribute('propname', 'Style');
    el.setAttribute('detail', 'should be "Variant"');
    el.setAttribute('action', 'Rename → Variant');
    el.setAttribute('secondary', 'Assign to another…');
    await el.updateComplete;
    expect(el.querySelector('.prop-align-desc strong')?.textContent).toBe('Style');
    expect(el.textContent).toContain('should be "Variant"');
    const btns = el.querySelectorAll('.prop-align-actions button');
    expect(btns.length).toBe(2);
    expect(btns[0].textContent?.trim()).toBe('Rename → Variant');
    expect(btns[1].textContent?.trim()).toBe('Assign to another…');
  });

  it('omits the secondary button when not set', async () => {
    el.setAttribute('propname', 'icon');
    el.setAttribute('action', 'Use preset');
    await el.updateComplete;
    expect(el.querySelectorAll('.prop-align-actions button').length).toBe(1);
  });

  it('emits bubbling prop-fix / prop-assign with the prop name', async () => {
    el.setAttribute('propname', 'mood');
    el.setAttribute('action', 'Use status');
    el.setAttribute('secondary', 'Keep state');
    await el.updateComplete;
    let fixed: string | null = null, assigned: string | null = null;
    el.addEventListener('prop-fix', (e) => { fixed = (e as CustomEvent).detail.propname; });
    el.addEventListener('prop-assign', (e) => { assigned = (e as CustomEvent).detail.propname; });
    el.querySelectorAll<HTMLButtonElement>('.prop-align-actions button')[0].click();
    el.querySelectorAll<HTMLButtonElement>('.prop-align-actions button')[1].click();
    expect(fixed).toBe('mood');
    expect(assigned).toBe('mood');
  });

  it('disables the primary action in the done state', async () => {
    el.setAttribute('propname', 'Style');
    el.setAttribute('action', 'Renamed ✓');
    el.setAttribute('done', '');
    await el.updateComplete;
    const btn = el.querySelector<HTMLButtonElement>('.prop-align-actions button');
    expect(btn?.disabled).toBe(true);
    expect(btn?.classList.contains('is-applied')).toBe(true);
  });
});
