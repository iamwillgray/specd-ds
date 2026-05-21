import { describe, it, expect, beforeAll } from 'vitest';

beforeAll(async () => { await import('./SpecdAiGradientBtn.js'); });

describe('SpecdAiGradientBtn', () => {
  it('renders .btn-ai-gradient button', async () => {
    const el = document.createElement('specd-ai-gradient-btn') as any;
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.btn-ai-gradient')).not.toBeNull();
    el.remove();
  });

  it('renders .ai-text span with label', async () => {
    const el = document.createElement('specd-ai-gradient-btn') as any;
    el.label = 'Apply Fix';
    document.body.appendChild(el);
    await el.updateComplete;
    expect(el.querySelector('.ai-text')?.textContent?.trim()).toBe('Apply Fix');
    el.remove();
  });

  it('disables button when disabled=true', async () => {
    const el = document.createElement('specd-ai-gradient-btn') as any;
    el.disabled = true;
    document.body.appendChild(el);
    await el.updateComplete;
    expect((el.querySelector('.btn-ai-gradient') as HTMLButtonElement).disabled).toBe(true);
    el.remove();
  });
});
