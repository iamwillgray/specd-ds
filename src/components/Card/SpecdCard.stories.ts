import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdCard';

const meta: Meta = {
  title: 'Molecules/Card',
  component: 'specd-card',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-card
      elevation=${args.elevation ?? 'elevated'}
      ?inner=${args.inner ?? true}
    >
      <p style="margin:0;">${args.content ?? 'Card content goes here.'}</p>
    </specd-card>
  `,
  argTypes: {
    elevation: { control: 'select', options: ['elevated', 'flat', 'inset'] },
    inner:     { control: 'boolean' },
    content:   { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Elevated: Story = { args: { elevation: 'elevated', content: 'Elevated card surface.' } };
export const Flat: Story     = { args: { elevation: 'flat',     content: 'Flat card surface.' } };
export const Inset: Story    = { args: { elevation: 'inset',    content: 'Inset card surface.' } };
export const NoInner: Story  = { args: { elevation: 'elevated', inner: false, content: 'No inner wrapper.' } };

export const AllElevations: Story = {
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:12px;max-width:320px;">
      <specd-card elevation="elevated"><p style="margin:0;">Elevated</p></specd-card>
      <specd-card elevation="flat"><p style="margin:0;">Flat</p></specd-card>
      <specd-card elevation="inset"><p style="margin:0;">Inset</p></specd-card>
    </div>
  `,
};
