import type { Preview } from '@storybook/web-components';

import '../src/tokens/fonts.css';
import '../src/tokens/index.css';
import '../src/tokens/components.css';

const preview: Preview = {
  decorators: [
    (story) => {
      // Ensure the Storybook story root inherits our base font, matching a real plugin iframe
      document.documentElement.style.fontFamily = 'Inter, system-ui, -apple-system, sans-serif';
      document.body.style.fontFamily = 'var(--font, Inter, system-ui, sans-serif)';
      document.body.style.fontSize = '12px';
      document.body.style.color = 'var(--text, #0c1f3f)';
      document.body.style.webkitFontSmoothing = 'antialiased';
      return story();
    },
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8f9fc' },
        { name: 'dark',  value: '#0c1750' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    layout: 'centered',
    a11y: { test: 'todo' },
  },
};

export default preview;
