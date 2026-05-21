import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './SpecdStepper';

const STEPS = JSON.stringify([{ label: 'Connect Library' }, { label: 'Run Scan' }, { label: 'Review Issues' }]);

const meta: Meta = {
  title: 'Components/Stepper',
  component: 'specd-stepper',
  tags: ['autodocs'],
  argTypes: {
    steps:   { control: 'text' },
    current: { control: 'number' },
  },
};
export default meta;
type Story = StoryObj;

export const Step1of3: Story = {
  render: () => html`<specd-stepper steps=${STEPS} .current=${0}></specd-stepper>`,
};

export const Step2of3: Story = {
  render: () => html`<specd-stepper steps=${STEPS} .current=${1}></specd-stepper>`,
};

export const Complete: Story = {
  render: () => html`<specd-stepper steps=${STEPS} .current=${3}></specd-stepper>`,
};
