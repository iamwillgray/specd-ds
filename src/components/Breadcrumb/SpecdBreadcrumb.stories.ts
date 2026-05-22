import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdBreadcrumb';

const meta: Meta = {
  title: 'Molecules/Breadcrumb',
  component: 'specd-breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const TwoLevel: Story = {
  render: () => html`
    <specd-breadcrumb items=${JSON.stringify([{ label: 'Home', href: '/' }, { label: 'Components' }])}></specd-breadcrumb>
  `,
};

export const ThreeLevel: Story = {
  render: () => html`
    <specd-breadcrumb items=${JSON.stringify([{ label: 'Home', href: '/' }, { label: 'Components', href: '/components' }, { label: 'Button' }])}></specd-breadcrumb>
  `,
};

export const FourLevel: Story = {
  render: () => html`
    <specd-breadcrumb items=${JSON.stringify([{ label: 'Home', href: '/' }, { label: 'Design System', href: '/ds' }, { label: 'Components', href: '/ds/components' }, { label: 'Button' }])}></specd-breadcrumb>
  `,
};
