import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdMicroScore';
const meta: Meta = { title: 'Drill-down/MicroScore', component: 'specd-micro-score' };
export default meta;
type Story = StoryObj;
export const Default: Story = { render: () => html`<specd-micro-score passed="5" total="8"></specd-micro-score>` };
export const Complete: Story = { render: () => html`<specd-micro-score passed="8" total="8"></specd-micro-score>` };
