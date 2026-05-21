import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdIssueCard');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-issue-card') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdIssueCard', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-issue-card')).toBeDefined();
  });

  it('renders .issue-card', async () => {
    const el = await makeElement({ name: 'Button', count: '2', severity: 'warn' });
    expect(el.querySelector('.issue-card')).not.toBeNull();
  });

  it('renders .issue-content', async () => {
    const el = await makeElement({ name: 'Button', count: '2', severity: 'warn' });
    expect(el.querySelector('.issue-content')).not.toBeNull();
  });

  it('renders name text', async () => {
    const el = await makeElement({ name: 'Button/Primary', count: '1', severity: 'info' });
    expect(el.textContent).toContain('Button/Primary');
  });

  it('renders count text', async () => {
    const el = await makeElement({ name: 'Card', count: '3', severity: 'warn' });
    expect(el.textContent).toContain('3');
  });

  it('applies crit class to count pill', async () => {
    const el = await makeElement({ name: 'A', count: '1', severity: 'crit' });
    const pill = el.querySelector('.issue-card-count');
    expect(pill?.className).toContain('crit');
  });

  it('applies warn class to count pill', async () => {
    const el = await makeElement({ name: 'A', count: '1', severity: 'warn' });
    const pill = el.querySelector('.issue-card-count');
    expect(pill?.className).toContain('warn');
  });

  it('applies info class to count pill', async () => {
    const el = await makeElement({ name: 'A', count: '1', severity: 'info' });
    const pill = el.querySelector('.issue-card-count');
    expect(pill?.className).toContain('info');
  });

  it('renders tags when provided', async () => {
    const tags = JSON.stringify([{ label: 'No Description', severity: 'crit' }]);
    const el = await makeElement({ name: 'X', count: '1', severity: 'crit', tags });
    expect(el.querySelector('.issue-tag-row')).not.toBeNull();
    expect(el.textContent).toContain('No Description');
  });

  it('omits tag-row when tags is empty', async () => {
    const el = await makeElement({ name: 'X', count: '1', severity: 'info', tags: '[]' });
    expect(el.querySelector('.issue-tag-row')).toBeNull();
  });

  it('renders .issue-card-footer slot', async () => {
    const el = await makeElement({ name: 'X', count: '1', severity: 'info' });
    expect(el.querySelector('.issue-card-footer')).not.toBeNull();
  });
});
