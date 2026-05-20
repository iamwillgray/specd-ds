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
import { AdmiralButton } from './components/Button/AdmiralButton.js';

/** Auto-generated React wrapper for <admiral-button>. Do not hand-edit. */
export const Button = createComponent({
  react: React,
  tagName: 'admiral-button',
  elementClass: AdmiralButton,
  events: {
    onClick:   'click',
    onFocus:   'focus',
    onBlur:    'blur',
  },
});

// Add wrappers here as new Web Components are built:
