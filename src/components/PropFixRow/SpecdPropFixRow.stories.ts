import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdPropFixRow.js';
import './SpecdPropFixSlot.js';
import './SpecdPropFixCreate.js';

const meta: Meta = {
  title: 'Molecules/PropFixRow',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;

export const WithSuggestions: Story = {
  render: () => html`
    <div style="width:340px;padding:16px;">
      <specd-prop-fix-row prop="fill" current="#b8ff57">
        <specd-prop-fix-slot varname="color/lime/400" color="#b8ff57"></specd-prop-fix-slot>
        <specd-prop-fix-slot varname="color/brand/accent" color="#b8ff57" selected></specd-prop-fix-slot>
      </specd-prop-fix-row>
    </div>
  `,
};

export const WithCreate: Story = {
  render: () => html`
    <div style="width:340px;padding:16px;">
      <specd-prop-fix-row prop="spacing" current="16px">
        <specd-prop-fix-create value="16px"></specd-prop-fix-create>
      </specd-prop-fix-row>
    </div>
  `,
};
