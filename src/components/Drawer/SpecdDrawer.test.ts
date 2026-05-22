import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdDrawer');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement & { updateComplete: Promise<boolean> }> {
  const el = document.createElement('specd-drawer') as HTMLElement & { updateComplete: Promise<boolean>; open: boolean };
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'open') (el as any).open = true;
    else el.setAttribute(k, v);
  }
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdDrawer', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-drawer')).toBeDefined();
  });

  it('renders nothing when open=false', async () => {
    const el = await makeElement();
    expect(el.querySelector('.drawer-backdrop')).toBeNull();
  });

  it('renders <dialog> when open=true', async () => {
    const el = await makeElement({ open: '' });
    expect(el.querySelector('dialog')).not.toBeNull();
  });

  it('renders .drawer-panel when open=true', async () => {
    const el = await makeElement({ open: '' });
    expect(el.querySelector('.drawer-panel')).not.toBeNull();
  });

  it('renders title text', async () => {
    const el = await makeElement({ open: '', title: 'Drawer Title' });
    expect(el.querySelector('.drawer-title')?.textContent?.trim()).toBe('Drawer Title');
  });

  it('fires specd-close on close button click', async () => {
    const el = await makeElement({ open: '' });
    let fired = false;
    el.addEventListener('specd-close', () => { fired = true; });
    const btn = el.querySelector('.modal-close-btn') as HTMLButtonElement;
    btn.click();
    expect(fired).toBe(true);
  });

  it('renders a <dialog> element', async () => {
    const el = document.createElement('specd-drawer') as any;
    el.open = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('dialog')).not.toBeNull();
    el.remove();
  });
});
