/**
 * Admiral DS — React wrappers entry point
 *
 * Auto-generated React components via @lit/react.
 * These are thin wrappers around the Web Components — never hand-edit.
 *
 * @example
 * import { AdmiralButton } from '@specd/admiral-ds/react';
 * import '@specd/admiral-ds/tokens.css';
 *
 * <AdmiralButton variant="primary" onClick={handleClick}>Scan now</AdmiralButton>
 */

import React from 'react';
import { createComponent } from '@lit/react';
import { AdmiralButton }   from './components/Button/AdmiralButton.js';
import { AdmiralChip }     from './components/Chip/AdmiralChip.js';
import { AdmiralBadge }    from './components/Badge/AdmiralBadge.js';
import { AdmiralInput }    from './components/Input/AdmiralInput.js';
import { AdmiralToggle }   from './components/Toggle/AdmiralToggle.js';
import { AdmiralCard }     from './components/Card/AdmiralCard.js';
import { AdmiralProgress } from './components/ProgressBar/AdmiralProgress.js';
import { AdmiralAvatar }   from './components/Avatar/AdmiralAvatar.js';

/** Auto-generated React wrapper for <admiral-button>. Do not hand-edit. */
export const Button = createComponent({
  react: React,
  tagName: 'admiral-button',
  elementClass: AdmiralButton,
  events: { onClick: 'click', onFocus: 'focus', onBlur: 'blur' },
});

/** Auto-generated React wrapper for <admiral-chip>. Do not hand-edit. */
export const Chip = createComponent({
  react: React,
  tagName: 'admiral-chip',
  elementClass: AdmiralChip,
  events: { onClick: 'click' },
});

/** Auto-generated React wrapper for <admiral-badge>. Do not hand-edit. */
export const Badge = createComponent({
  react: React,
  tagName: 'admiral-badge',
  elementClass: AdmiralBadge,
  events: {},
});

/** Auto-generated React wrapper for <admiral-input>. Do not hand-edit. */
export const Input = createComponent({
  react: React,
  tagName: 'admiral-input',
  elementClass: AdmiralInput,
  events: { onInput: 'input', onChange: 'change', onFocus: 'focus', onBlur: 'blur' },
});

/** Auto-generated React wrapper for <admiral-toggle>. Do not hand-edit. */
export const Toggle = createComponent({
  react: React,
  tagName: 'admiral-toggle',
  elementClass: AdmiralToggle,
  events: { onChange: 'change' },
});

/** Auto-generated React wrapper for <admiral-card>. Do not hand-edit. */
export const Card = createComponent({
  react: React,
  tagName: 'admiral-card',
  elementClass: AdmiralCard,
  events: {},
});

/** Auto-generated React wrapper for <admiral-progress>. Do not hand-edit. */
export const Progress = createComponent({
  react: React,
  tagName: 'admiral-progress',
  elementClass: AdmiralProgress,
  events: {},
});

/** Auto-generated React wrapper for <admiral-avatar>. Do not hand-edit. */
export const Avatar = createComponent({
  react: React,
  tagName: 'admiral-avatar',
  elementClass: AdmiralAvatar,
  events: {},
});
