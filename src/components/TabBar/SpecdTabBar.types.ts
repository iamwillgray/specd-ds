export interface TabItem {
  id: string;
  label: string;
  icon?: string;
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
