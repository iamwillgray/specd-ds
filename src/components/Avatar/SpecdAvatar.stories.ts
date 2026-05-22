import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdAvatar';

const meta: Meta = {
  title: 'Atoms/Avatar',
  component: 'specd-avatar',
  tags: ['autodocs'],
  render: (args) => html`
    <specd-avatar
      name=${args.name ?? ''}
      src=${args.src ?? ''}
      size=${args.size ?? 'md'}
      alt=${args.alt ?? ''}
    ></specd-avatar>
  `,
  argTypes: {
    name: { control: 'text' },
    src:  { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    alt:  { control: 'text' },
  },
};
export default meta;
type Story = StoryObj;

export const Initials: Story  = { args: { name: 'Will Gray', size: 'md' } };
export const Small: Story     = { args: { name: 'Jane Doe',  size: 'sm' } };
export const Large: Story     = { args: { name: 'John Smith', size: 'lg' } };
export const SingleWord: Story = { args: { name: 'Specd', size: 'md' } };

export const AllSizes: Story = {
  render: () => html`
    <div style="display:flex;gap:8px;align-items:center;">
      <specd-avatar name="Will Gray" size="sm"></specd-avatar>
      <specd-avatar name="Will Gray" size="md"></specd-avatar>
      <specd-avatar name="Will Gray" size="lg"></specd-avatar>
    </div>
  `,
};
