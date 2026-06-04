import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdStageBar';
const meta: Meta = { title: 'Drill-down/StageBar', component: 'specd-stage-bar' };
export default meta;
type Story = StoryObj;
export const ThreeStaged: Story = { render: () => html`<specd-stage-bar count="3" hint="Review the after column, then commit"></specd-stage-bar>` };
export const Empty: Story = { render: () => html`<specd-stage-bar count="0"></specd-stage-bar>` };
