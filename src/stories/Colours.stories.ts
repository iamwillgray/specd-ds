import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Foundations/Colours',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const swatch = (name: string, value: string, textColor = '#0c1f3f') => html`
  <div style="display:flex; flex-direction:column; gap:6px; min-width:100px;">
    <div style="
      width:100%; height:52px; border-radius:var(--radius-sm);
      background:${value};
      border:1px solid rgba(0,0,0,0.08);
    "></div>
    <div style="font-family:var(--font); font-size:11px; font-weight:600; color:var(--text); line-height:1.2;">${name}</div>
    <div style="font-family:var(--font-mono); font-size:9px; color:var(--text-muted);">${value}</div>
  </div>
`;

const varSwatch = (label: string, varName: string, approx: string) => html`
  <div style="display:flex; align-items:center; gap:12px; padding:10px 16px; background:var(--surface); border-bottom:1px solid var(--border);">
    <div style="
      width:32px; height:32px; border-radius:var(--radius-sm); flex-shrink:0;
      background:var(${varName}); border:1px solid rgba(0,0,0,0.08);
    "></div>
    <div style="flex:1;">
      <div style="font-family:var(--font); font-size:12px; font-weight:600; color:var(--text);">${label}</div>
      <div style="font-family:var(--font-mono); font-size:9px; color:var(--text-muted); margin-top:2px;">${varName}</div>
    </div>
    <div style="font-family:var(--font-mono); font-size:10px; color:var(--text-subtle);">${approx}</div>
  </div>
`;

const heading = (text: string) => html`
  <h3 style="font-family:var(--font-heading); font-size:16px; font-weight:800; color:var(--text); letter-spacing:-0.01em; margin:32px 0 16px;">${text}</h3>
`;

export const Palette: Story = {
  name: 'Full Palette',
  render: () => html`
    <div style="padding:40px; max-width:960px; font-family:var(--font);">
      <h2 style="font-family:var(--font-heading); font-size:24px; font-weight:800; color:var(--text); letter-spacing:-0.02em; margin:0 0 6px;">Colour Palette</h2>
      <p style="font-size:12px; color:var(--text-muted); margin:0 0 32px; line-height:1.6;">All colour tokens available in the Specd DS.</p>

      ${heading('Brand')}
      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:8px;">
        ${swatch('navy',  '#0C1750')}
        ${swatch('brand / lime', '#b8ff57')}
      </div>

      ${heading('Blue Scale')}
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        ${swatch('blue-10',  '#f5f8ff')}
        ${swatch('blue-15',  '#eef3fb')}
        ${swatch('blue-20',  '#dbeafe')}
        ${swatch('blue-30',  '#b9d2f9')}
        ${swatch('blue-40',  '#6b9ae8')}
        ${swatch('blue-50',  '#1d4ed8')}
        ${swatch('blue-60',  '#4a6080')}
        ${swatch('blue-70',  '#2d4566')}
        ${swatch('blue-80',  '#1e3f6b')}
        ${swatch('blue-90',  '#162d56')}
        ${swatch('blue-100', '#0c1f3f')}
      </div>

      ${heading('Green Scale')}
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        ${swatch('green-10',  '#ebffe0')}
        ${swatch('green-50',  '#22c55e')}
        ${swatch('green-100', '#008531')}
      </div>

      ${heading('Red Scale')}
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        ${swatch('red-10',  '#fee2e2')}
        ${swatch('red-50',  '#f00013')}
        ${swatch('red-100', '#cd1d1d')}
      </div>

      ${heading('Orange Scale')}
      <div style="display:flex; gap:12px; flex-wrap:wrap;">
        ${swatch('orange-10',  '#FEF3C7')}
        ${swatch('orange-50',  '#ff912b')}
        ${swatch('orange-100', '#92400e')}
      </div>
    </div>
  `,
};

export const Semantic: Story = {
  name: 'Semantic Tokens',
  render: () => html`
    <div style="padding:40px; max-width:960px; font-family:var(--font);">
      <h2 style="font-family:var(--font-heading); font-size:24px; font-weight:800; color:var(--text); letter-spacing:-0.02em; margin:0 0 6px;">Semantic Tokens</h2>
      <p style="font-size:12px; color:var(--text-muted); margin:0 0 32px; line-height:1.6;">
        Always use semantic tokens in component code — never raw hex values.
      </p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px;">

        <div>
          ${heading('Surfaces')}
          <div style="border:1px solid var(--border); border-radius:var(--radius-md); overflow:hidden;">
            ${varSwatch('Background',    '--bg',            '#f5f8ff')}
            ${varSwatch('Surface',       '--surface',       '#ffffff')}
            ${varSwatch('Surface alt',   '--surface-alt',   '#eef3fb')}
            ${varSwatch('Surface hover', '--surface-hover', '#eef3fb')}
            ${varSwatch('Card bg',       '--card-bg',       '#ffffff')}
          </div>

          ${heading('Borders')}
          <div style="border:1px solid var(--border); border-radius:var(--radius-md); overflow:hidden;">
            ${varSwatch('Border',        '--border',         '#eef3fb')}
            ${varSwatch('Border blue',   '--border-blue',    '#dbeafe')}
            ${varSwatch('Border strong', '--border-strong',  '#b9d2f9')}
            ${varSwatch('Border primary','--border-primary', '#4a6080')}
          </div>
        </div>

        <div>
          ${heading('Text')}
          <div style="border:1px solid var(--border); border-radius:var(--radius-md); overflow:hidden;">
            ${varSwatch('Text primary',   '--text',           '#0c1f3f')}
            ${varSwatch('Text secondary', '--text-secondary', '#4a6080')}
            ${varSwatch('Text muted',     '--text-muted',     '#6B7280')}
            ${varSwatch('Text subtle',    '--text-subtle',    '#9CA3AF')}
            ${varSwatch('Text inverse',   '--text-inverse',   '#ffffff')}
          </div>

          ${heading('Intent')}
          <div style="border:1px solid var(--border); border-radius:var(--radius-md); overflow:hidden;">
            ${varSwatch('Positive light',  '--positive-light',  '#ebffe0')}
            ${varSwatch('Positive accent', '--positive-accent', '#22c55e')}
            ${varSwatch('Positive dark',   '--positive-dark',   '#008531')}
            ${varSwatch('Warning light',   '--warning-light',   '#FEF3C7')}
            ${varSwatch('Warning accent',  '--warning-accent',  '#ff912b')}
            ${varSwatch('Warning dark',    '--warning-dark',    '#92400e')}
            ${varSwatch('Negative light',  '--negative-light',  '#fee2e2')}
            ${varSwatch('Negative accent', '--negative-accent', '#f00013')}
            ${varSwatch('Negative dark',   '--negative-dark',   '#cd1d1d')}
            ${varSwatch('Neutral light',   '--neutral-light',   '#dbeafe')}
            ${varSwatch('Neutral accent',  '--neutral-accent',  '#1d4ed8')}
          </div>
        </div>

      </div>
    </div>
  `,
};

export const UsageGuide: Story = {
  name: 'Usage Guide',
  render: () => html`
    <div style="padding:40px; max-width:720px; font-family:var(--font);">
      <h2 style="font-family:var(--font-heading); font-size:24px; font-weight:800; color:var(--text); letter-spacing:-0.02em; margin:0 0 6px;">Usage Guide</h2>
      <p style="font-size:12px; color:var(--text-muted); margin:0 0 32px; line-height:1.6;">Rules for applying colour in Specd DS components.</p>

      <div style="display:flex; flex-direction:column; gap:16px;">
        ${[
          ['Navy (#0C1750)',       'Primary brand colour. Use for gradients, app header background, score ring strokes at 100%.',     '#0C1750'],
          ['Lime (#b8ff57)',       'Accent/CTA on dark backgrounds only. Never use on light surfaces — contrast ratio too low.',       '#b8ff57'],
          ['Blue-100 (#0c1f3f)',   'Primary text and icon colour on light surfaces.',                                                   '#0c1f3f'],
          ['Blue-60 (#4a6080)',    'Secondary text. Use for descriptions, subtitles, meta labels.',                                     '#4a6080'],
          ['Blue-50 (#1d4ed8)',    'Interactive accent — links, active highlights.',                                                    '#1d4ed8'],
          ['Surface (#fff)',       'Default card/panel background. Always use var(--surface) not a hardcoded hex.',                     '#ffffff'],
          ['BG (#f5f8ff)',         'Page/panel background. Never use pure white for layout backgrounds.',                               '#f5f8ff'],
          ['Green (positive)',     'Coverage 80%+, published, passing states. Use positive-light bg + positive-dark text.',             '#22c55e'],
          ['Orange (warning)',     'Coverage 50–79%, draft, stale states. Use warning-light bg + warning-dark text.',                   '#ff912b'],
          ['Red (negative)',       'Coverage <50%, critical issues, error states. Use negative-light bg + negative-dark text.',         '#f00013'],
        ].map(([name, rule, hex]) => html`
          <div style="display:flex; gap:16px; align-items:flex-start; padding:16px; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md);">
            <div style="width:36px; height:36px; border-radius:var(--radius-sm); background:${hex}; border:1px solid rgba(0,0,0,0.08); flex-shrink:0;"></div>
            <div>
              <div style="font-family:var(--font); font-size:12px; font-weight:700; color:var(--text); margin-bottom:4px;">${name}</div>
              <div style="font-family:var(--font); font-size:11px; color:var(--text-secondary); line-height:1.5;">${rule}</div>
            </div>
          </div>
        `)}
      </div>
    </div>
  `,
};
