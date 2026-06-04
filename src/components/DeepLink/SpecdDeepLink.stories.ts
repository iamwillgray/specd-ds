import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdDeepLink';
const meta: Meta = { title: 'Drill-down/DeepLink', component: 'specd-deep-link' };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => html`<div class="deep-grid"><specd-deep-link name="Descriptions" sub="Next weakest area" value="48" to="descriptions"></specd-deep-link><specd-deep-link name="Props" sub="API consistency" value="73" to="props"></specd-deep-link></div>` };
