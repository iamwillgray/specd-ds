import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { DrawerProps } from './SpecdDrawer.types.js';

const CLOSE_SVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>`;

/**
 * Specd DS — Drawer
 *
 * @element specd-drawer
 * @attr {boolean} open  - Whether the drawer is visible
 * @attr {string}  title - Drawer header title
 * @fires specd-close - Emitted when the drawer is closed
 */
@customElement('specd-drawer')
export class SpecdDrawer extends LitElement implements DrawerProps {
  override createRenderRoot() { return this; }

  @property({ type: Boolean }) open: boolean = false;
  @property({ type: String }) title: string = '';

  /* This component renders to LIGHT DOM (createRenderRoot returns `this`,
   * the convention this whole design system uses) — which means the
   * <slot>/<slot name="footer"> tags below are NOT real content-projection
   * slots. <slot> only has special "pull in assigned nodes" behaviour
   * inside an actual shadow tree; outside one it's an inert element. The
   * practical effect: any markup a consumer puts inside <specd-drawer>
   * (the intended body/footer content) just sits there as ordinary light-
   * DOM children of the host — rendering as loose, always-visible page
   * content regardless of `open`, and never actually appearing inside the
   * <dialog> at all. This went undetected because the component's own
   * test suite checks for a stale `.drawer-backdrop` class that isn't
   * used by this implementation (always trivially passes) and the demo
   * stories used single-line placeholder text easy to miss in a glance.
   *
   * Fix: capture the real children ONCE on connect, detach them
   * immediately (so nothing leaks into the page while closed), and
   * re-parent them into the rendered .drawer-body/.drawer-footer
   * containers by hand whenever the dialog opens — the standard light-DOM
   * substitute for real slot projection. */
  private _bodyNodes: Node[] = [];
  private _footerNodes: Node[] = [];
  private _capturedChildren = false;

  override connectedCallback() {
    super.connectedCallback();
    this._captureChildren();
  }

  private _captureChildren() {
    if (this._capturedChildren) return;
    this._capturedChildren = true;
    for (const node of Array.from(this.childNodes)) {
      const isFooter = node.nodeType === Node.ELEMENT_NODE && (node as Element).getAttribute('slot') === 'footer';
      (isFooter ? this._footerNodes : this._bodyNodes).push(node);
      node.remove();
    }
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('specd-close', { bubbles: true, composed: true }));
  }

  /* Bound once so add/removeEventListener reference the same function. */
  private _onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this._close();
  };
  private _onReposition = () => this._positionToHost();

  /* "Cover the plugin window, not more" needs to mean two different
   * things depending on context: inside a real Figma plugin, the iframe
   * IS the whole window, so covering the viewport is correct and
   * position:fixed; inset:0 (the CSS default) already does that with no
   * help needed. Inside Storybook/the standalone mockup, `.plugin-wrap`
   * is a smaller box simulating that window inside a much bigger page —
   * this should confine itself to THAT box instead.
   *
   * Tried making `.plugin-wrap` a transformed containing block so plain
   * CSS `inset:0` would resolve against it. Sized correctly (660×720
   * matched exactly) but positioned wrong by exactly one container-width
   * — reproduced even with fully explicit inline `top/left` and no other
   * offsets in play, so it isn't a specificity or over-constraint issue;
   * something about how this specific Storybook iframe/canvas nests
   * transformed containing blocks was producing it, not fully root-
   * caused. Rather than ship a positioning fix that depends on
   * understanding an unexplained platform quirk, measuring the actual
   * target box in JS and applying explicit pixel coordinates sidesteps
   * the question entirely — correct by construction, not by trusting a
   * CSS mechanism that just demonstrably misbehaved once already.
   *
   * Uses a plain <div> for the "dialog" surface, not the native <dialog>
   * tag. This followed a long detour: .drawer-panel (a child of what was
   * then a <dialog>) kept rendering offset by exactly one panel-width
   * despite fully correct computed position styles, which looked at
   * first like a <dialog>-specific containing-block quirk (position:
   * absolute, then fixed with the dialog's own coordinates, then no
   * position at all were all tried against that theory). The real cause
   * turned out unrelated to <dialog> entirely: .drawer-panel's own
   * slide-in animation (`ad-drawer-in`, translateX(100%) → none) was
   * stuck at its START keyframe in this automated/backgrounded browser
   * tab, and a `transform: translateX(100%)` frozen in place directly
   * offsets a full-width panel by its own width — exactly the symptom,
   * hiding in plain sight in `getComputedStyle(...).transform` the whole
   * time. Fixed at the source in components.css (that animation is now
   * opacity-only, matching the same fix already applied to
   * .view.active's entrance animation elsewhere in this codebase).
   * <dialog> was never actually the problem, but by the time that was
   * confirmed there was no reason to switch back: showModal()'s native
   * benefits (top-layer, ::backdrop, focus trap, Escape-to-close) were
   * already given up earlier in favour of manual backdrop/Escape
   * handling, so <dialog>'s remaining value here was just
   * `role="dialog"` semantics for free — replaced below with an explicit
   * role/aria-modal on the div, at no real loss. */
  private _positionToHost() {
    const dialog = this.querySelector('.drawer-dialog') as HTMLElement | null;
    const backdrop = this.querySelector('.drawer-manual-backdrop') as HTMLElement | null;
    if (!dialog) return;
    const host = this.closest('.plugin-wrap') as HTMLElement | null;
    if (!host) {
      // No simulated window ancestor (real plugin, or any other host page)
      // — clear overrides and fall back to the CSS default (inset:0,
      // covering the true viewport, which is correct there).
      dialog.style.cssText = '';
      if (backdrop) backdrop.style.cssText = '';
      return;
    }
    const r = host.getBoundingClientRect();
    const box = `position:fixed; top:${r.top}px; left:${r.left}px; width:${r.width}px; height:${r.height}px; margin:0;`;
    dialog.style.cssText = box;
    if (backdrop) backdrop.style.cssText = box;
  }

  override updated(changed: Map<string, unknown>) {
    if (!changed.has('open')) return;
    const dialog = this.querySelector('.drawer-dialog') as HTMLElement | null;
    if (!dialog) return;
    if (this.open) {
      const body = this.querySelector('.drawer-body');
      const footer = this.querySelector('.drawer-footer');
      this._bodyNodes.forEach((n) => body?.appendChild(n));
      this._footerNodes.forEach((n) => footer?.appendChild(n));
      this._positionToHost();
      window.addEventListener('resize', this._onReposition);
      document.addEventListener('keydown', this._onKeydown);
    } else {
      window.removeEventListener('resize', this._onReposition);
      document.removeEventListener('keydown', this._onKeydown);
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this._onKeydown);
    window.removeEventListener('resize', this._onReposition);
  }

  override render() {
    if (!this.open) return nothing;
    return html`
      <div class="drawer-manual-backdrop" @click=${() => this._close()}></div>
      <div
        class="drawer-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby=${this.title ? 'drawer-title' : nothing}
      >
        <div class="drawer-panel">
          <div class="drawer-header">
            <div class="drawer-title" id="drawer-title">${this.title}</div>
            <button class="modal-close-btn" @click=${() => this._close()}>${unsafeHTML(CLOSE_SVG)}</button>
          </div>
          <div class="drawer-body"></div>
          <div class="drawer-footer"></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'specd-drawer': SpecdDrawer;
  }
}
