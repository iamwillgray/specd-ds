import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdPropFixRow.js');
  await import('./SpecdPropFixSlot.js');
  await import('./SpecdPropFixCreate.js');
});

describe('SpecdPropFixRow', () => {
  it('renders .prop-fix-row', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.prop = 'fill';
    el.current = '#b8ff57';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-row')).not.toBeNull();
    el.remove();
  });

  it('shows current value', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.prop = 'fill';
    el.current = '#b8ff57';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-current')?.textContent?.trim()).toBe('#b8ff57');
    el.remove();
  });
});

describe('SpecdPropFixSlot', () => {
  it('renders .prop-fix-slot with variable name', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.varname = 'color/primary/navy';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-slot')).not.toBeNull();
    expect(el.querySelector('.prop-fix-suggest')?.textContent?.trim()).toBe('color/primary/navy');
    el.remove();
  });

  it('fires specd-apply with varname on click', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.varname = 'color/lime';
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-apply', (e: any) => { detail = e.detail; });
    el.querySelector('.prop-fix-btn').click();
    expect(detail?.varname).toBe('color/lime');
    el.remove();
  });

  it('shows Applied label when selected=true', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.varname = 'color/primary';
    el.selected = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-btn')?.textContent?.trim()).toBe('Applied');
    el.remove();
  });
});

describe('SpecdPropFixCreate', () => {
  it('renders create label with value', async () => {
    const el = document.createElement('specd-prop-fix-create') as any;
    el.value = '#ff0000';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-create-label')?.textContent).toContain('#ff0000');
    el.remove();
  });

  it('fires specd-create on click', async () => {
    const el = document.createElement('specd-prop-fix-create') as any;
    el.value = '#cccccc';
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-create', (e: any) => { detail = e.detail; });
    el.querySelector('.prop-fix-btn').click();
    expect(detail?.value).toBe('#cccccc');
    el.remove();
  });
});
