import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './AdmiralToggle';

const meta: Meta = {
  title: 'Components/Toggle',
  component: 'admiral-toggle',
  tags: ['autodocs'],
  render: (args) => html`
    <admiral-toggle
      id=${args.id ?? 'toggle-story'}
      aria-label=${args.ariaLabel ?? ''}
      ?checked=${args.checked}
      ?disabled=${args.disabled}
    ></admiral-toggle>
  `,
  argTypes: {
    id:        { control: 'text' },
    ariaLabel: { control: 'text' },
    checked:   { control: 'boolean' },
    disabled:  { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story  = { args: { id: 'toggle-default' } };
export const Checked: Story  = { args: { id: 'toggle-checked', checked: true } };
export const Disabled: Story = { args: { id: 'toggle-disabled', disabled: true } };
export const CheckedDisabled: Story = { args: { id: 'toggle-cd', checked: true, disabled: true } };

export const AllStates: Story = {
  render: () => html`
    <div style="display:flex;gap:16px;align-items:center;">
      <admiral-toggle id="s1" aria-label="Off"></admiral-toggle>
      <admiral-toggle id="s2" checked aria-label="On"></admiral-toggle>
      <admiral-toggle id="s3" disabled aria-label="Disabled off"></admiral-toggle>
      <admiral-toggle id="s4" checked disabled aria-label="Disabled on"></admiral-toggle>
    </div>
  `,
};
