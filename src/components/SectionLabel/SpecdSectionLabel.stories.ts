import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdSectionLabel';

const meta: Meta = {
  title: 'Components/SectionLabel',
  component: 'specd-section-label',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-section-label
      label=${args.label ?? ''}
      hint=${args.hint ?? ''}
    ></specd-section-label>
  `,
  argTypes: {
    label: { control: 'text' },
    hint:  { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  args: { label: 'Token Coverage' },
};

export const WithHint: Story = {
  args: { label: 'Token Coverage', hint: 'Percentage of layers bound to design tokens' },
};
