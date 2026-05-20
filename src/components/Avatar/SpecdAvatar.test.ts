import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => {
  await import('./SpecdAvatar');
});

async function makeElement(attrs: Record<string, string> = {}): Promise<HTMLElement> {
  const el = document.createElement('specd-avatar') as HTMLElement & { updateComplete: Promise<boolean> };
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

describe('SpecdAvatar', () => {
  it('registers as a custom element', () => {
    expect(customElements.get('specd-avatar')).toBeDefined();
  });

  it('renders a root span with avatar class', async () => {
    const el = await makeElement({ name: 'Jane Doe' });
    const root = el.querySelector('span.avatar');
    expect(root).not.toBeNull();
  });

  it('applies avatar-md class by default', async () => {
    const el = await makeElement({ name: 'Test User' });
    expect(el.querySelector('span.avatar')?.className).toContain('avatar-md');
  });

  it('applies avatar-sm class for sm size', async () => {
    const el = await makeElement({ name: 'Test User', size: 'sm' });
    expect(el.querySelector('span.avatar')?.className).toContain('avatar-sm');
  });

  it('applies avatar-lg class for lg size', async () => {
    const el = await makeElement({ name: 'Test User', size: 'lg' });
    expect(el.querySelector('span.avatar')?.className).toContain('avatar-lg');
  });

  it('renders initials span when no src is provided', async () => {
    const el = await makeElement({ name: 'Jane Doe' });
    expect(el.querySelector('.avatar-initials')).not.toBeNull();
  });

  it('computes initials from first two words', async () => {
    const el = await makeElement({ name: 'Jane Doe' });
    expect(el.querySelector('.avatar-initials')?.textContent).toBe('JD');
  });

  it('computes single initial from single word name', async () => {
    const el = await makeElement({ name: 'Specd' });
    expect(el.querySelector('.avatar-initials')?.textContent).toBe('S');
  });

  it('renders an img element when src is provided', async () => {
    const el = await makeElement({ src: '/avatar.png', name: 'Jane Doe' });
    expect(el.querySelector('img.avatar-img')).not.toBeNull();
  });

  it('does not render initials when src is provided', async () => {
    const el = await makeElement({ src: '/avatar.png', name: 'Jane Doe' });
    expect(el.querySelector('.avatar-initials')).toBeNull();
  });

  it('sets img alt to name when alt is not provided', async () => {
    const el = await makeElement({ src: '/avatar.png', name: 'Jane Doe' });
    const img = el.querySelector('img') as HTMLImageElement | null;
    expect(img?.alt).toBe('Jane Doe');
  });

  it('sets img alt to explicit alt attribute when provided', async () => {
    const el = await makeElement({ src: '/avatar.png', name: 'Jane Doe', alt: 'Profile photo' });
    const img = el.querySelector('img') as HTMLImageElement | null;
    expect(img?.alt).toBe('Profile photo');
  });
});
