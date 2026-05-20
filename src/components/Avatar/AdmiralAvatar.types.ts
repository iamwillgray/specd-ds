export type AvatarSize = 'sm' | 'md' | 'lg';

/**
 * Props for the AdmiralAvatar (`<admiral-avatar>`) component.
 *
 * @example
 * <admiral-avatar name="Jane Doe" size="md"></admiral-avatar>
 * <admiral-avatar src="/avatars/jane.png" name="Jane Doe" alt="Jane Doe"></admiral-avatar>
 */
export interface AvatarProps {
  /** Image URL. Falls back to initials when not provided or fails to load. */
  src?: string;
  /** Display name — used to compute initials (first letter of first two words). */
  name?: string;
  /** Size variant. @default 'md' */
  size?: AvatarSize;
  /** Alt text for the image. Falls back to name when omitted. */
  alt?: string;
}
