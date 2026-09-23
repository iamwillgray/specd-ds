import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdDrawer');
});

async function makeElement(attrs: Record<string, string> = {}, children: Element[] = []): Promise<HTMLElement & { updateComplete: Promise<boolean>; open: boolean }> {
  const el = document.createElement('specd-drawer') as HTMLElement & { updateComplete: Promise<boolean>; open: boolean };
  children.forEach((c) => el.appendChild(c));
  document.body.appendChild(el); // connectedCallback fires here, capturing children
  for (const [k, v] of Object.entries(attrs)) {
    if (k === 'open') el.open = true;
    else el.setAttribute(k, v);
  }
  await el.updateComplete;
  return el;
}

function probeParagraph(text = 'Body content'): HTMLParagraphElement {
  const p = document.createElement('p');
  p.className = 'probe';
  p.textContent = text;
  return p;
}

function probeFooterButton(text = 'Save'): HTMLButtonElement {
  const btn = document.createElement('button');
  btn.className = 'probe';
  btn.setAttribute('slot', 'footer');
  btn.textContent = text;
  return btn;
}

describe('SpecdDrawer', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-drawer')).toBeDefined();
  });

  it('renders nothing when open=false', async () => {
    const el = await makeElement();
    expect(el.querySelector('.drawer-dialog')).toBeNull();
  });

  it('renders the dialog surface when open=true', async () => {
    const el = await makeElement({ open: '' });
    expect(el.querySelector('.drawer-dialog')).not.toBeNull();
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

  it('renders the dialog surface fresh on each open', async () => {
    const el = document.createElement('specd-drawer') as any;
    el.open = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.drawer-dialog')).not.toBeNull();
    el.remove();
  });

  // Regression coverage for the light-DOM slot bug: <slot> only works
  // inside a real shadow tree, and this component renders to light DOM
  // (createRenderRoot returns `this`) — so body/footer content must be
  // explicitly captured and re-parented, not left to <slot> to project.
  it('does not leak body content into the page while closed', async () => {
    const el = await makeElement({}, [probeParagraph()]);
    // Not inside the dialog surface (none rendered), and not a direct
    // visible child either — it should have been captured and detached
    // on connect.
    expect(el.querySelector('.probe')).toBeNull();
  });

  it('does not leak footer content into the page while closed', async () => {
    const el = await makeElement({}, [probeFooterButton()]);
    expect(el.querySelector('.probe')).toBeNull();
  });

  it('projects body content into .drawer-body when open', async () => {
    const el = await makeElement({ open: '' }, [probeParagraph('Body content')]);
    const body = el.querySelector('.drawer-body');
    expect(body?.querySelector('.probe')).not.toBeNull();
    expect(body?.querySelector('.probe')?.textContent).toBe('Body content');
  });

  it('projects slot="footer" content into .drawer-footer when open, not .drawer-body', async () => {
    const el = await makeElement({ open: '' }, [probeParagraph('Body'), probeFooterButton('Save')]);
    const body = el.querySelector('.drawer-body');
    const footer = el.querySelector('.drawer-footer');
    const bodyProbes = body ? body.querySelectorAll('.probe') : [];
    const footerProbes = footer ? footer.querySelectorAll('.probe') : [];
    expect(bodyProbes.length).toBe(1);
    expect(bodyProbes[0].tagName).toBe('P');
    expect(footerProbes.length).toBe(1);
    expect(footerProbes[0].tagName).toBe('BUTTON');
  });

  it('re-projects the same content correctly across close/reopen cycles', async () => {
    const el = await makeElement({ open: '' }, [probeParagraph('Body content')]);
    expect(el.querySelector('.drawer-body')?.querySelector('.probe')).not.toBeNull();
    el.open = false;
    await el.updateComplete;
    expect(el.querySelector('.drawer-dialog')).toBeNull();
    el.open = true;
    await el.updateComplete;
    expect(el.querySelector('.drawer-body')?.querySelector('.probe')).not.toBeNull();
  });
});
