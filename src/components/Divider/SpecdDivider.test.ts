import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdDivider');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement & { updateComplete: Promise<boolean> }> {
  const el = document.createElement('specd-divider') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdDivider', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-divider')).toBeDefined();
  });

  it('renders .divider', async () => {
    const el = await makeElement();
    expect(el.querySelector('.divider')).not.toBeNull();
  });

  it('renders label when set', async () => {
    const el = await makeElement({ label: 'Section' });
    expect(el.querySelector('.divider-label')?.textContent?.trim()).toBe('Section');
  });

  it('renders two .divider-line elements when label is set', async () => {
    const el = await makeElement({ label: 'Or' });
    expect(el.querySelectorAll('.divider-line').length).toBe(2);
  });

  it('renders two .divider-line elements when no label', async () => {
    const el = await makeElement();
    expect(el.querySelectorAll('.divider-line').length).toBe(2);
  });

  it('wrapper div has flex display and full width', async () => {
    const el = await makeElement();
    const wrapper = el.querySelector('.divider') as HTMLElement;
    expect(wrapper).not.toBeNull();
    expect(wrapper.style.display).toBe('flex');
    expect(wrapper.style.width).toBe('100%');
  });
});
