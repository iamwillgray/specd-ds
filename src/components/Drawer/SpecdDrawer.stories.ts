import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdDrawer';

const meta: Meta = {
  title: 'Organisms/Drawer',
  component: 'specd-drawer',
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
    <specd-drawer .open=${true} title="Settings">
      <p>Drawer body content goes here.</p>
    </specd-drawer>
  `,
};

export const Closed: Story = {
  render: () => html`
    <specd-drawer title="Settings">
      <p>This drawer is closed.</p>
    </specd-drawer>
    <p>Drawer is not visible (open=false).</p>
  `,
};
