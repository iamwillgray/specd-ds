import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdRadioGroup');
});

const OPTIONS = JSON.stringify([
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
]);

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-radio-group') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdRadioGroup', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-radio-group')).toBeDefined();
  });

  it('renders .radio-group', async () => {
    const el = await makeElement({ options: OPTIONS, value: 'day', name: 'period' });
    expect(el.querySelector('.radio-group')).not.toBeNull();
  });

  it('renders correct radio count', async () => {
    const el = await makeElement({ options: OPTIONS, value: 'day', name: 'period' });
    expect(el.querySelectorAll('input[type="radio"]').length).toBe(3);
  });

  it('selected radio has checked attr', async () => {
    const el = await makeElement({ options: OPTIONS, value: 'week', name: 'period' });
    const radios = el.querySelectorAll('input[type="radio"]') as NodeListOf<HTMLInputElement>;
    expect(radios[1].checked).toBe(true);
    expect(radios[0].checked).toBe(false);
  });

  it('inline attr adds .inline class', async () => {
    const el = await makeElement({ options: OPTIONS, value: 'day', name: 'period', inline: '' });
    expect(el.querySelector('.radio-group')?.classList.contains('inline')).toBe(true);
  });

  it('fires specd-change with value', async () => {
    const el = await makeElement({ options: OPTIONS, value: 'day', name: 'period' });
    let eventDetail: { value: string } | null = null;
    el.addEventListener('specd-change', (e: Event) => {
      eventDetail = (e as CustomEvent).detail;
    });
    const radio = el.querySelectorAll('input[type="radio"]')[2] as HTMLInputElement;
    radio.dispatchEvent(new Event('change', { bubbles: true }));
    await (el as HTMLElement & { updateComplete: Promise<boolean> }).updateComplete;
    expect(eventDetail).not.toBeNull();
    expect(eventDetail!.value).toBe('month');
  });
});
