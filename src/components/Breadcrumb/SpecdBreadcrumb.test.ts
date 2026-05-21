import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdBreadcrumb');
});

async function makeElement(items: unknown[] = []): Promise<HTMLElement & { updateComplete: Promise<boolean> }> {
  const el = document.createElement('specd-breadcrumb') as HTMLElement & { updateComplete: Promise<boolean> };
  el.setAttribute('items', JSON.stringify(items));
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdBreadcrumb', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-breadcrumb')).toBeDefined();
  });

  it('renders .breadcrumb', async () => {
    const el = await makeElement([{ label: 'Home' }]);
    expect(el.querySelector('.breadcrumb')).not.toBeNull();
  });

  it('last item has .breadcrumb-current class', async () => {
    const el = await makeElement([{ label: 'Home', href: '/' }, { label: 'Components' }]);
    const last = el.querySelector('.breadcrumb-current');
    expect(last?.textContent?.trim()).toBe('Components');
  });

  it('earlier items have .breadcrumb-link class', async () => {
    const el = await makeElement([{ label: 'Home', href: '/' }, { label: 'Components' }]);
    const links = el.querySelectorAll('.breadcrumb-link');
    expect(links.length).toBe(1);
    expect(links[0].textContent?.trim()).toBe('Home');
  });

  it('separators appear between items', async () => {
    const el = await makeElement([{ label: 'A' }, { label: 'B' }, { label: 'C' }]);
    const seps = el.querySelectorAll('.breadcrumb-sep');
    expect(seps.length).toBe(2);
  });
});
