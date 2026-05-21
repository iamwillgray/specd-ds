import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdIcon.js';

const meta: Meta = {
  title: 'Atoms/Icon',
  component: 'specd-icon',
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['check','cross','warn','info','crit','jump','fix','ignore','refresh','settings','eye','eye-off','chevron-down','chevron-right','sparkle','search','copy','external'],
    },
    size: { control: { type: 'number', min: 10, max: 32 } },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { name: 'check', size: 14 },
  render: (args) => html`<specd-icon name=${args.name} .size=${args.size ?? 14}></specd-icon>`,
};

export const AllIcons: Story = {
  render: () => html`
    <div style="display:grid;grid-template-columns:repeat(6,80px);gap:16px;padding:16px;">
      ${['check','cross','warn','info','crit','jump','fix','ignore','refresh','settings','eye','eye-off','chevron-down','chevron-right','sparkle','search','copy','external'].map(name => html`
        <div style="display:flex;flex-direction:column;align-items:center;gap:4px;font-size:10px;">
          <specd-icon name=${name}></specd-icon>
          <span>${name}</span>
        </div>
      `)}
    </div>
  `,
};
