import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdIssueCard');
});

async function makeElement(attrs: Record<string, string | boolean> = {}): Promise<HTMLElement & { updateComplete: Promise<boolean> }> {
  const el = document.createElement('specd-issue-card') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdIssueCard', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-issue-card')).toBeDefined();
  });

  it('renders .issue-card-top', async () => {
    const el = await makeElement({ title: 'Button', severity: 'warn' });
    expect(el.querySelector('.issue-card-top')).not.toBeNull();
  });

  it('renders title text', async () => {
    const el = await makeElement({ title: 'Button/Primary', severity: 'info' });
    expect(el.textContent).toContain('Button/Primary');
  });

  it('renders component name when provided', async () => {
    const el = await makeElement({ title: 'Issue', component: 'MyComponent' });
    expect(el.textContent).toContain('MyComponent');
  });

  it('renders type chip when provided', async () => {
    const el = await makeElement({ title: 'Issue', type: 'Hard-coded colour' });
    expect(el.querySelector('.issue-type-chip')).not.toBeNull();
    expect(el.textContent).toContain('Hard-coded colour');
  });

  it('applies issue-crit class for crit severity', async () => {
    const el = await makeElement({ title: 'A', severity: 'crit' });
    expect(el.querySelector('.issue-crit')).not.toBeNull();
  });

  it('applies issue-warn class for warn severity', async () => {
    const el = await makeElement({ title: 'A', severity: 'warn' });
    expect(el.querySelector('.issue-warn')).not.toBeNull();
  });

  it('applies issue-info class for info severity', async () => {
    const el = await makeElement({ title: 'A', severity: 'info' });
    expect(el.querySelector('.issue-info')).not.toBeNull();
  });

  it('does not render detail panel when closed by default', async () => {
    const el = await makeElement({ title: 'Issue' });
    expect(el.querySelector('.issue-card-detail')).toBeNull();
  });

  it('renders detail panel when open attribute is set', async () => {
    const el = await makeElement({ title: 'Issue', open: 'true' });
    expect(el.querySelector('.issue-card-detail')).not.toBeNull();
  });

  // New tests for Task 7
  it('renders jump button in footer by default', async () => {
    const el = await makeElement({ title: 'Test issue', open: 'true' });
    expect(el.querySelector('.btn-jump')).not.toBeNull();
  });

  it('renders view-fixes button in footer by default', async () => {
    const el = await makeElement({ title: 'Test issue', open: 'true' });
    expect(el.querySelector('.btn-view-fixes')).not.toBeNull();
  });

  it('toggles open state when header is clicked', async () => {
    const el = await makeElement({ title: 'Test issue' });
    const card = el.querySelector('.issue-card-top') as HTMLElement;
    expect(el.getAttribute('data-open')).toBeNull();
    card.click();
    await el.updateComplete;
    expect(el.getAttribute('data-open')).toBe('true');
  });
});
