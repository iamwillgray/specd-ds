import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdStepper');
});

const STEPS = JSON.stringify([{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]);

async function makeElement(props: Record<string, unknown> = {}): Promise<HTMLElement & { updateComplete: Promise<boolean> }> {
  const el = document.createElement('specd-stepper') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(props)) {
    (el as any)[k] = v;
  }
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdStepper', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-stepper')).toBeDefined();
  });

  it('renders .stepper', async () => {
    const el = await makeElement({ steps: STEPS, current: 0 });
    expect(el.querySelector('.stepper')).not.toBeNull();
  });

  it('renders correct step count', async () => {
    const el = await makeElement({ steps: STEPS, current: 0 });
    expect(el.querySelectorAll('.step').length).toBe(3);
  });

  it('step before current has .done class', async () => {
    const el = await makeElement({ steps: STEPS, current: 2 });
    const steps = el.querySelectorAll('.step');
    expect(steps[0].className).toContain('done');
    expect(steps[1].className).toContain('done');
  });

  it('current step has .active class', async () => {
    const el = await makeElement({ steps: STEPS, current: 1 });
    const steps = el.querySelectorAll('.step');
    expect(steps[1].className).toContain('active');
  });

  it('steps after current have no state class', async () => {
    const el = await makeElement({ steps: STEPS, current: 0 });
    const steps = el.querySelectorAll('.step');
    expect(steps[1].className.trim()).toBe('step');
    expect(steps[2].className.trim()).toBe('step');
  });
});
