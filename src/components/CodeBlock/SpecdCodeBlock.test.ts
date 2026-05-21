import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdCodeBlock');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement & { updateComplete: Promise<boolean> }> {
  const el = document.createElement('specd-code-block') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdCodeBlock', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-code-block')).toBeDefined();
  });

  it('renders .code-block', async () => {
    const el = await makeElement({ code: 'const x = 1;' });
    expect(el.querySelector('.code-block')).not.toBeNull();
  });

  it('renders copy button', async () => {
    const el = await makeElement({ code: 'hello' });
    expect(el.querySelector('.code-block-copy')).not.toBeNull();
  });

  it('renders code text', async () => {
    const el = await makeElement({ code: 'const x = 42;' });
    expect(el.querySelector('code')?.textContent?.trim()).toBe('const x = 42;');
  });

  it('fires specd-copy event on button click', async () => {
    const el = await makeElement({ code: 'copy me' });
    let detail: unknown = null;
    el.addEventListener('specd-copy', (e) => { detail = (e as CustomEvent).detail; });
    const btn = el.querySelector('.code-block-copy') as HTMLButtonElement;
    btn.click();
    await new Promise(r => setTimeout(r, 10));
    expect((detail as any)?.code).toBe('copy me');
  });
});
