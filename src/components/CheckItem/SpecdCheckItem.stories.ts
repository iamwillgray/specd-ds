import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdCheckItem';
const meta: Meta = { title: 'Drill-down/CheckItem', component: 'specd-check-item' };
export default meta;
type Story = StoryObj;
export const Grid: Story = { render: () => html`<div class="checks"><specd-check-item label="Description" sub="missing" state="fail"></specd-check-item><specd-check-item label="Variable coverage" sub="94%" state="pass"></specd-check-item><specd-check-item label="Props" sub="1 misaligned" state="warn"></specd-check-item></div>` };
