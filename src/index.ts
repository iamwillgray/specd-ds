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
