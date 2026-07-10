export type WizardShellMode = 'single' | 'bulk';

export interface WizardShellProps {
  /** Show / hide the overlay. */
  open?: boolean;
  /** Title displayed in the top bar centre. */
  title?: string;
  /** Mode toggle — drives the right-side action button label */
  mode?: WizardShellMode;
  /** Hide the mode-toggle button entirely. */
  hidetoggle?: boolean;
  /** Hide the close (X) button entirely. */
  hideclose?: boolean;
}
