/**
 * @specd/specd-ds/core — headless, framework-agnostic logic only.
 *
 * No Lit, no HTMLElement, no DOM. Safe to import from a Figma plugin's
 * sandbox context (main.ts — no DOM at all, not even a browser-shaped
 * one) as well as any UI/browser context. This is a DELIBERATELY
 * separate entry point from the package's main "." export (which
 * bundles ~50 Web Component registrations that execute
 * `class extends HTMLElement` at module load time) — importing
 * anything from "." in a DOM-less sandbox crashes immediately with
 * "ReferenceError: HTMLElement is not defined". Import from
 * "@specd/specd-ds/core" instead whenever the consumer doesn't have
 * a DOM.
 */
export { suggestVariables, buildContextFromLayerDetail } from './variableMatcher.js';
export type { IndexedVariable, RankedSuggestion, LayerPropertyContext } from './variableMatcher.js';
