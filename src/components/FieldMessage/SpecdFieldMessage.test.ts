import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './SpecdFieldMessage.js';

describe('SpecdFieldMessage', () => {
  let el: HTMLElement;

  beforeEach(() => {
    el = document.createElement('specd-field-message');
    document.body.appendChild(el);
  });

  afterEach(() => { el.remove(); });

  it('renders field-message class (not form-hint)', async () => {
    el.setAttribute('message', 'Helper text');
    await (el as any).updateComplete;
    expect(el.querySelector('.field-message')).toBeTruthy();
    expect(el.querySelector('.form-hint')).toBeNull();
  });

  it('adds error class for error type', async () => {
    el.setAttribute('type', 'error');
    el.setAttribute('message', 'Something went wrong');
    await (el as any).updateComplete;
    const div = el.querySelector('.field-message');
    expect(div?.classList.contains('error')).toBe(true);
  });

  it('adds success class for success type', async () => {
    el.setAttribute('type', 'success');
    el.setAttribute('message', 'Saved');
    await (el as any).updateComplete;
    const div = el.querySelector('.field-message');
    expect(div?.classList.contains('success')).toBe(true);
  });

  it('renders an SVG icon for error type', async () => {
    el.setAttribute('type', 'error');
    el.setAttribute('message', 'Something went wrong');
    await (el as any).updateComplete;
    expect(el.querySelector('svg')).toBeTruthy();
  });

  it('renders an SVG icon for success type', async () => {
    el.setAttribute('type', 'success');
    el.setAttribute('message', 'Saved');
    await (el as any).updateComplete;
    expect(el.querySelector('svg')).toBeTruthy();
  });

  it('renders no icon for hint type', async () => {
    el.setAttribute('type', 'hint');
    el.setAttribute('message', 'Just a hint');
    await (el as any).updateComplete;
    expect(el.querySelector('svg')).toBeNull();
  });
});
