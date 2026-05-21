import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Foundations/Typography',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const row = (label: string, styles: string, sample: string, spec: string) => html`
  <tr>
    <td style="padding:16px 20px 16px 0; border-bottom:1px solid var(--border); white-space:nowrap; color:var(--text-muted); font-family:var(--font-mono); font-size:10px; vertical-align:middle;">
      ${label}
    </td>
    <td style="padding:16px 20px 16px 0; border-bottom:1px solid var(--border); vertical-align:middle;">
      <span style=${styles}>${sample}</span>
    </td>
    <td style="padding:16px 0; border-bottom:1px solid var(--border); vertical-align:middle; font-family:var(--font-mono); font-size:10px; color:var(--text-secondary); white-space:pre; line-height:1.8;">
      ${spec}
    </td>
  </tr>
`;

export const TypeScale: Story = {
  name: 'Type Scale',
  render: () => html`
    <div style="padding:40px; max-width:900px; font-family:var(--font);">
      <h2 style="font-family:var(--font-heading); font-size:24px; font-weight:800; color:var(--text); letter-spacing:-0.02em; margin:0 0 6px;">Type Scale</h2>
      <p style="font-size:12px; color:var(--text-muted); margin:0 0 32px; line-height:1.6;">
        All sizes use pixel values matched to the Specd plugin viewport (320 × 568px). Base size is 12px.
      </p>
      <table style="width:100%; border-collapse:collapse;">
        <thead>
          <tr>
            <th style="text-align:left; font-family:var(--font-mono); font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); padding:0 20px 12px 0; border-bottom:2px solid var(--border-strong);">Token</th>
            <th style="text-align:left; font-family:var(--font-mono); font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); padding:0 20px 12px 0; border-bottom:2px solid var(--border-strong);">Sample</th>
            <th style="text-align:left; font-family:var(--font-mono); font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); padding:0 0 12px; border-bottom:2px solid var(--border-strong);">Spec</th>
          </tr>
        </thead>
        <tbody>
          ${row('--text-xs',   'font-size:10px; font-family:var(--font); color:var(--text);',   'The quick brown fox',   'Inter  10px  reg 400')}
          ${row('--text-sm',   'font-size:11px; font-family:var(--font); color:var(--text);',   'The quick brown fox',   'Inter  11px  reg 400')}
          ${row('--text-base', 'font-size:12px; font-family:var(--font); color:var(--text);',   'The quick brown fox',   'Inter  12px  reg 400')}
          ${row('--text-md',   'font-size:13px; font-family:var(--font); color:var(--text);',   'The quick brown fox',   'Inter  13px  reg 400')}
          ${row('--text-lg',   'font-size:14px; font-family:var(--font); color:var(--text);',   'The quick brown fox',   'Inter  14px  reg 400')}
          ${row('--text-xl',   'font-size:16px; font-family:var(--font); color:var(--text);',   'The quick brown fox',   'Inter  16px  reg 400')}
          ${row('--text-2xl',  'font-size:20px; font-family:var(--font); color:var(--text);',   'The quick brown fox',   'Inter  20px  reg 400')}
          ${row('--text-3xl',  'font-size:24px; font-family:var(--font); color:var(--text);',   'The quick brown fox',   'Inter  24px  reg 400')}
          ${row('--text-4xl',  'font-size:32px; font-family:var(--font); color:var(--text);',   'The quick brown fox',   'Inter  32px  reg 400')}
        </tbody>
      </table>
    </div>
  `,
};

export const FontFamilies: Story = {
  name: 'Font Families',
  render: () => html`
    <div style="padding:40px; max-width:900px; font-family:var(--font);">
      <h2 style="font-family:var(--font-heading); font-size:24px; font-weight:800; color:var(--text); letter-spacing:-0.02em; margin:0 0 32px;">Font Families</h2>

      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:24px;">

        <div style="padding:24px; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md);">
          <div style="font-family:var(--font-mono); font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); margin-bottom:16px;">--font</div>
          <div style="font-family:var(--font); font-size:28px; font-weight:800; color:var(--text); letter-spacing:-0.03em; margin-bottom:8px;">Inter</div>
          <div style="font-family:var(--font); font-size:12px; color:var(--text-secondary); line-height:1.6; margin-bottom:16px;">
            The primary UI typeface. Used for all body copy, labels, buttons, and interface text throughout the plugin.
          </div>
          <div style="display:flex; flex-direction:column; gap:4px;">
            ${[400, 500, 600, 700, 800, 900].map(w => html`
              <span style="font-family:var(--font); font-size:13px; font-weight:${w}; color:var(--text);">
                ${w} — The quick brown fox
              </span>
            `)}
          </div>
        </div>

        <div style="padding:24px; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md);">
          <div style="font-family:var(--font-mono); font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); margin-bottom:16px;">--font-heading</div>
          <div style="font-family:var(--font-heading); font-size:28px; font-weight:800; color:var(--text); letter-spacing:-0.03em; margin-bottom:8px;">Bricolage Grotesque</div>
          <div style="font-family:var(--font); font-size:12px; color:var(--text-secondary); line-height:1.6; margin-bottom:16px;">
            Display typeface for section labels, score rings, stat tiles, and modal/drawer headers. Always bold.
          </div>
          <div style="display:flex; flex-direction:column; gap:4px;">
            ${[400, 600, 700, 800].map(w => html`
              <span style="font-family:var(--font-heading); font-size:13px; font-weight:${w}; color:var(--text);">
                ${w} — The quick brown fox
              </span>
            `)}
          </div>
        </div>

        <div style="padding:24px; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md);">
          <div style="font-family:var(--font-mono); font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--text-muted); margin-bottom:16px;">--font-mono</div>
          <div style="font-family:var(--font-mono); font-size:28px; font-weight:700; color:var(--text); letter-spacing:-0.02em; margin-bottom:8px;">IBM Plex Mono</div>
          <div style="font-family:var(--font); font-size:12px; color:var(--text-secondary); line-height:1.6; margin-bottom:16px;">
            Used for all data labels, badges, form field labels, token names, stat tile titles, and code snippets.
          </div>
          <div style="display:flex; flex-direction:column; gap:4px;">
            ${[400, 500, 600, 700].map(w => html`
              <span style="font-family:var(--font-mono); font-size:12px; font-weight:${w}; color:var(--text);">
                ${w} — 0123456789 ABCdef
              </span>
            `)}
          </div>
        </div>

      </div>
    </div>
  `,
};

export const UsagePatterns: Story = {
  name: 'Usage Patterns',
  render: () => html`
    <div style="padding:40px; max-width:900px; font-family:var(--font);">
      <h2 style="font-family:var(--font-heading); font-size:24px; font-weight:800; color:var(--text); letter-spacing:-0.02em; margin:0 0 6px;">Usage Patterns</h2>
      <p style="font-size:12px; color:var(--text-muted); margin:0 0 32px; line-height:1.6;">How typography maps to real component roles.</p>

      <div style="display:flex; flex-direction:column; gap:1px; border:1px solid var(--border); border-radius:var(--radius-md); overflow:hidden;">

        ${[
          ['Section label',      'font-family:var(--font-heading); font-size:15px; font-weight:800; letter-spacing:-0.01em;',        'Bricolage 15px 800 — heading',             '.section-label'],
          ['Modal / drawer hdr', 'font-family:var(--font-heading); font-size:16px; font-weight:800;',                                'Bricolage 16px 800 — modal-title',         '.modal-title'],
          ['Score ring num',     'font-family:var(--font-heading); font-size:42px; font-weight:900; letter-spacing:-0.03em;',        'Bricolage 42px 900 — score-number-lg',     '.score-number-lg'],
          ['Stat tile big num',  'font-family:var(--font-heading); font-size:56px; font-weight:800; letter-spacing:-0.04em;',        'Bricolage 56px 800 — stat-tile-lg-num',    '.stat-tile-lg-num'],
          ['Body / button',      'font-family:var(--font); font-size:12px; font-weight:600;',                                        'Inter 12px 600 — btn, chip, label',        '.btn-primary'],
          ['Issue title',        'font-family:var(--font); font-size:12px; font-weight:700; color:var(--text);',                     'Inter 12px 700 — issue-card-title',        '.issue-card-title'],
          ['Description text',   'font-family:var(--font); font-size:11px; font-weight:400; color:var(--text-secondary);',           'Inter 11px 400 — issue-card-desc',         '.issue-card-desc'],
          ['Form label',         'font-family:var(--font-mono); font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.06em;', 'Mono 10px 600 UC — form-label', '.form-label'],
          ['Stat tile title',    'font-family:var(--font-mono); font-size:12px; font-weight:500; letter-spacing:0.01em;',            'Mono 12px 500 — stat-tile-title',          '.stat-tile-title'],
          ['Badge / pill label', 'font-family:var(--font-mono); font-size:9px; font-weight:700; letter-spacing:0.04em;',             'Mono 9px 700 — cov-status-chip',           '.cov-status-chip'],
          ['Hint / help text',   'font-family:var(--font); font-size:11px; font-weight:400; color:var(--text-muted);',               'Inter 11px 400 muted — form-hint',         '.form-hint'],
        ].map(([role, style, spec, cls]) => html`
          <div style="display:grid; grid-template-columns:180px 1fr 180px 120px; align-items:center; gap:16px; padding:14px 20px; background:var(--surface); border-bottom:1px solid var(--border);">
            <span style="font-family:var(--font-mono); font-size:10px; color:var(--text-muted);">${role}</span>
            <span style=${style}>${spec.split(' — ')[1] ?? spec}</span>
            <span style="font-family:var(--font-mono); font-size:10px; color:var(--text-secondary);">${spec.split(' — ')[0]}</span>
            <span style="font-family:var(--font-mono); font-size:9px; color:var(--text-subtle);">${cls}</span>
          </div>
        `)}

      </div>
    </div>
  `,
};
