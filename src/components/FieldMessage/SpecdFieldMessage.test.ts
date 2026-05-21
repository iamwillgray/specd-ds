import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdFieldMessage.js'); });

describe('SpecdFieldMessage', () => {
  it('renders .form-hint element', async () => {
    const el = document.createElement('specd-field-message') as any;
    el.message = 'Help text';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.form-hint')).not.toBeNull();
    el.remove();
  });

  it('adds error class when type=error', async () => {
    const el = document.createElement('specd-field-message') as any;
    el.type = 'error';
    el.message = 'Required';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.form-hint')?.className).toContain('error');
    el.remove();
  });

  it('adds success class when type=success', async () => {
    const el = document.createElement('specd-field-message') as any;
    el.type = 'success';
    el.message = 'Saved!';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.form-hint')?.className).toContain('success');
    el.remove();
  });
});
