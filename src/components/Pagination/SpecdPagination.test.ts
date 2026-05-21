import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdPagination');
});

async function makeElement(props: Record<string, unknown> = {}): Promise<HTMLElement & { updateComplete: Promise<boolean> }> {
  const el = document.createElement('specd-pagination') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(props)) {
    (el as any)[k] = v;
  }
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdPagination', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-pagination')).toBeDefined();
  });

  it('renders .pagination', async () => {
    const el = await makeElement({ page: 1, total: 100, pagesize: 20 });
    expect(el.querySelector('.pagination')).not.toBeNull();
  });

  it('prev button is disabled on page 1', async () => {
    const el = await makeElement({ page: 1, total: 100, pagesize: 20 });
    const buttons = el.querySelectorAll('button.page-btn');
    const prev = buttons[0] as HTMLButtonElement;
    expect(prev.disabled).toBe(true);
  });

  it('next button is disabled on last page', async () => {
    const el = await makeElement({ page: 5, total: 100, pagesize: 20 });
    const buttons = el.querySelectorAll('button.page-btn');
    const next = buttons[buttons.length - 1] as HTMLButtonElement;
    expect(next.disabled).toBe(true);
  });

  it('active page has .active class', async () => {
    const el = await makeElement({ page: 2, total: 50, pagesize: 10 });
    const activeBtn = el.querySelector('button.page-btn.active');
    expect(activeBtn?.textContent?.trim()).toBe('2');
  });

  it('fires specd-page-change on page click', async () => {
    const el = await makeElement({ page: 1, total: 50, pagesize: 10 });
    let detail: unknown = null;
    el.addEventListener('specd-page-change', (e) => { detail = (e as CustomEvent).detail; });
    const buttons = el.querySelectorAll('button.page-btn');
    // Click page 2 (index 2 after prev button)
    (buttons[2] as HTMLButtonElement).click();
    await el.updateComplete;
    expect((detail as any)?.page).toBe(2);
  });
});
