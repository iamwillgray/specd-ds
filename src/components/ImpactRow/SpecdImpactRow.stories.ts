import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdImpactRow';
import '../Button/SpecdButton';
const meta: Meta = { title: 'Drill-down/ImpactRow', component: 'specd-impact-row' };
export default meta;
type Story = StoryObj;
export const Default: Story = {
  render: () => html`<div class="impact-list"><specd-impact-row rank="1" name="Card / Elevated" delta="4" sub="9 hard-coded colours" component-id="1:1"><specd-button size="sm" variant="primary">Review fixes</specd-button></specd-impact-row></div>`,
};
