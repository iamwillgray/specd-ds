import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdModal');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement & { updateComplete: Promise<boolean> }> {
  const el = document.createElement('specd-modal') as HTMLElement & { updateComplete: Promise<boolean>; open: boolean };
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'open') (el as any).open = true;
    else el.setAttribute(k, v);
  }
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdModal', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-modal')).toBeDefined();
  });

  it('renders nothing when open=false', async () => {
    const el = await makeElement();
    expect(el.querySelector('.modal-backdrop')).toBeNull();
  });

  it('renders dialog.modal-dialog when open=true', async () => {
    const el = await makeElement({ open: '' });
    expect(el.querySelector('dialog.modal-dialog')).not.toBeNull();
  });

  it('renders .modal-card when open=true', async () => {
    const el = await makeElement({ open: '' });
    expect(el.querySelector('.modal-card')).not.toBeNull();
  });

  it('renders title text', async () => {
    const el = await makeElement({ open: '', title: 'Test Title' });
    expect(el.querySelector('.modal-title')?.textContent?.trim()).toBe('Test Title');
  });

  it('renders .modal-close-btn', async () => {
    const el = await makeElement({ open: '' });
    expect(el.querySelector('.modal-close-btn')).not.toBeNull();
  });

  it('fires specd-close when close button clicked', async () => {
    const el = await makeElement({ open: '' });
    let fired = false;
    el.addEventListener('specd-close', () => { fired = true; });
    const btn = el.querySelector('.modal-close-btn') as HTMLButtonElement;
    btn.click();
    expect(fired).toBe(true);
  });

  it('sets open=false after close', async () => {
    const el = await makeElement({ open: '' });
    const btn = el.querySelector('.modal-close-btn') as HTMLButtonElement;
    btn.click();
    expect((el as any).open).toBe(false);
  });

  it('renders a <dialog> element', async () => {
    const el = document.createElement('specd-modal') as any;
    el.open = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('dialog')).not.toBeNull();
    el.remove();
  });

  it('dialog has aria-modal="true" and aria-labelledby when title set', async () => {
    const el = document.createElement('specd-modal') as any;
    el.open = true;
    el.title = 'Confirm action';
    document.body.appendChild(el);
    await el.updateComplete;
    const dialog = el.querySelector('dialog');
    expect(dialog?.getAttribute('aria-modal')).toBe('true');
    expect(dialog?.getAttribute('aria-labelledby')).toBe('modal-title');
    el.remove();
  });
});
