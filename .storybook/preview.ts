import type { Preview } from '@storybook/web-components';

import '../src/tokens/fonts.css';
import '../src/tokens/index.css';
import '../src/tokens/components.css';

const preview: Preview = {
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
