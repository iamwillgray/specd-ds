import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../components/DataTable/SpecdDataTable.js';

const meta: Meta = {
  title: 'Pages/ComponentsTab',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const COLUMNS = JSON.stringify([
  { key: 'name',        label: 'Component',     sortable: true },
  { key: 'desc',        label: 'Description',   sortable: true },
  { key: 'docLink',     label: 'Doc Link' },
  { key: 'tokenCov',    label: 'Token cov.',    sortable: true },
  { key: 'devStatus',   label: 'Dev status' },
  { key: 'published',   label: 'Published' },
]);

const ROWS = JSON.stringify([
  { name: 'Button/Primary',    desc: '✓',  docLink: '✓', tokenCov: '94%', devStatus: 'Ready',       published: '✓' },
  { name: 'Button/Ghost',      desc: '✓',  docLink: '✓', tokenCov: '91%', devStatus: 'Ready',       published: '✓' },
  { name: 'Card/Elevated',     desc: '—',  docLink: '—', tokenCov: '74%', devStatus: 'In progress', published: '✓' },
  { name: 'Card/Flat',         desc: '✓',  docLink: '✓', tokenCov: '88%', devStatus: 'Ready',       published: '✓' },
  { name: 'Input/Default',     desc: '—',  docLink: '—', tokenCov: '41%', devStatus: 'In progress', published: '—' },
  { name: 'Toggle/Switch',     desc: '✓',  docLink: '✓', tokenCov: '82%', devStatus: 'Ready',       published: '✓' },
  { name: 'Modal/Overlay',     desc: '✓',  docLink: '—', tokenCov: '55%', devStatus: 'Review',      published: '✓' },
  { name: 'Icon/Arrow/Right',  desc: '—',  docLink: '—', tokenCov: '100%', devStatus: 'Ready',      published: '✓' },
]);

const componentContent = () => html`
  <div style="width:360px; background:var(--bg, #f8f9fc); min-height:400px; overflow-y:auto; font-family:var(--font, Inter, sans-serif);">
    <div style="padding:10px 12px 0;">
      <div style="font-family:var(--font-mono, 'IBM Plex Mono', monospace); font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-muted, #6b7280); margin-bottom:8px;">
        147 components · 8 shown
      </div>
    </div>
    <specd-data-table
      .columns=${COLUMNS}
      .rows=${ROWS}
    ></specd-data-table>
  </div>
`;

const rawContent = () => html`
  <div style="width:360px; background:var(--bg, #f8f9fc); min-height:400px; overflow-y:auto; font-family:var(--font, Inter, sans-serif);">
    <div style="padding:10px 12px 0;">
      <div style="font-family:var(--font-mono, 'IBM Plex Mono', monospace); font-size:10px; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; color:var(--text-muted, #6b7280); margin-bottom:8px;">
        147 components · 8 shown
      </div>
    </div>
    <div class="comp-table-container">
      <div class="comp-toolbar">
        <input class="input table-search" type="text" placeholder="Search components…" />
      </div>
      <div class="comp-table-wrap">
        <table class="comp-table">
          <thead>
            <tr>
              <th class="sortable" style="min-width:120px;">Component</th>
              <th class="sortable">Description</th>
              <th>Doc Link</th>
              <th class="sortable">Token cov.</th>
              <th>Dev status</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Button/Primary</td>
              <td><span class="cov-status-chip tier-good">YES</span></td>
              <td><span class="cov-status-chip tier-good">YES</span></td>
              <td>94%</td>
              <td>Ready</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Button/Ghost</td>
              <td><span class="cov-status-chip tier-good">YES</span></td>
              <td><span class="cov-status-chip tier-good">YES</span></td>
              <td>91%</td>
              <td>Ready</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Card/Elevated</td>
              <td><span class="cov-status-chip tier-poor">NO</span></td>
              <td><span class="cov-status-chip tier-poor">NO</span></td>
              <td>74%</td>
              <td>In progress</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Card/Flat</td>
              <td><span class="cov-status-chip tier-good">YES</span></td>
              <td><span class="cov-status-chip tier-good">YES</span></td>
              <td>88%</td>
              <td>Ready</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Input/Default</td>
              <td><span class="cov-status-chip tier-poor">NO</span></td>
              <td><span class="cov-status-chip tier-poor">NO</span></td>
              <td>41%</td>
              <td>In progress</td>
              <td>—</td>
            </tr>
            <tr>
              <td>Toggle/Switch</td>
              <td><span class="cov-status-chip tier-good">YES</span></td>
              <td><span class="cov-status-chip tier-good">YES</span></td>
              <td>82%</td>
              <td>Ready</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Modal/Overlay</td>
              <td><span class="cov-status-chip tier-good">YES</span></td>
              <td><span class="cov-status-chip tier-poor">NO</span></td>
              <td>55%</td>
              <td>Review</td>
              <td>✓</td>
            </tr>
            <tr>
              <td>Icon/Arrow/Right</td>
              <td><span class="cov-status-chip tier-poor">NO</span></td>
              <td><span class="cov-status-chip tier-poor">NO</span></td>
              <td>100%</td>
              <td>Ready</td>
              <td>✓</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
`;

export const PluginView: Story = {
  name: 'Plugin View',
  parameters: { layout: 'padded' },
  render: () => html`
    <div style="padding:16px; background:var(--bg, #f8f9fc); min-height:100vh;">
      ${componentContent()}
    </div>
  `,
};

export const Compare: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => html`
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:0; min-height:100vh;">
      <div style="border-right:2px solid #dbeafe; padding:16px; background:var(--bg, #f8f9fc);">
        <p style="font:700 10px var(--font-mono, 'IBM Plex Mono', monospace); color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">
          Reference (CSS only)
        </p>
        ${rawContent()}
      </div>
      <div style="padding:16px; background:var(--bg, #f8f9fc);">
        <p style="font:700 10px var(--font-mono, 'IBM Plex Mono', monospace); color:#9ca3af; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 12px;">
          Component build
        </p>
        ${componentContent()}
      </div>
    </div>
  `,
};
