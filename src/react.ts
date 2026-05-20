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
import { SpecdButton }   from './components/Button/SpecdButton.js';
import { SpecdChip }     from './components/Chip/SpecdChip.js';
import { SpecdBadge }    from './components/Badge/SpecdBadge.js';
import { SpecdInput }    from './components/Input/SpecdInput.js';
import { SpecdToggle }   from './components/Toggle/SpecdToggle.js';
import { SpecdCard }     from './components/Card/SpecdCard.js';
import { SpecdProgress } from './components/ProgressBar/SpecdProgress.js';
import { SpecdAvatar }   from './components/Avatar/SpecdAvatar.js';

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
