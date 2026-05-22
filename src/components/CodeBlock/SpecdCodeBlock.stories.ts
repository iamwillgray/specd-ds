import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdCodeBlock';

const meta: Meta = {
  title: 'Molecules/CodeBlock',
  component: 'specd-code-block',
  tags: ['autodocs'],
  argTypes: {
    code:     { control: 'text' },
    language: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const CSS: Story = {
  render: () => html`<specd-code-block language="css" code=".button { background: #b8ff57; border-radius: 4px; }"></specd-code-block>`,
};

export const TypeScript: Story = {
  render: () => html`<specd-code-block language="ts" code="const x: number = 42;"></specd-code-block>`,
};

export const JSON: Story = {
  render: () => html`<specd-code-block language="json" code='{ "name": "specd-button", "version": "1.0.0" }'></specd-code-block>`,
};
