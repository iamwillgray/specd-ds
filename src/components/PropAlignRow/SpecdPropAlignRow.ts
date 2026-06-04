import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PropAlignRowProps } from './SpecdPropAlignRow.types.js';

/**
 * Specd DS — PropAlignRow
 *
 * The unified row for fixing ONE prop's alignment — used everywhere props and
 * their values are fixed: the Issues tab "Review Props" expansion and the Props
 * page mismatches / suggestions. Shows the prop name, an issue description, and
 * up to two actions (primary + secondary).
 *
 * (Distinct from `specd-prop-fix-row`, which is the hard-coded *value* fixer.)
 *
 * @element specd-prop-align-row
 *
 * @attr {string}  propname  - The component prop name (shown bold)
 * @attr {string}  detail    - Issue description (e.g. "should be Variant")
 * @attr {string}  action    - Primary action label (e.g. "Rename → Variant")
 * @attr {string}  secondary - Optional secondary action label
 * @attr {boolean} done      - Render the primary action in a completed state
 *
 * @fires prop-fix    - Primary action clicked.   detail: { propname }
 * @fires prop-assign - Secondary action clicked.  detail: { propname }
 *
 * @example
 * <specd-prop-align-row propname="Style" detail='should be "Variant"'
 *   action="Rename → Variant" secondary="Assign to another…"></specd-prop-align-row>
 */
@customElement('specd-prop-align-row')
export class SpecdPropAlignRow extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String })  propname: string = '';
  @property({ type: String })  detail: string = '';
  @property({ type: String })  action: string = '';
  @property({ type: String })  secondary: string = '';
  @property({ type: Boolean }) done: boolean = false;

  private emit(type: 'prop-fix' | 'prop-assign') {
    this.dispatchEvent(new CustomEvent(type, {
      bubbles: true, composed: true, detail: { propname: this.propname },
    }));
  }

  override render() {
    return html`
      <div class="prop-align-row-2">
        <span class="prop-align-desc">
          <strong>${this.propname}</strong>${this.detail ? html` ${this.detail}` : nothing}
        </span>
        <span class="prop-align-actions">
          ${this.action
            ? html`<button type="button" class="btn btn-primary btn-sm ${this.done ? 'is-applied' : ''}"
                ?disabled=${this.done} @click=${() => this.emit('prop-fix')}>${this.action}</button>`
            : nothing}
          ${this.secondary
            ? html`<button type="button" class="btn btn-ghost btn-sm" @click=${() => this.emit('prop-assign')}>${this.secondary}</button>`
            : nothing}
        </span>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap { 'specd-prop-align-row': SpecdPropAlignRow; }
}

export type { PropAlignRowProps };
