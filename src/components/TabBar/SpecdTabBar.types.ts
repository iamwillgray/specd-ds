export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  /**
   * Optional filled/solid variant of `icon`, shown instead of `icon` when
   * this tab is active — a second signal beyond the pill background color,
   * per Apple HIG's "use filled variants for selected states" (SF Symbols
   * outline/fill pairing). Falls back to `icon` for tabs that don't define
   * one, so this is purely additive.
   */
  iconActive?: string;
  badge?: number;
  /**
   * Optional `data-*` attribute pairs forwarded to the rendered tab button.
   * Use this to route tabs to existing event-delegation selectors without
   * collapsing the component's own `id` value.
   * Example: `{ panel: 'panel-overview' }` → `<button data-panel="panel-overview">`
   */
  data?: Record<string, string>;
}

export interface TabBarProps {
  tabs: TabItem[];
  active: string;
  columns?: number;
}
