import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdDiffRow';
const meta: Meta = { title: 'Drill-down/DiffRow', component: 'specd-diff-row' };
export default meta;
type Story = StoryObj;

/** A real before -> after diff: there's an existing value being changed,
 * so the two-column comparison is genuinely useful. */
export const Staged: Story = { render: () => html`<div class="diff"><specd-diff-row field="Description" before="A CTA button." after="Primary call-to-action button." multiline staged></specd-diff-row></div>` };

/** Nothing set yet — no before/after comparison to show, so the empty-state
 * layout replaces the diff grid entirely with one highlighted, editable
 * field. No Generate button: only a human knows the right doc link. */
export const Empty: Story = { render: () => html`<div class="diff"><specd-diff-row field="Documentation link" before-empty="No link" after=""></specd-diff-row></div>` };

/** Same empty state, but for a field an AI/heuristic pass could plausibly
 * draft — adds the Generate action. */
export const EmptyGeneratable: Story = { render: () => html`<div class="diff"><specd-diff-row field="Description · doc template" before-empty="No description set" after="" multiline generatable></specd-diff-row></div>` };
