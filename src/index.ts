/**
 * Specd DS — Web Components entry point
 *
 * Import this file to register all <specd-*> custom elements.
 * Works in any environment with a DOM: Figma plugins, browsers, any framework.
 *
 * @example
 * // Figma plugin or vanilla web
 * import '@specd/specd-ds';
 *
 * // Then in HTML:
 * // <specd-button variant="primary">Scan now</specd-button>
 */

// Components — importing registers custom elements as a side-effect
export * from './components/Button/index.js';
export * from './components/Chip/index.js';
export * from './components/Badge/index.js';
export * from './components/Input/index.js';
export * from './components/Toggle/index.js';
export * from './components/Card/index.js';
export * from './components/ProgressBar/index.js';
export * from './components/Avatar/index.js';
export * from './components/Modal/index.js';
export * from './components/Drawer/index.js';
export * from './components/Toast/index.js';
export * from './components/Alert/index.js';
export * from './components/Divider/index.js';
export * from './components/KvRow/index.js';
export * from './components/CodeBlock/index.js';
export * from './components/Skeleton/index.js';
export * from './components/EmptyState/index.js';
export * from './components/Breadcrumb/index.js';
export * from './components/Pagination/index.js';
export * from './components/Stepper/index.js';
export * from './components/HealthBadge/index.js';
export * from './components/NavScore/index.js';
export * from './components/AiPill/index.js';
export * from './components/JumpBtn/index.js';
export * from './components/SbPill/index.js';
export * from './components/SeverityHeader/index.js';
export * from './components/ScoreTrend/index.js';
export * from './components/ScoreRing/index.js';
export * from './components/CovRow/index.js';
export * from './components/StatTileSm/index.js';
export * from './components/StatTileLg/index.js';
export * from './components/TabBar/index.js';
export * from './components/AppHeader/index.js';
export * from './components/Segmented/index.js';
export * from './components/SectionLabel/index.js';
export * from './components/FormRow/index.js';
export * from './components/ToggleRow/index.js';
export * from './components/RadioGroup/index.js';
export * from './components/CheckboxGroup/index.js';
export * from './components/IssueCard/index.js';
export * from './components/ChoiceCard/index.js';
export * from './components/Sparkline/index.js';
export { SpecdIcon }            from './components/Icon/SpecdIcon.js';
export { SpecdColorSwatch }     from './components/ColorSwatch/SpecdColorSwatch.js';
export { SpecdFieldMessage }    from './components/FieldMessage/SpecdFieldMessage.js';
export { SpecdInfoTrigger }     from './components/InfoTrigger/SpecdInfoTrigger.js';
export { SpecdAiGradientBtn }   from './components/AiGradientBtn/SpecdAiGradientBtn.js';
export { SpecdIgnoreFooter }    from './components/IgnoreFooter/SpecdIgnoreFooter.js';
export { SpecdQfReplaceRow }    from './components/QfReplaceRow/SpecdQfReplaceRow.js';
export { SpecdIssueRowActions } from './components/IssueRowActions/SpecdIssueRowActions.js';
export { SpecdIssueRow } from './components/IssueRow/SpecdIssueRow.js';
export type { IssueRowState, IssueRowSeverity } from './components/IssueRow/SpecdIssueRow.js';
export { SpecdPropFixRow }      from './components/PropFixRow/SpecdPropFixRow.js';
export { SpecdPropFixSlot }     from './components/PropFixRow/SpecdPropFixSlot.js';
export { SpecdPropFixCreate }   from './components/PropFixRow/SpecdPropFixCreate.js';
export { SpecdVariablePicker } from './components/VariablePicker/SpecdVariablePicker.js';
export type { VariableOption } from './components/VariablePicker/SpecdVariablePicker.js';
export { SpecdDataTable } from './components/DataTable/SpecdDataTable.js';
export type { DataTableColumn } from './components/DataTable/SpecdDataTable.js';
export { SpecdTag } from './components/Tag/SpecdTag.js';
export type { TagIntent } from './components/Tag/SpecdTag.js';
