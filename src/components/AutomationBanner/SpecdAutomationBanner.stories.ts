import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdAutomationBanner';
import '../Button/SpecdButton';
const meta: Meta = { title: 'Drill-down/AutomationBanner', component: 'specd-automation-banner' };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => html`<specd-automation-banner title="Apply all exact matches" sub="12 layers map 1:1 to a variable"><specd-button variant="primary">Run automation</specd-button></specd-automation-banner>` };
