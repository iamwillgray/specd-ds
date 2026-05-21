import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdCheckboxGroup');
});

const OPTIONS = JSON.stringify([
  { value: 'colours', label: 'Colours' },
  { value: 'spacing', label: 'Spacing' },
  { value: 'text', label: 'Text' },
]);

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-checkbox-group') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdCheckboxGroup', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-checkbox-group')).toBeDefined();
  });

  it('renders .checkbox-group', async () => {
    const el = await makeElement({ options: OPTIONS, values: '[]' });
    expect(el.querySelector('.checkbox-group')).not.toBeNull();
  });

  it('renders correct count', async () => {
    const el = await makeElement({ options: OPTIONS, values: '[]' });
    expect(el.querySelectorAll('input[type="checkbox"]').length).toBe(3);
  });

  it('checked items have checked attr', async () => {
    const el = await makeElement({ options: OPTIONS, values: JSON.stringify(['colours', 'text']) });
    const checkboxes = el.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    expect(checkboxes[0].checked).toBe(true);
    expect(checkboxes[1].checked).toBe(false);
    expect(checkboxes[2].checked).toBe(true);
  });

  it('inline adds class', async () => {
    const el = await makeElement({ options: OPTIONS, values: '[]', inline: '' });
    expect(el.querySelector('.checkbox-group')?.classList.contains('inline')).toBe(true);
  });

  it('fires specd-change with updated values array', async () => {
    const el = await makeElement({ options: OPTIONS, values: JSON.stringify(['colours']) });
    let eventDetail: { values: string[] } | null = null;
    el.addEventListener('specd-change', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });
    const checkbox = el.querySelectorAll('input[type="checkbox"]')[1] as HTMLInputElement;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
    await (el as HTMLElement & { updateComplete: Promise<boolean> }).updateComplete;
    expect(eventDetail).not.toBeNull();
    expect(eventDetail!.values).toContain('colours');
    expect(eventDetail!.values).toContain('spacing');
  });
});
