// Global test setup
// happy-dom provides the browser APIs needed for custom elements
// @open-wc/testing provides fixture() and testing utilities

// Polyfill for custom elements in happy-dom if needed
if (!window.customElements) {
  console.warn('customElements not available in test environment');
}
