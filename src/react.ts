/**
 * Specd DS — React wrappers entry point
 *
 * Auto-generated React components via @lit/react.
 * These are thin wrappers around the Web Components — never hand-edit.
 *
 * @example
 * import { SpecdButton } from '@specd/specd-ds/react';
 * import '@specd/specd-ds/tokens.css';
 *
 * <SpecdButton variant="primary" onClick={handleClick}>Scan now</SpecdButton>
 */

import React from 'react';
import { createComponent } from '@lit/react';
import { SpecdButton }        from './components/Button/SpecdButton.js';
import { SpecdChip }          from './components/Chip/SpecdChip.js';
import { SpecdBadge }         from './components/Badge/SpecdBadge.js';
import { SpecdInput }         from './components/Input/SpecdInput.js';
import { SpecdToggle }        from './components/Toggle/SpecdToggle.js';
import { SpecdCard }          from './components/Card/SpecdCard.js';
import { SpecdProgress }      from './components/ProgressBar/SpecdProgress.js';
import { SpecdAvatar }        from './components/Avatar/SpecdAvatar.js';
import { SpecdModal }         from './components/Modal/SpecdModal.js';
import { SpecdDrawer }        from './components/Drawer/SpecdDrawer.js';
import { SpecdToast }         from './components/Toast/SpecdToast.js';
import { SpecdAlert }         from './components/Alert/SpecdAlert.js';
import { SpecdKvRow }         from './components/KvRow/SpecdKvRow.js';
import { SpecdCodeBlock }     from './components/CodeBlock/SpecdCodeBlock.js';
import { SpecdSkeleton }      from './components/Skeleton/SpecdSkeleton.js';
import { SpecdEmptyState }    from './components/EmptyState/SpecdEmptyState.js';
import { SpecdBreadcrumb }    from './components/Breadcrumb/SpecdBreadcrumb.js';
import { SpecdPagination }    from './components/Pagination/SpecdPagination.js';
import { SpecdStepper }       from './components/Stepper/SpecdStepper.js';
import { SpecdHealthBadge }   from './components/HealthBadge/SpecdHealthBadge.js';
import { SpecdNavScore }      from './components/NavScore/SpecdNavScore.js';
import { SpecdAiPill }        from './components/AiPill/SpecdAiPill.js';
import { SpecdJumpBtn }       from './components/JumpBtn/SpecdJumpBtn.js';
import { SpecdSbPill }        from './components/SbPill/SpecdSbPill.js';
import { SpecdSeverityHeader } from './components/SeverityHeader/SpecdSeverityHeader.js';
import { SpecdScoreTrend }    from './components/ScoreTrend/SpecdScoreTrend.js';
import { SpecdScoreRing }     from './components/ScoreRing/SpecdScoreRing.js';
import { SpecdCovRow }        from './components/CovRow/SpecdCovRow.js';
import { SpecdStatTileSm }    from './components/StatTileSm/SpecdStatTileSm.js';
import { SpecdStatTileLg }    from './components/StatTileLg/SpecdStatTileLg.js';
import { SpecdTabBar }        from './components/TabBar/SpecdTabBar.js';
import { SpecdAppHeader }     from './components/AppHeader/SpecdAppHeader.js';
import { SpecdSegmented }     from './components/Segmented/SpecdSegmented.js';
import { SpecdSectionLabel }  from './components/SectionLabel/SpecdSectionLabel.js';
import { SpecdFormRow }       from './components/FormRow/SpecdFormRow.js';
import { SpecdToggleRow }     from './components/ToggleRow/SpecdToggleRow.js';
import { SpecdRadioGroup }    from './components/RadioGroup/SpecdRadioGroup.js';
import { SpecdCheckboxGroup } from './components/CheckboxGroup/SpecdCheckboxGroup.js';
import { SpecdIssueCard }     from './components/IssueCard/SpecdIssueCard.js';
import { SpecdChoiceCard }    from './components/ChoiceCard/SpecdChoiceCard.js';
import { SpecdSparkline }     from './components/Sparkline/SpecdSparkline.js';

/** Auto-generated React wrapper for <specd-button>. Do not hand-edit. */
export const Button = createComponent({
  react: React,
  tagName: 'specd-button',
  elementClass: SpecdButton,
  events: { onClick: 'click', onFocus: 'focus', onBlur: 'blur' },
});

/** Auto-generated React wrapper for <specd-chip>. Do not hand-edit. */
export const Chip = createComponent({
  react: React,
  tagName: 'specd-chip',
  elementClass: SpecdChip,
  events: { onClick: 'click' },
});

/** Auto-generated React wrapper for <specd-badge>. Do not hand-edit. */
export const Badge = createComponent({
  react: React,
  tagName: 'specd-badge',
  elementClass: SpecdBadge,
  events: {},
});

/** Auto-generated React wrapper for <specd-input>. Do not hand-edit. */
export const Input = createComponent({
  react: React,
  tagName: 'specd-input',
  elementClass: SpecdInput,
  events: { onInput: 'input', onChange: 'change', onFocus: 'focus', onBlur: 'blur' },
});

/** Auto-generated React wrapper for <specd-toggle>. Do not hand-edit. */
export const Toggle = createComponent({
  react: React,
  tagName: 'specd-toggle',
  elementClass: SpecdToggle,
  events: { onChange: 'change' },
});

/** Auto-generated React wrapper for <specd-card>. Do not hand-edit. */
export const Card = createComponent({
  react: React,
  tagName: 'specd-card',
  elementClass: SpecdCard,
  events: {},
});

/** Auto-generated React wrapper for <specd-progress>. Do not hand-edit. */
export const Progress = createComponent({
  react: React,
  tagName: 'specd-progress',
  elementClass: SpecdProgress,
  events: {},
});

/** Auto-generated React wrapper for <specd-avatar>. Do not hand-edit. */
export const Avatar = createComponent({
  react: React,
  tagName: 'specd-avatar',
  elementClass: SpecdAvatar,
  events: {},
});

/** Auto-generated React wrapper for <specd-modal>. Do not hand-edit. */
export const Modal = createComponent({
  react: React,
  tagName: 'specd-modal',
  elementClass: SpecdModal,
  events: { onSpecdClose: 'specd-close' },
});

/** Auto-generated React wrapper for <specd-drawer>. Do not hand-edit. */
export const Drawer = createComponent({
  react: React,
  tagName: 'specd-drawer',
  elementClass: SpecdDrawer,
  events: { onSpecdClose: 'specd-close' },
});

/** Auto-generated React wrapper for <specd-toast>. Do not hand-edit. */
export const Toast = createComponent({
  react: React,
  tagName: 'specd-toast',
  elementClass: SpecdToast,
  events: { onSpecdDismiss: 'specd-dismiss' },
});

/** Auto-generated React wrapper for <specd-alert>. Do not hand-edit. */
export const Alert = createComponent({
  react: React,
  tagName: 'specd-alert',
  elementClass: SpecdAlert,
  events: {},
});

/** Auto-generated React wrapper for <specd-kv-row>. Do not hand-edit. */
export const KvRow = createComponent({
  react: React,
  tagName: 'specd-kv-row',
  elementClass: SpecdKvRow,
  events: {},
});

/** Auto-generated React wrapper for <specd-code-block>. Do not hand-edit. */
export const CodeBlock = createComponent({
  react: React,
  tagName: 'specd-code-block',
  elementClass: SpecdCodeBlock,
  events: { onSpecdCopy: 'specd-copy' },
});

/** Auto-generated React wrapper for <specd-skeleton>. Do not hand-edit. */
export const Skeleton = createComponent({
  react: React,
  tagName: 'specd-skeleton',
  elementClass: SpecdSkeleton,
  events: {},
});

/** Auto-generated React wrapper for <specd-empty-state>. Do not hand-edit. */
export const EmptyState = createComponent({
  react: React,
  tagName: 'specd-empty-state',
  elementClass: SpecdEmptyState,
  events: {},
});

/** Auto-generated React wrapper for <specd-breadcrumb>. Do not hand-edit. */
export const Breadcrumb = createComponent({
  react: React,
  tagName: 'specd-breadcrumb',
  elementClass: SpecdBreadcrumb,
  events: {},
});

/** Auto-generated React wrapper for <specd-pagination>. Do not hand-edit. */
export const Pagination = createComponent({
  react: React,
  tagName: 'specd-pagination',
  elementClass: SpecdPagination,
  events: { onSpecdPageChange: 'specd-page-change' },
});

/** Auto-generated React wrapper for <specd-stepper>. Do not hand-edit. */
export const Stepper = createComponent({
  react: React,
  tagName: 'specd-stepper',
  elementClass: SpecdStepper,
  events: {},
});

/** Auto-generated React wrapper for <specd-health-badge>. Do not hand-edit. */
export const HealthBadge = createComponent({
  react: React,
  tagName: 'specd-health-badge',
  elementClass: SpecdHealthBadge,
  events: {},
});

/** Auto-generated React wrapper for <specd-nav-score>. Do not hand-edit. */
export const NavScore = createComponent({
  react: React,
  tagName: 'specd-nav-score',
  elementClass: SpecdNavScore,
  events: {},
});

/** Auto-generated React wrapper for <specd-ai-pill>. Do not hand-edit. */
export const AiPill = createComponent({
  react: React,
  tagName: 'specd-ai-pill',
  elementClass: SpecdAiPill,
  events: {},
});

/** Auto-generated React wrapper for <specd-jump-btn>. Do not hand-edit. */
export const JumpBtn = createComponent({
  react: React,
  tagName: 'specd-jump-btn',
  elementClass: SpecdJumpBtn,
  events: { onClick: 'click' },
});

/** Auto-generated React wrapper for <specd-sb-pill>. Do not hand-edit. */
export const SbPill = createComponent({
  react: React,
  tagName: 'specd-sb-pill',
  elementClass: SpecdSbPill,
  events: {},
});

/** Auto-generated React wrapper for <specd-severity-header>. Do not hand-edit. */
export const SeverityHeader = createComponent({
  react: React,
  tagName: 'specd-severity-header',
  elementClass: SpecdSeverityHeader,
  events: {},
});

/** Auto-generated React wrapper for <specd-score-trend>. Do not hand-edit. */
export const ScoreTrend = createComponent({
  react: React,
  tagName: 'specd-score-trend',
  elementClass: SpecdScoreTrend,
  events: {},
});

/** Auto-generated React wrapper for <specd-score-ring>. Do not hand-edit. */
export const ScoreRing = createComponent({
  react: React,
  tagName: 'specd-score-ring',
  elementClass: SpecdScoreRing,
  events: {},
});

/** Auto-generated React wrapper for <specd-cov-row>. Do not hand-edit. */
export const CovRow = createComponent({
  react: React,
  tagName: 'specd-cov-row',
  elementClass: SpecdCovRow,
  events: {},
});

/** Auto-generated React wrapper for <specd-stat-tile-sm>. Do not hand-edit. */
export const StatTileSm = createComponent({
  react: React,
  tagName: 'specd-stat-tile-sm',
  elementClass: SpecdStatTileSm,
  events: {},
});

/** Auto-generated React wrapper for <specd-stat-tile-lg>. Do not hand-edit. */
export const StatTileLg = createComponent({
  react: React,
  tagName: 'specd-stat-tile-lg',
  elementClass: SpecdStatTileLg,
  events: {},
});

/** Auto-generated React wrapper for <specd-tab-bar>. Do not hand-edit. */
export const TabBar = createComponent({
  react: React,
  tagName: 'specd-tab-bar',
  elementClass: SpecdTabBar,
  events: { onSpecdTabChange: 'specd-tab-change' },
});

/** Auto-generated React wrapper for <specd-app-header>. Do not hand-edit. */
export const AppHeader = createComponent({
  react: React,
  tagName: 'specd-app-header',
  elementClass: SpecdAppHeader,
  events: { onSpecdRefresh: 'specd-refresh', onSpecdSettings: 'specd-settings' },
});

/** Auto-generated React wrapper for <specd-segmented>. Do not hand-edit. */
export const Segmented = createComponent({
  react: React,
  tagName: 'specd-segmented',
  elementClass: SpecdSegmented,
  events: { onSpecdChange: 'specd-change' },
});

/** Auto-generated React wrapper for <specd-section-label>. Do not hand-edit. */
export const SectionLabel = createComponent({
  react: React,
  tagName: 'specd-section-label',
  elementClass: SpecdSectionLabel,
  events: {},
});

/** Auto-generated React wrapper for <specd-form-row>. Do not hand-edit. */
export const FormRow = createComponent({
  react: React,
  tagName: 'specd-form-row',
  elementClass: SpecdFormRow,
  events: {},
});

/** Auto-generated React wrapper for <specd-toggle-row>. Do not hand-edit. */
export const ToggleRow = createComponent({
  react: React,
  tagName: 'specd-toggle-row',
  elementClass: SpecdToggleRow,
  events: { onSpecdChange: 'specd-change' },
});

/** Auto-generated React wrapper for <specd-radio-group>. Do not hand-edit. */
export const RadioGroup = createComponent({
  react: React,
  tagName: 'specd-radio-group',
  elementClass: SpecdRadioGroup,
  events: { onSpecdChange: 'specd-change' },
});

/** Auto-generated React wrapper for <specd-checkbox-group>. Do not hand-edit. */
export const CheckboxGroup = createComponent({
  react: React,
  tagName: 'specd-checkbox-group',
  elementClass: SpecdCheckboxGroup,
  events: { onSpecdChange: 'specd-change' },
});

/** Auto-generated React wrapper for <specd-issue-card>. Do not hand-edit. */
export const IssueCard = createComponent({
  react: React,
  tagName: 'specd-issue-card',
  elementClass: SpecdIssueCard,
  events: {},
});

/** Auto-generated React wrapper for <specd-choice-card>. Do not hand-edit. */
export const ChoiceCard = createComponent({
  react: React,
  tagName: 'specd-choice-card',
  elementClass: SpecdChoiceCard,
  events: {},
});

/** Auto-generated React wrapper for <specd-sparkline>. Do not hand-edit. */
export const Sparkline = createComponent({
  react: React,
  tagName: 'specd-sparkline',
  elementClass: SpecdSparkline,
  events: {},
});
