import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import '../../components/Input/SpecdInput.js';
import '../../components/Toggle/SpecdToggle.js';
import '../../components/FormRow/SpecdFormRow.js';
import '../../components/SectionLabel/SpecdSectionLabel.js';
import '../../components/Button/SpecdButton.js';

const meta: Meta = {
  title: 'Pages/SettingsTab',
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj;

const ICON_LOCK = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
const ICON_PLUS = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;

const componentContent = () => html`
  <div style="width:360px; background:var(--bg, #f8f9fc); min-height:500px; overflow-y:auto; font-family:var(--font, Inter, sans-serif);">
    <div style="padding:12px 14px; display:flex; flex-direction:column; gap:20px;">

      <!-- Section 1: Figma API Token -->
      <div>
        <specd-section-label label="Figma API Token" hint="Required for REST API enrichment (descriptions, publish status)"></specd-section-label>
        <div class="card" style="margin-top:8px;">
          <div class="card-inner">
            <specd-form-row label="Personal Access Token" hint="Found in Figma account settings › Security">
              <specd-input type="password" placeholder="figd_…" id="pat-input"></specd-input>
            </specd-form-row>
            <div style="margin-top:10px; display:flex; gap:8px;">
              <specd-button variant="primary" size="sm" label="Connect token" icon=${ICON_LOCK}></specd-button>
              <specd-button variant="ghost" size="sm" label="Clear"></specd-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 2: Scan Options -->
      <div>
        <specd-section-label label="Scan Options"></specd-section-label>
        <div class="card" style="margin-top:8px;">
          <div style="padding:0 14px;">
            <label class="toggle-row">
              <div class="toggle-row-text">
                <div class="toggle-row-label">Ignore hidden layers</div>
                <div class="toggle-row-hint">Excludes hidden layers from token coverage checks</div>
              </div>
              <specd-toggle id="toggle-hidden" checked aria-label="Ignore hidden layers"></specd-toggle>
            </label>
            <label class="toggle-row">
              <div class="toggle-row-text">
                <div class="toggle-row-label">Include nested libraries</div>
                <div class="toggle-row-hint">Scan components from all enabled team libraries</div>
              </div>
              <specd-toggle id="toggle-nested" aria-label="Include nested libraries"></specd-toggle>
            </label>
            <label class="toggle-row">
              <div class="toggle-row-text">
                <div class="toggle-row-label">Include unpublished components</div>
                <div class="toggle-row-hint">Also audit components not yet published to the library</div>
              </div>
              <specd-toggle id="toggle-unpublished" aria-label="Include unpublished components"></specd-toggle>
            </label>
          </div>
        </div>
      </div>

      <!-- Section 3: Connected Libraries -->
      <div>
        <specd-section-label label="Connected Libraries" hint="Libraries to include in the next scan"></specd-section-label>
        <div class="card" style="margin-top:8px;">
          <div class="empty-state">
            <div class="empty-state-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <p class="empty-state-title">No libraries connected</p>
            <p class="empty-state-desc">Connect a team library to include its components in the audit scan.</p>
            <specd-button
              variant="primary"
              size="sm"
              label="Add library"
              icon=${ICON_PLUS}
              style="margin-top:4px;"
            ></specd-button>
          </div>
        </div>
      </div>

    </div>
  </div>
`;

const rawContent = () => html`
  <div style="width:360px; background:var(--bg, #f8f9fc); min-height:500px; overflow-y:auto; font-family:var(--font, Inter, sans-serif);">
    <div style="padding:12px 14px; display:flex; flex-direction:column; gap:20px;">

      <!-- Section 1: Figma API Token -->
      <div>
        <div class="section-label">Figma API Token</div>
        <div class="section-label-hint">Required for REST API enrichment (descriptions, publish status)</div>
        <div class="card" style="margin-top:8px;">
          <div class="card-inner">
            <div class="form-row">
              <label class="form-label" for="pat-raw">Personal Access Token</label>
              <div class="input-group">
                <input class="input" id="pat-raw" type="password" placeholder="figd_…" />
                <button class="input-reveal" type="button">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
              </div>
              <div class="form-hint">Found in Figma account settings › Security</div>
            </div>
            <div style="margin-top:10px; display:flex; gap:8px;">
              <button class="btn-primary btn-sm">
                <span class="btn-icon">${ICON_LOCK}</span>
                <span class="btn-label">Connect token</span>
              </button>
              <button class="btn-ghost btn-sm">
                <span class="btn-label">Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section 2: Scan Options -->
      <div>
        <div class="section-label">Scan Options</div>
        <div class="card" style="margin-top:8px;">
          <div style="padding:0 14px;">
            <label class="toggle-row">
              <div class="toggle-row-text">
                <div class="toggle-row-label">Ignore hidden layers</div>
                <div class="toggle-row-hint">Excludes hidden layers from token coverage checks</div>
              </div>
              <label class="toggle">
                <input type="checkbox" role="switch" checked />
                <span class="toggle-track"><span class="toggle-thumb"></span></span>
              </label>
            </label>
            <label class="toggle-row">
              <div class="toggle-row-text">
                <div class="toggle-row-label">Include nested libraries</div>
                <div class="toggle-row-hint">Scan components from all enabled team libraries</div>
              </div>
              <label class="toggle">
                <input type="checkbox" role="switch" />
                <span class="toggle-track"><span class="toggle-thumb"></span></span>
              </label>
            </label>
            <label class="toggle-row">
              <div class="toggle-row-text">
                <div class="toggle-row-label">Include unpublished components</div>
                <div class="toggle-row-hint">Also audit components not yet published to the library</div>
              </div>
              <label class="toggle">
                <input type="checkbox" role="switch" />
                <span class="toggle-track"><span class="toggle-thumb"></span></span>
              </label>
            </label>
          </div>
        </div>
      </div>

      <!-- Section 3: Connected Libraries -->
      <div>
        <div class="section-label">Connected Libraries</div>
        <div class="section-label-hint">Libraries to include in the next scan</div>
        <div class="card" style="margin-top:8px;">
          <div class="empty-state">
            <div class="empty-state-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <p class="empty-state-title">No libraries connected</p>
            <p class="empty-state-desc">Connect a team library to include its components in the audit scan.</p>
            <button class="btn-primary btn-sm" style="margin-top:4px;">
              <span class="btn-icon">${ICON_PLUS}</span>
              <span class="btn-label">Add library</span>
            </button>
          </div>
        </div>
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
