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

export const FillWithSuggestion: Story = {
  render: () => html`
    <div style="width:360px;padding:16px;">
      <specd-prop-fix-row prop="fill" layer="Input/Text/Default" attr="background fill" count="1 layer">
        <specd-prop-fix-slot
          current="#3b82f6"
          currentcolor="#3b82f6"
          varname="color/brand/blue-500"
          color="#3b82f6"
          matchtype="exact"
        ></specd-prop-fix-slot>
      </specd-prop-fix-row>
    </div>
  `,
};

export const StrokeClosestMatch: Story = {
  render: () => html`
    <div style="width:360px;padding:16px;">
      <specd-prop-fix-row prop="stroke" layer="Input/Text/Default" attr="border stroke" count="1 layer">
        <specd-prop-fix-slot
          current="#d1d5db"
          currentcolor="#d1d5db"
          varname="color/border/default"
          color="#d1d5db"
          matchtype="closest"
        ></specd-prop-fix-slot>
      </specd-prop-fix-row>
    </div>
  `,
};

export const SpacingApplied: Story = {
  render: () => html`
    <div style="width:360px;padding:16px;">
      <specd-prop-fix-row prop="spacing" layer="Input/Text/Default" attr="padding horizontal" count="3 layers">
        <specd-prop-fix-slot
          current="12px"
          varname="spacing/300"
          applied
        ></specd-prop-fix-slot>
      </specd-prop-fix-row>
    </div>
  `,
};

export const NoMatch: Story = {
  render: () => html`
    <div style="width:360px;padding:16px;">
      <specd-prop-fix-row prop="fill" layer="Badge/Count" attr="background fill" count="2 layers">
        <specd-prop-fix-create value="#ab12cd"></specd-prop-fix-create>
      </specd-prop-fix-row>
    </div>
  `,
};
