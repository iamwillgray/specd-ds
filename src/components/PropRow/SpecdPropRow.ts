import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PropRowType } from './SpecdPropRow.types.js';

const TYPE_LABEL: Record<string, string> = {
  VARIANT: 'Variant',
  BOOLEAN: 'Boolean',
  TEXT: 'Text',
  INSTANCE_SWAP: 'Instance',
};

/**
 * Specd DS — PropRow
 *
 * A compact, single-line summary row for a canonical/global prop definition.
 * Mirrors the visual family of the connected-libraries cards: a leading type
 * badge, the prop name, a muted one-line summary (expected values or aliases),
 * and trailing Edit + Remove (danger) actions.
 *
 * Purely presentational — the host owns the data and the expanded editor. The
 * row emits `prop-edit` and `prop-remove` (both bubbling + composed) so the
 * host can toggle into an editor or delete the entry.
 *
 * @element specd-prop-row
 *
 * @attr {string} name    - Canonical prop name (row title)
 * @attr {string} ptype   - VARIANT | BOOLEAN | TEXT | INSTANCE_SWAP
 * @attr {string} summary - Muted one-line summary (e.g. "sm | md | lg")
 *
 * @fires prop-edit   - Edit button pressed. detail: { name }
 * @fires prop-remove - Remove button pressed. detail: { name }
 *
 * @example
 * <specd-prop-row name="size" ptype="VARIANT" summary="sm | md | lg"></specd-prop-row>
 */
@customElement('specd-prop-row')
export class SpecdPropRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) name = '';
  @property({ type: String }) ptype: PropRowType = 'VARIANT';
  @property({ type: String }) summary = '';

  private emit(type: 'prop-edit' | 'prop-remove') {
    this.dispatchEvent(new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail: { name: this.name },
    }));
  }

  override render() {
    const key = (this.ptype || 'VARIANT').toUpperCase();
    const label = TYPE_LABEL[key] ?? key;
    return html`
      <div class="specd-prop-row">
        <span class="prop-row-badge ptype-${key.toLowerCase()}">${label}</span>
        <span class="prop-row-name">${this.name || 'Untitled prop'}</span>
        ${this.summary
          ? html`<span class="prop-row-summary">${this.summary}</span>`
          : nothing}
        <span class="prop-row-actions">
          <button type="button" class="prop-row-edit" data-accordion-stop
                  @click=${() => this.emit('prop-edit')}>Edit</button>
          <button type="button" class="prop-row-remove" data-accordion-stop
                  @click=${() => this.emit('prop-remove')}>Remove</button>
        </span>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-prop-row': SpecdPropRow;
  }
}
