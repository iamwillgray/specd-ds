import type { Preview } from '@storybook/web-components';

// Import design tokens and component styles globally
// These are the same CSS files consumed by Figma plugins and web apps
import '../src/tokens/index.css';
import '../src/tokens/components.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8f9fc' },  // --surface
        { name: 'dark',  value: '#0c1750' },  // --navy
        { name: 'white', value: '#ffffff' },
      ],
    },
    layout: 'centered',
  },
};

export default preview;
