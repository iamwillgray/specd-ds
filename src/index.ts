/**
 * Admiral DS — Web Components entry point
 *
 * Import this file to register all <admiral-*> custom elements.
 * Works in any environment with a DOM: Figma plugins, browsers, any framework.
 *
 * @example
 * // Figma plugin or vanilla web
 * import '@specd/admiral-ds';
 *
 * // Then in HTML:
 * // <admiral-button variant="primary">Scan now</admiral-button>
 */

// Components — importing registers custom elements as a side-effect
export * from './components/Button/index.js';

// Add new components here as they are built:
