import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdDrillHeader';

const meta: Meta = { title: 'Drill-down/DrillHeader', component: 'specd-drill-header' };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`<specd-drill-header back-label="Overview" parent="Overview Report" crumb="Variable Coverage"></specd-drill-header>`,
};
