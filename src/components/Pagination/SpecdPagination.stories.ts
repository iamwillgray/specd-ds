import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdPagination';

const meta: Meta = {
  title: 'Molecules/Pagination',
  component: 'specd-pagination',
  tags: ['autodocs'],
  argTypes: {
    page:     { control: 'number' },
    total:    { control: 'number' },
    pagesize: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const FewPages: Story = {
  render: () => html`<specd-pagination .page=${1} .total=${50} .pagesize=${20}></specd-pagination>`,
};

export const ManyPages: Story = {
  render: () => html`<specd-pagination .page=${6} .total=${500} .pagesize=${20}></specd-pagination>`,
};

export const LastPage: Story = {
  render: () => html`<specd-pagination .page=${5} .total=${100} .pagesize=${20}></specd-pagination>`,
};
