import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdAutomationBanner';
const meta: Meta = { title: 'Drill-down/AutomationBanner', component: 'specd-automation-banner' };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => html`<specd-automation-banner title="Apply all exact matches" sub="12 layers map 1:1 to a variable" cta="Run automation"></specd-automation-banner>` };
