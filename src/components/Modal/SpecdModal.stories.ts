import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdModal';

const meta: Meta = {
  title: 'Components/Modal',
  component: 'specd-modal',
  tags: ['autodocs'],
  argTypes: {
    open:  { control: 'boolean' },
    title: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Open: Story = {
  render: () => html`
    <specd-modal .open=${true} title="Export Report">
      <p>Modal body content goes here.</p>
      <specd-button slot="footer" variant="primary">Confirm</specd-button>
    </specd-modal>
  `,
};

export const Closed: Story = {
  render: () => html`
    <specd-modal title="Export Report">
      <p>This modal is closed.</p>
    </specd-modal>
    <p>Modal is not visible (open=false).</p>
  `,
};
