import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdPropFixRow.js');
  await import('./SpecdPropFixSlot.js');
  await import('./SpecdPropFixCreate.js');
});

describe('SpecdPropFixRow', () => {
  it('renders .prop-fix-row with .prop-fix-hdr', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.prop = 'fill';
    el.layer = 'Button/Primary/Default';
    el.attr = 'background fill';
    el.count = '1 layer';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-row')).not.toBeNull();
    expect(el.querySelector('.prop-fix-hdr')).not.toBeNull();
    el.remove();
  });

  it('renders .prop-fix-layer button with layer text', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.layer = 'Input/Text/Default';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-layer')?.textContent?.trim()).toBe('Input/Text/Default');
    el.remove();
  });

  it('renders .prop-fix-attr with attr text', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.attr = 'border stroke';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-attr')?.textContent?.trim()).toBe('border stroke');
    el.remove();
  });

  it('renders .prop-fix-count with count text', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.count = '3 layers';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-count')?.textContent?.trim()).toBe('3 layers');
    el.remove();
  });

  it('renders .prop-fix-icon with SVG', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.prop = 'fill';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-icon svg')).not.toBeNull();
    el.remove();
  });

  it('fires specd-layer-jump when layer button is clicked', async () => {
    const el = document.createElement('specd-prop-fix-row') as any;
    el.layer = 'Button/Primary';
    document.body.appendChild(el);
    await el.updateComplete;
    let fired = false;
    el.addEventListener('specd-layer-jump', () => { fired = true; });
    el.querySelector('.prop-fix-layer').click();
    expect(fired).toBe(true);
    el.remove();
  });
});

describe('SpecdPropFixSlot', () => {
  it('renders .prop-fix-slot with current value', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.current = '#3b82f6';
    el.varname = 'color/brand/blue';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-slot')).not.toBeNull();
    expect(el.querySelector('.prop-fix-current')?.textContent).toContain('#3b82f6');
    el.remove();
  });

  it('renders color swatch when currentcolor is set', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.current = '#3b82f6';
    el.currentcolor = '#3b82f6';
    el.varname = 'color/brand/blue';
    document.body.appendChild(el);
    await el.updateComplete;
    // currentcolor swatch is a span with inline style inside .prop-fix-current
    const currentEl = el.querySelector('.prop-fix-current');
    expect(currentEl?.querySelector('span[style]')).not.toBeNull();
    el.remove();
  });

  it('renders .prop-fix-varname (via prop-fix-layer-link) with variable name', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.varname = 'color/border/default';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-layer-link')?.textContent?.trim()).toBe('color/border/default');
    el.remove();
  });

  it('renders .prop-fix-match-tag with matchtype class', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.varname = 'color/brand/blue';
    el.matchtype = 'exact';
    document.body.appendChild(el);
    await el.updateComplete;
    const tag = el.querySelector('.prop-fix-match-tag');
    expect(tag).not.toBeNull();
    expect(tag?.classList.contains('exact')).toBe(true);
    el.remove();
  });

  it('shows Applied state when applied=true', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.varname = 'spacing/300';
    el.applied = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.prop-fix-btn.applied')).not.toBeNull();
    el.remove();
  });

  it('fires specd-apply with varname on Apply click', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.varname = 'color/lime/400';
    document.body.appendChild(el);
    await el.updateComplete;
    let detail: any = null;
    el.addEventListener('specd-apply', (e: any) => { detail = e.detail; });
    el.querySelector('.prop-fix-btn').click();
    expect(detail?.varname).toBe('color/lime/400');
    el.remove();
  });

  it('fires specd-jump when prop-fix-layer-link is clicked', async () => {
    const el = document.createElement('specd-prop-fix-slot') as any;
    el.varname = 'color/brand/blue';
    document.body.appendChild(el);
    await el.updateComplete;
    let fired = false;
    el.addEventListener('specd-jump', () => { fired = true; });
    el.querySelector('.prop-fix-layer-link').click();
    expect(fired).toBe(true);
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
