import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdPropRow.js';

describe('SpecdPropRow', () => {
  let el: HTMLElement & { updateComplete: Promise<boolean> };

  beforeEach(() => {
    el = document.createElement('specd-prop-row') as HTMLElement & { updateComplete: Promise<boolean> };
    document.body.appendChild(el);
  });
  afterEach(() => { el.remove(); });

  it('registers as specd-prop-row', () => {
    expect(customElements.get('specd-prop-row')).toBeDefined();
  });

  it('renders name + summary + a type-keyed badge', async () => {
    el.setAttribute('name', 'size');
    el.setAttribute('ptype', 'VARIANT');
    el.setAttribute('summary', 'sm | md | lg');
    await el.updateComplete;
    expect(el.querySelector('.prop-row-name')?.textContent).toBe('size');
    expect(el.querySelector('.prop-row-summary')?.textContent).toBe('sm | md | lg');
    const badge = el.querySelector('.prop-row-badge');
    expect(badge?.textContent).toBe('Variant');
    expect(badge?.classList.contains('ptype-variant')).toBe(true);
  });

  it('maps INSTANCE_SWAP to the Instance label + instance_swap class', async () => {
    el.setAttribute('ptype', 'INSTANCE_SWAP');
    await el.updateComplete;
    const badge = el.querySelector('.prop-row-badge');
    expect(badge?.textContent).toBe('Instance');
    expect(badge?.classList.contains('ptype-instance_swap')).toBe(true);
  });

  it('omits the summary span when summary is empty', async () => {
    el.setAttribute('name', 'label');
    await el.updateComplete;
    expect(el.querySelector('.prop-row-summary')).toBeNull();
  });

  it('emits bubbling prop-edit and prop-remove events with the name', async () => {
    el.setAttribute('name', 'variant');
    await el.updateComplete;
    let edited: string | null = null;
    let removed: string | null = null;
    el.addEventListener('prop-edit', (e) => { edited = (e as CustomEvent).detail.name; });
    el.addEventListener('prop-remove', (e) => { removed = (e as CustomEvent).detail.name; });
    el.querySelector<HTMLButtonElement>('.prop-row-edit')!.click();
    el.querySelector<HTMLButtonElement>('.prop-row-remove')!.click();
    expect(edited).toBe('variant');
    expect(removed).toBe('variant');
  });
});
