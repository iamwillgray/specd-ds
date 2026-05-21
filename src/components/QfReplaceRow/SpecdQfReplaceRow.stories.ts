import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdQfReplaceRow.js';

const meta: Meta = {
  title: 'Molecules/QfReplaceRow',
  component: 'specd-qf-replace-row',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="width:320px;display:flex;flex-direction:column;gap:4px;padding:16px;">
      <specd-qf-replace-row name="g1" value="a" label="color/primary/navy" color="#0C1750" type="semantic" collection="Brand"></specd-qf-replace-row>
      <specd-qf-replace-row name="g1" value="b" label="color/lime/400" color="#b8ff57" type="primitive" collection="Primitives" checked></specd-qf-replace-row>
    </div>
  `,
};
