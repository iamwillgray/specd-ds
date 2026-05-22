import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdAppHeader';

const meta: Meta = {
  title: 'Molecules/AppHeader',
  component: 'specd-app-header',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-app-header
      name=${args.name ?? 'Pulse'}
      ?showrefresh=${args.showrefresh}
      ?showsettings=${args.showsettings}
    ></specd-app-header>
  `,
  argTypes: {
    name:         { control: 'text' },
    showrefresh:  { control: 'boolean' },
    showsettings: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: { name: 'Pulse' },
};

export const WithRefresh: Story = {
  args: { name: 'Pulse', showrefresh: true },
};

export const WithBoth: Story = {
  args: { name: 'Pulse', showrefresh: true, showsettings: true },
};

export const CustomName: Story = {
  args: { name: 'Specced', showrefresh: true, showsettings: true },
};
