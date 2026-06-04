import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdDiffRow';
const meta: Meta = { title: 'Drill-down/DiffRow', component: 'specd-diff-row' };
export default meta;
type Story = StoryObj;
export const Staged: Story = { render: () => html`<div class="diff"><specd-diff-row field="Description" before-empty="No description set" after="Primary call-to-action button." multiline staged></specd-diff-row></div>` };
