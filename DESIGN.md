# Specd — Design Reference
> a diagnostic instrument's calm precision — violet pulse against navy void.

**Theme:** dual (light + dark, first-class from day one)
**Status:** approved (2026-09-19). Tokens are implemented on this branch (`src/tokens/*.css`); plugins are migrating tab by tab (see Consumer-Validated Patterns). The Marketing Extension section (2026-09-27) is a **proposal** awaiting product-owner review, not yet approved.

Specd is a suite of design-system audit tools (Pulse, Specced, Mapped, Shipped, Shift, Released) — software that inspects other people's design systems for token coverage, documentation, and health. The identity should read as a precision instrument, not a marketing product: near-monochrome ink-on-canvas surfaces, one electric-violet accent reserved exclusively for action, and status color (green/amber/red) kept strictly semantic — it reports on health, it never decorates with it. Typography is one confident, technical single family — Geist — carrying body copy, nav, and display numerals alike through weight and size alone, plus a monospace face (JetBrains Mono) reserved for the token IDs, percentages, and coordinates that are the actual content of an audit tool. Depth comes from surface-tint steps and hairline borders, never drop-shadows. Three intentional gradients — a conic sweep on the score ring, a whisper-thin wash behind the app header, and the tier-tinted Landing Page Hero wash — are the only chromatic decoration in the entire system (see Gradients).

## Design Philosophy — the why behind the tokens

Everything below this point is *how*. This section is *why* — the reasoning a designer or engineer should fall back on when a situation isn't covered by an explicit token or Do/Don't. It's synthesized from three references, each chosen because it maps onto something Specd specifically needs, not because they're famous:

- **Apple's Human Interface Guidelines** (Clarity, Deference, Depth) — for how chrome should relate to content
- **Linear's design method** — for how a purpose-built tool should behave differently from a generic, configurable one
- **Stripe's design approach** — for how a tool handling something consequential (money for them, design-system health for us) earns trust

### 1. Show your work
Stripe's principle: *"trust is earned through transparency"* — every fee, every calculation is legible, because confusion in financial software costs users money. For Specd, confusion costs users trust in the audit itself. **A health score, an issue, or a suggested fix is never presented without its reasoning being one click away.** This is why the score breakdown table exists instead of just a number; why `InfoTrigger` tooltips sit next to coverage rows instead of leaving them unexplained; why issue tags name the exact rule that fired ("No description", "Hard-coded fill") instead of a generic "Warning." If a user can't see *why* Specd flagged something, the flag isn't finished.

### 2. Purpose-built, not configurable
Linear's principle: *design for the specific work, not for every hypothetical workflow* — rigid, opinionated tools prevent the chaos that infinite flexibility invites. Specd is not a general dashboard-builder; it audits *this specific thing* (a design system) in *this specific way*. This is why the token vocabulary stays deliberately small (five radii, one accent, three type roles) rather than growing an escape hatch for every edge case, and why new components should solve the actual audit workflow in front of them rather than be built as generic, configurable primitives "just in case." When a design decision is ambiguous, prefer the option that does one thing precisely over the option that could theoretically do several things adequately.

### 3. Defer to the data
Apple's principle: *"the UI helps people understand and interact with the content, but never competes with it."* Specd's actual content is the audit data — component names, coverage percentages, flagged values, hex codes. The chrome around it (navy header, hairline borders, violet accent) exists only to organize and never to compete for attention. This is the reasoning underneath the no-shadow, no-decorative-gradient, monochrome-plus-one-accent rules already in this document — they're not arbitrary restraint, they're deference. If a future component idea makes the *interface* more interesting at the cost of making the *data* less scannable, the interface idea loses.

### 4. Calm confidence, not alarm
Combining Apple's Depth (hierarchy through real structure, not decorative intensity) with Stripe's stance that *"the best error message tells you what went wrong and what to do next"* rather than just failing loudly: Specd reports bad news constantly — this component has no description, that value is hard-coded, this library is stale — and it should never feel like an alarm going off. Severity is communicated once, clearly, through the established semantic colors and hierarchy (critical/warning/info sections, tier-colored dots), not reinforced with urgency-signaling motion, saturated red washes, or exclamation-heavy copy. A critical issue and a passed check should sit in the same calm visual register — the *information* carries the weight, not the styling.

## Tokens — Colors

### Accent (single, functional — theme-specific value)

A single accent value can't hold accessible contrast on both a light and a dark canvas at once — deepening it for light-mode contrast weakens it on dark, and vice versa. So the accent is one color concept, expressed as two values:

| Name | Light value | Dark value | Token | Role |
|------|-------|-------|-------|------|
| Signal Violet | `#5B3DF0` | `#8B76FF` | `--color-signal-violet` | The one interactive color. Filled buttons, active tab/nav state, focus rings, checked toggles, links. Never a background fill larger than a control, never decorative. Light: 6.23:1 vs white paper. Dark: 5.73:1 vs void canvas — both clear WCAG AA for normal text. |
| Signal Violet Hover | `#7A64F2` | `#A695FF` | `--color-signal-violet-hover` | Hover/pressed state for filled violet controls |
| Violet Tint | `#F1EDFF` | `rgba(139,118,255,0.16)` | `--color-violet-tint` | Wash for selected rows, ghost-button fill, subtle highlight backgrounds |

Never place violet text directly on the navy `--color-ink` surface — contrast drops below 3:1 in that combination. Violet only sits on `--color-canvas`/`--color-paper` (light) or `--color-void`/`--color-carbon` (dark).

### Ink & Neutrals — Light theme

| Name | Value | Token | Role |
|------|-------|-------|------|
| Ink | `#12142B` | `--color-ink` | Primary text, headings — near-black with the navy undertone that is Specd's inherited identity color |
| Ink Soft | `#40415C` | `--color-ink-soft` | Secondary text, nav labels at rest |
| Muted | `#6B6D85` | `--color-muted` | Tertiary text, helper copy, placeholder text, inactive icons |
| Faint | `#9799AC` | `--color-faint` | Disabled text only — 2.7:1 on canvas, below the 4.5:1 WCAG AA minimum, which is acceptable only because disabled controls are exempt |
| Hairline | `rgba(18,20,43,0.10)` | `--color-hairline` | Card borders and dividers — the only structural edge in the system. Too faint (below 3:1) to be the only visible edge of a text input or focus state; inputs need a stronger outline (see Marketing Extension → Accessibility) |
| Canvas | `#FAFAFB` | `--color-canvas` | Page/panel background |
| Paper | `#FFFFFF` | `--color-paper` | Card surfaces, popovers, modals |

### Ink & Neutrals — Dark theme

| Name | Value | Token | Role |
|------|-------|-------|------|
| Paper Dark | `#F4F4F8` | `--color-paper-dark` | Primary text on dark surfaces |
| Mist Dark | `#B8B9CC` | `--color-mist-dark` | Secondary text |
| Muted Dark | `#7B7D93` | `--color-muted-dark` | Tertiary text, helper copy. 4.85:1 on void but **4.49:1 on carbon** — just under AA for small text; use Mist Dark for helper copy that sits on cards |
| Hairline Dark | `rgba(255,255,255,0.10)` | `--color-hairline-dark` | Borders, dividers on dark surfaces |
| Void | `#0A0B14` | `--color-void` | Page/panel canvas — near-black with a whisper of navy, not pure black |
| Carbon | `#14151F` | `--color-carbon` | Card surfaces, one step up from void |
| Obsidian | `#1B1C2B` | `--color-obsidian` | Elevated surfaces — modals, popovers, nested panels |

### Semantic (status only — never brand, never decorative)

| Name | Light | Dark | Token | Role |
|------|-------|------|-------|------|
| Success | `#16A34A` | `#34D399` | `--color-success` | Passed checks, bound tokens, published states |
| Warning | `#D97706` | `#FBBF24` | `--color-warning` | Stale data, missing doc links, needs-attention states |
| Error | `#DC2626` | `#F87171` | `--color-error` | Failed checks, hard-coded values, critical issues |

These three never appear as a UI accent, a button fill, or a decorative wash — they exist to answer "is this healthy?" and nothing else. If a status color and the violet accent would ever collide in the same control (e.g. a "fix this" button on an error row), the control stays violet; status color stays confined to the icon/badge reporting the problem.

## Tokens — Typography

**Decision: single family.** Every reference brand reviewed (Apple, Linear, Notion, Stripe, shadcn, Oryzo) uses one type family across body *and* display — hierarchy comes from weight and size, not a second face. Specd's original Inter + Bricolage Grotesque split was the one departure from that pattern; it's been retired in favor of a single family, matching shadcn exactly rather than substituting.

### Geist — UI + Display, single family
Everything: body copy, nav, labels, buttons, headings, health-score numerals, big stat callouts. `--font-ui` and `--font-display` both resolve to Geist; weight and size carry the hierarchy. `--font-ui` / `--font-display`
- **Weights:** 400 (body), 500 (labels/nav), 600 (emphasis, active tab), 700–800 (headings/display)
- **This is shadcn's real font, not a substitute** — the strongest-fidelity option from the reference set considered.
- Was: Inter (UI) + Bricolage Grotesque (display), both already loaded in `pulse/src/ui.html`. Those remain valid as a fallback stack (`Geist, Inter, -apple-system, sans-serif`) but are no longer the primary faces.

### JetBrains Mono — Technical accent
Token percentages, variable IDs, hex/RGBA values, coordinates, keyboard-shortcut style micro-labels. Never headings, never body paragraphs. `--font-mono`
- **Weights:** 400, 500, 600
- **Sizes:** 9, 10, 12px, always uppercase with +0.03–0.05em tracking at the smallest sizes
- Linear's own #1-listed substitute for Berkeley Mono (ranked above IBM Plex Mono in their reference file). Was: IBM Plex Mono, already loaded in `pulse/src/ui.html` — remains a valid fallback (`JetBrains Mono, IBM Plex Mono, monospace`).

### Type Scale (product surfaces — plugin panels, 360–660px wide)

| Role | Size | Weight | Line height | Tracking | Font |
|------|------|--------|-------------|----------|------|
| micro-label | 10px | 500 | 1.3 | 0.03em (uppercase) | Geist |
| mono-label | 10px | 500 | 1.3 | 0.04em (uppercase) | JetBrains Mono |
| caption | 11px | 400 | 1.4 | normal | Geist |
| body-sm | 12px | 400 | 1.5 | normal | Geist |
| body | 13px | 400 | 1.5 | normal | Geist |
| label | 13px | 500 | 1.4 | normal | Geist |
| heading-sm | 16px | 700 | 1.3 | -0.01em | Geist |
| heading | 20px | 700 | 1.25 | -0.01em | Geist |
| heading-lg | 24px | 800 | 1.15 | -0.02em | Geist |
| display | 32px | 800 | 1.1 | -0.03em | Geist |
| display-lg | 40px | 800 | 1.05 | -0.03em | Geist |

## Tokens — Spacing & Shape

**Base unit:** 4px · **Density:** compact (plugin panels are 360–660px — this is instrument density, not marketing density)

### Spacing Scale

The spacing tokens in code are `--space-N` (index-based, not pixel-named). **Known conflict:** two files define the same names with different values, and because `index.css` imports `spacing.css` after `colors.css`, the `spacing.css` values win everywhere the full token set is loaded:

| Token | `spacing.css` (wins) | `colors.css` (shadowed) |
|------|-------|-------|
| `--space-1` | 2px | 4px |
| `--space-2` | 4px | 8px |
| `--space-3` | 6px | 12px |
| `--space-4` | 8px | 16px |
| `--space-5` | 12px | 20px |
| `--space-6` | 16px | 24px |
| `--space-8` | 24px | 32px |
| `--space-7`, `--space-9`…`--space-12` | 20, 32, 40, 48, 64px | — |

A consumer that loads only `colors.css` gets the other scale. **Decision needed:** keep the `spacing.css` scale (it's what every plugin renders today) and delete the duplicates from `colors.css`. Until then, new work should use raw multiples of the 4px base unit via the `spacing.css` names.

### Border Radius — nested & concentric (Apple-inspired)

Apple's corners aren't just "rounded" — they're *concentric*. A squircle icon tile sitting inside a squircle app-icon slot, sitting inside a squircle-cornered Settings row, all read as one continuous family of curves because each inner shape's radius is derived from the shape it sits inside, not chosen independently. iOS 26's `ConcentricRectangle` API formalized this as a system primitive: give it a container and a padding, it derives the correct inner radius automatically. Two references informed this section: ["Rounded corners in the Apple ecosystem"](https://medium.com/minimal-notes/rounded-corners-in-the-apple-ecosystem-1b3f45e18fcc) and ["The secret formula for Apple's rounded corners"](https://arun.is/blog/apple-rounded-corners/).

Two separate ideas are easy to conflate here, and it's worth being precise about which one Specd actually adopts:

1. **Curvature continuity (squircles).** A true squircle/superellipse has *G2 continuity* — curvature increases smoothly from the flat edge into the corner, with no discontinuity. A standard CSS `border-radius` corner has only *G1 continuity* — the curvature jumps instantly from zero (flat edge) to a fixed value (the arc) at one exact pixel. This is real and visible at large sizes (Apple's app icons, big sheets), but reproducing it in CSS needs an SVG path or `clip-path: path(...)`, not a layout primitive — too much overhead for panel-scale UI at 360–660px. **Specd does not attempt true squircle curvature** outside the plugin icon assets (see Plugin Icon System below, which are pre-rendered SVGs, not live CSS).
2. **Corner concentricity (nesting).** This is the part that's cheap, high-leverage, and was previously missing from this system entirely: *when a rounded element sits close inside another rounded element, the inner radius should equal the outer radius minus the gap between them* — `r_inner = r_outer − gap`. Get this right with plain circular `border-radius` and the nesting reads as soft and intentional even without true curvature continuity; get it wrong (as Specd's own redesigned card/icon-tile pairs were, before this pass — see below) and corners look randomly assorted even though every individual value is "soft."

**The rule only applies when the child hugs the parent's corner** — specifically when `gap < r_outer`. If the padding is generous enough that the child never gets close to the parent's curve (Specd's `issues-landing-card-icon`, inset 20px inside a 12px-radius card, is a real example already in the codebase), concentricity is moot — pick a radius on taste, or go fully circular. Apple does the same thing with small circular badges and avatars: "the closer an object is to the human, the rounder it gets" is a *separate* rule from concentricity, for a different category of shape.

| Tier | Value | Token | Used for |
|------|-------|-------|----------|
| tile (derived) | `calc(surface − 14px)` → 6px | `--radius-tile` | icon tile nested in a standard 20px card, e.g. `.is2-card-icon` |
| tile-sm (derived) | `calc(surface-sm − 12px)` → 4px | `--radius-tile-sm` | icon tile nested in a compact 16px row, e.g. `.cx2-icon`, `.cx2-jump` |
| chip / small control | 6px | `--radius-chip` | small controls with generous inset (not hugging a corner) |
| input | 8px | `--radius-input` | text inputs, search fields |
| card (legacy/small) | 10px | `--radius-card` | small standalone tiles (freshness tiles) — pre-dates the surface tier below |
| modal / drawer | 12px | `--radius-modal` | dialogs, drawers (not yet migrated to `--radius-surface-lg`, see Layout below) |
| surface-sm | 16px | `--radius-surface-sm` | compact card-row lists — `.cx2-row` |
| surface | 20px | `--radius-surface` | standard cards/panels — `.is2-card`, `.ov2-breakdown` |
| surface-lg | 24px | `--radius-surface-lg` | large sheets/modals (reserved for future modal migration) |
| pill | 9999px | `--radius-pill` | buttons, badges, tags, chips — categorically capsule, never part of concentric nesting |

**Legacy radius names — known conflict.** `--radius-sm/md/lg/xl` are defined in both `colors.css` (6/10/14/20px) and `spacing.css` (4/6/8/12px); `spacing.css` loads later and wins. 1,600+ existing `var()` references depend on these names, so they are kept, but new work should use the named tiers in the table above. **Decision needed:** delete the `colors.css` copies so there is one definition.

**Worked examples from the actual codebase:**
- `.is2-card` is 20px, its content sits at 14px vertical inset (`.is2-card-top { padding: 14px 16px }`) → the nested icon tile should be `20 − 14 = 6px`, expressed as `--radius-tile: calc(var(--radius-surface) - 14px)`. It was hardcoded at 10px before this pass — nearly double the concentric value, which is why the icon tile's corner looked slightly "off" against the card's corner even though both were technically "rounded."
- `.cx2-row` is 16px, its content sits at 12px vertical inset (`padding: 12px 14px`) → nested tile should be `16 − 12 = 4px`, expressed as `--radius-tile-sm: calc(var(--radius-surface-sm) - 12px)`. It was hardcoded at 9px before this pass.

Deriving with `calc()` instead of hardcoding the result means these stay correct automatically if the surface radius or its padding is ever retuned — the same reasoning behind Apple shipping `ConcentricRectangle` as an API instead of a design-file convention.

### Shadows — none by default
No box-shadow on cards, buttons, or panels. Depth comes from the surface-tint stack below and 1px hairline borders. The one exception: a soft ambient glow (not a directional shadow) behind the score ring, drawn from the same violet as gradient #1. (Apple's own Health app cards actually do use a soft shadow for elevation — noted as a deliberate point of departure, not an oversight: Specd's hairline+tint system was chosen to match Stripe/Linear's flatter instrument feel, and mixing elevation systems within one app reads as inconsistent faster than it reads as "borrowed from a good reference.")

## List & Card Patterns — grouped, not divided

Synthesized from three iOS/Apple reference screens reviewed directly (iCloud storage settings, Health's Summary tab, Health's Heart Rate detail/Highlights view) rather than from general Apple-design knowledge — each rule below traces to something actually visible in one of those screens.

**Grouped tiles instead of a divided row.** iCloud's "Saved to iCloud" section and Health's pinned-card list never separate sibling items with a hairline — each item is its own fully-rounded surface on a shared neutral background, and the *gap between tiles* is what reads as separation, not a border. Specd's stat strip (Overview's Components/Sets/Pages/Issues counts) used to be one flat row divided by `border-left` hairlines; it's now a 2-column grid of independent `--color-neutral-tint` tiles with no dividers at all — apply this same substitution anywhere a future screen is tempted to reach for a divided row of short stats (a divider is almost always standing in for "these should have been separate cards").

**Segmented controls are capsules, not small-radius rectangles.** Every Apple segmented/tab control in the reference set is a full pill, regardless of how rounded its containing card is — a segmented control living inside a 20px-radius card doesn't inherit or reference that number at all, because it's a capsule *control*, the same shape category as a button. This isn't a concentricity violation (see above) — it's the flip side of the same rule: only apply `r_inner = r_outer − gap` to elements that visually hug a parent's corner; a segmented control floating with generous padding inside its card is exempt, same as a small circular badge.

**A tabbed/segmented panel's height should track its content, not the tallest sibling.** Nothing in the reference set reserves dead space for a shorter panel "in case" a longer one needs room later — Health's Highlights cards are exactly as tall as their own chart, no more. A fixed `min-height` sized to the tallest tab is a shortcut that trades a real layout jump for a fake, constant one; animate the container's height to each panel's actual measured content instead (see Motion's non-interpolable-value rule for the implementation trap to avoid).

**Compensate scroll position explicitly when a panel shrinks.** The height-tracking rule above has a consequence worth planning for: if panels genuinely differ a lot in height (a 120-item grid vs. two summary tiles) and the user is scrolled down when they switch to a shorter one, the scroll container's total scrollable height shrinks out from under their current scroll position — left to the browser's own clamping, this reads as "the page randomly scrolled up" rather than a deliberate reframe. Measure the old and new panel heights, and if the panel shrank, explicitly scroll by the exact delta with `behavior: 'smooth'` — content above the panel never visibly moves, and only the space the panel itself no longer needs is reclaimed, deliberately, instead of an implicit clamp landing wherever the arithmetic happens to put it.

**List/card edge inset should be one consistent number, not layered margins.** Apple's grouped lists sit at one inset from the screen edge for the entire screen — the "Saved to iCloud" grid, the section below it, and the section below that all start at the same x-position. Mixing paddings (a hero at 24px, a stat row at 24px+24px margin, a card below it at 12px) reads as misaligned even when each individual value is reasonable in isolation. Specd's plugin panels standardize on 12px.

**A repeating badge/pill of variable text length needs a fixed minimum width if anything else in the row depends on where it ends.** A status badge reading "GOOD" vs. "EXC" vs. "POOR" differs by a character or two — invisible in isolation, but visibly staggers a progress bar sitting immediately after it once the same row shape repeats seven times down a list. Fix with a `min-width` scoped to that specific context (not a global change to every badge everywhere it appears), sized to the longest label actually in use there.

## Scored Section Headers

A sub-heading that introduces a score, a coverage summary, or a pass/fail breakdown should never be plain ink like every other heading — its icon and text should share one colour computed from what it's actually reporting, the same way Apple Health colours "Activity" orange and "Heart Rate" red rather than using one neutral heading style for every category. This makes the heading itself carry a little of its own meaning instead of being purely decorative chrome, and gives a busy page (Overview, Component Detail) a subtle rhythm of colour that tracks the actual data rather than an arbitrary palette.

**Structure**: an icon (15×15px) and a heading (`--font-heading`, 700 weight, 14px) sit inline with a 7px gap, and both take the *same* colour — never colour the icon alone or the text alone. Class names: `.specd-tone-header` (flex wrapper) containing `.specd-tone-header-icon` (15×15 SVG, `display:flex`) and `.specd-tone-header-title` (the heading text).

**Tone comes from meaning, not decoration** — one of four values, added as a modifier class on `.specd-tone-header` itself:
- `tone-violet` — the section is action-oriented (tools, generators, exports) rather than reporting a score. Uses the one brand accent, same as any other primary action.
- `tone-positive` / `tone-warning` / `tone-negative` — the section reports a score, coverage percentage, or pass/fail state. Compute the tone from the *actual* number being summarised, the same way the score ring's own tier colour is computed — e.g. a health-check section with a 3/7 pass rate gets `tone-negative`, not a hardcoded colour. Never hand-pick one of these three for a section that isn't actually reporting a score.
- No tone modifier (plain ink) — the section is neutral/informational and isn't summarising a score at all (e.g. a status line or metadata list).

**Reference implementation**: Pulse's Component Detail page (health-check section headers, tone computed from `PASS_RATIO`) and Overview page (`Health Breakdown` header) both use this pattern — see the `.specd-tone-header`/`.cd2-section-title-row` comment block in `components.css` for the exact CSS (the two are the same visual recipe; `.cd2-section-title-row` is Component Detail's original, page-specific name for it, `.specd-tone-header` is the suite-wide name new usages should reach for). **This is a suite-wide pattern, not a Pulse-only one** — any Specd Tools plugin (Specced, Mapped, Shipped, Shift, Released) introducing a section that summarises a score or status should use `.specd-tone-header` rather than inventing its own heading treatment.

## Buttons

Two button systems currently coexist in this codebase, and which one to reach for depends on whether the surface you're building has already been through a redesign pass.

**`.btn-pill-primary` / `.btn-pill-ghost` — current standard, use for all new and updated work.** Pill radius (`--radius-pill`), a 1px hairline border (ghost) or a solid signal-violet fill (primary), and any inline icon hover-nudges via `translate(1px, -1px)` on `.btn-icon svg` — the same "reveal, don't just recolor" motion rule that governs directional glyphs elsewhere in this document, applied to buttons specifically. Available as `<specd-button variant="pill-primary">` / `<specd-button variant="pill-ghost">`, or the raw `.btn-pill-primary`/`.btn-pill-ghost` classes directly. `.btn-sm` composes cleanly with either (`padding: 5px 12px`, pill radius preserved — the combined selector is deliberately higher-specificity than `.btn-sm` alone so this composition can't regress back to a box radius).

**`.btn-primary` / `.btn-ghost` — legacy, box radius (`--radius-md`/`--radius-sm`), solid navy fill.** Not broken — plenty of not-yet-redesigned surfaces still use it correctly for their own current visual language — but deprecated for new work in the sense that a page going through a redesign pass migrates its buttons to pill as part of that pass, the same way it migrates its cards to `--radius-surface` and its section headers to `.specd-tone-header`. Two systems coexisting mid-rollout is expected, not a bug to fix by mixing them.

**Never mix the two systems within a single view.** A screen belongs to either "reviewed" (pill buttons, `--radius-surface` cards, `.specd-tone-header` sections) or "not yet reviewed" (legacy, consistently) — using one system for a primary action and the other for a secondary action on the *same* page reads as an oversight, not a deliberate two-tier hierarchy.

**One filled (primary) action per view** still applies exactly as in the existing Do/Don't — pill changes the shape, not that rule.

## Auditable Field Patterns

Every Specd plugin's core job is the same shape, regardless of what it's actually auditing: show the user a fact about their design system, and — where an in-app fix exists — let them act on it without leaving the page. Pulse's Health Checks section (Component Detail) is the concrete implementation this pattern was extracted from, but the taxonomy below is deliberately data-*shape*-based, not Pulse-specific — Specced auditing doc completeness, Mapped auditing alias chains, Shipped auditing handoff readiness all hit the same eight shapes, just with different field names. **Any Specd plugin adding an editable audit field should pick a row from this table before inventing new UI.**

### Three states, one question each

Before picking a shape, every auditable field goes through the same three states, and each answers a different question:

1. **Empty / missing** — *"how do I fill this in?"* The field is highlighted (never just a blank line — blank reads as "nothing to see here," not "this needs attention") and the fix happens in the same space the problem was found, whenever the fix is simple enough to fit there.
2. **Editing** — *"how much room does this actually need?"* Some fields fit their entire edit flow inline; others (a list of several things to individually accept/skip, a search-and-pick flow, a guided multi-step mapping) do not, and forcing them into a card produces exactly the clutter this pattern exists to remove. This is what the shape taxonomy below decides.
3. **Complete** — *"what's true right now, and how do I change it?"* A passed check is not a dead end — it plays back its real value (per **Show your work**, above: never hide a value behind a second click just because it's already correct) and offers a way back into editing sized to match the shape.

### The eight shapes

| Shape | What it is | Example (Pulse) | Empty state | Editing | Complete state |
|---|---|---|---|---|---|
| **A** — short text | Single-line, low-effort to write | *(generic — no current Pulse check is exactly this)* | Dashed-outline inline field | Inline, same field | Playback + inline re-edit |
| **B** — long text | Multi-line, needs more thought | Description | Dashed-outline `<textarea>`, plus a Generate action if a heuristic could plausibly draft it | Inline, same field | Playback (truncated) + inline re-edit |
| **B2** — multi-field templated text | Shape B, but the library's doc template splits it into named sections | Description, when a doc template applies | "Apply template" action visible near the field | **Drawer** — one field per heading | Playback of the primary field + "Edit in drawer" |
| **C** — link/URL | A single URL, no other shape | Doc link | Dashed-outline inline field, **no Generate action** — only a human knows the right link | Inline, same field | Playback (as a live link) + inline re-edit |
| **D** — enum/status | One of a small, fixed set of states | Ready for Dev | N/A (always has a value) | Inline segmented control, same card | Playback (pill) + the same inline control |
| **E** — external-action flag | The real action happens outside Specd entirely | Publish status | N/A | **No in-app edit exists** — see External-action reminder, below | Prominent CTA reminder, not a quiet link |
| **F** — aggregate + itemized list | One summary number backed by N individual items | Variable coverage | Summary shown, "Review & apply" opens drawer | **Drawer** — accept/skip per item | Playback (e.g. "42% variable coverage") + "Review & apply" |
| **G** — search & match | Current state is a match against a searchable set | Storybook sync | Playback of the best-guess match | **Drawer** — search + pick | Playback of the current match + "Change match" |
| **H** — structured multi-step mapping | A short guided sequence, not a single field | Code Connect mapping | Playback of progress (e.g. "nothing mapped yet") | **Drawer** — guided steps | Playback (one-line summary) + "Edit mapping" |

**The deciding question for "does this need a drawer?" is always the same: does resolving this field involve more than one decision, or content that wouldn't fit a status card without scrolling inside it?** If yes (F, G, H, B2) it's a drawer. If the whole edit is one field or one control (A, B, C, D), it stays inline. Shape E is edited nowhere in Specd at all — see below.

### Empty-state styling

A field's empty state is a **dashed accent outline** (`1.5px dashed var(--color-signal-violet)`), never a filled violet background — per **Defer to the data**, above, a filled violet box would compete with the value about to go in it — and never just muted placeholder text indistinguishable from a normal field. A "Missing" flag (a small status dot + label) sits in the field's own header, but only while genuinely untouched: once the user has staged or applied a value, the flag disappears rather than contradicting the staged/applied tag sitting right next to it. Offer a **Generate** action only when a heuristic or AI pass could plausibly draft real content (shapes B/B2) — never for shape C, since a doc link is either the correct URL or actively wrong, and no heuristic should guess at one.

### The full-window drawer

Shapes F, G, H, and B2 share one drawer component rather than each inventing its own overlay — see **Full-screen Drawer**, below, for the implementation. The drawer's body swaps content based on which field opened it; only one body block is ever visible at a time.

### External-action reminder (shape E)

Some facts Specd reports on can't be changed from inside Specd at all — Pulse can't publish a library to Figma's Assets panel on the user's behalf. For this one shape, the "edit" affordance is not a quiet secondary link (which would undersell that something needs doing) but a **primary-weight CTA** — solid violet, not outline — reading as a direct instruction ("Publish in Figma") rather than a suggestion. This is the one place a health-check card's action button is allowed to be `.btn-pill-primary` instead of the outline treatment (`.btn-pill-ghost`/`.cd2-edit-trigger`) every other shape uses, precisely because it's reporting the one thing Specd genuinely cannot fix itself.

### Card header conventions

Any status card with a **trailing action** (an edit-trigger pill, a "Change match" link) groups its leading dot + title into a single wrapper (`.cd2-status-head-main` or equivalent) *inside* the header row, rather than letting the header's own `justify-content: space-between` act directly on the dot and title as two separate flex children. Skipping this wrapper is a real, previously-shipped bug: with only two children present, `space-between` pushes the dot to the far left and the title all the way to the far right instead of keeping them together and pushing only the trailing action away. **Apply the wrapper even on cards that don't currently have a trailing action** — it costs nothing today and prevents the same bug from resurfacing the moment a future edit adds one.

The single most-reached-for action on a page (Component Detail's "Jump to canvas") belongs at the **top-right of its card**, level with the eyebrow/metadata line — not buried in a row of secondary actions below the title. Secondary actions (Open in Dev Mode, etc.) stay in a conventional actions row beneath the title.

## Full-screen Drawer

Figma plugin UI is a bounded floating window with **no true OS-level fullscreen** (confirmed against Figma's own plugin API docs — `figma.ui.resize()` has no documented maximum, but the UI itself is always a modal-style floating panel, never a real fullscreen surface). "Full screen" for a Specd drawer therefore means covering exactly the plugin's own window — `position: fixed; inset: 0` — which only diverges from the browser viewport when the same markup is previewed inside a larger page (Storybook, a review mockup) simulating the plugin window inside something bigger.

**Position the drawer by JS-measured coordinates, not a CSS containing-block trick.** The natural approach — give the simulated "plugin window" wrapper a `transform` so it becomes a CSS containing block for the drawer's `position: fixed` — looks correct in theory and failed in practice, twice, for reasons that traced back to unrelated causes each time (a stray `transform` left on an ancestor; a CSS entrance animation that hadn't actually finished, per the Motion note below) rather than anything wrong with the containing-block math itself. The reliable fix: on open, measure the simulated window's `getBoundingClientRect()` directly and apply explicit `top`/`left`/`width`/`height` to the drawer via inline styles, falling back to the CSS default (`inset: 0`, i.e. the real viewport) when no such simulated wrapper exists — which is exactly correct for the real plugin, where the iframe already *is* the whole window.

**`.show()`, not `.showModal()`.** A `showModal()` dialog is promoted to the browser's top layer, which — by design, so it always renders above everything — ignores the positioning above entirely. Use `.show()` and reimplement the backdrop (a plain click-to-close div) and Escape-to-close by hand; full focus-trapping is knowingly not reimplemented here and should be revisited before a drawer like this ships in a production plugin.

## Consumer-Validated Patterns

Patterns and component-reuse claims confirmed against a real, external `specd-ds` consumer rather than just designed in the abstract — recorded here once a plugin actually proves them out, per this document's own "show your work" standard applied to itself. First entries below come from Branch (a release-notes plugin), the first consumer whose entire UI is one linear step-through flow and the first non-Pulse-fix-flow use of `SpecdDiffRow`.

### Linear wizard pattern: `SpecdAppHeader` + `SpecdStepper` vs. `SpecdWizardShell`

`SpecdWizardShell` (see Full-screen Drawer, above) is for a flow launched **as an overlay on top of another screen it needs to close back to** — the Quick-Fix and Bulk-Fix wizards it was built for both interrupt an existing Issues/Components view, and its `specd-close` event exists specifically to return the user to that screen. It renders a full `.qf-wizard` overlay, complete with its own top bar (close button, brand mark, title, mode toggle), on top of whatever was already on screen.

Branch's release-notes flow — pick a range, review the diff, write notes, publish — is a different shape: there is no parent screen to close back to, because the wizard *is* the entire plugin. For this shape, compose `SpecdAppHeader` (the persistent branding/name/actions bar) with `SpecdStepper` (the step-progress indicator) and render each step's own content in the plugin's normal document flow beneath them, instead of reaching for `SpecdWizardShell`.

**The distinguishing question: does this flow have a parent screen to return to?** Yes → `SpecdWizardShell`. No, the flow *is* the whole plugin → `SpecdAppHeader` + `SpecdStepper`. Branch is the first consumer to need the second shape; every stepper-shaped flow in the suite before it had a parent screen to close back to.

### `SpecdDiffRow` generalizes beyond fix-flow comparisons

`SpecdDiffRow` was designed for Component Detail's "current vs. proposed fix" use case (see Auditable Field Patterns, above). Branch's diff preview reuses it, unmodified, for a structurally different comparison — a baseline value vs. a branch's proposed value, with nothing being "applied" in the audit sense at all — and it holds up with zero component changes needed. Treat this as confirmed, not as an assumption to re-derive: `SpecdDiffRow` is a generic before/after field comparison, not a fix-flow-specific component, and any future consumer doing a two-sided value comparison should reach for it directly.

### Scoping specd-ds's CSS during a partial, tab-by-tab migration: `.specd-v2-root`

Pulse is the first consumer to migrate its UI onto `specd-ds` **gradually** — one existing tab redesigned at a time, in the same running plugin, rather than a from-scratch build (Branch) or a single-pass rewrite. This surfaced a real coexistence problem this document's token system hadn't been tested against: Pulse's pre-existing, hand-rolled CSS (built up over the plugin's own history) and specd-ds's compiled `components.css` turned out to share **476 colliding class names** once actually diffed — not just cosmetic near-misses, but full component redefinitions (`.btn-primary`/`.btn-ghost` meant entirely different things in each stylesheet) and three completely unscoped global element selectors (`*`, `html, body`, `button, input, select, textarea`) that would have silently reset spacing/typography/fonts app-wide the moment both stylesheets loaded together.

**Resolution:** a small build-time step (`postcss` + `postcss-prefix-selector`) rewrites every selector in specd-ds's *compiled* CSS output so it requires a `.specd-v2-root` ancestor class, then Pulse applies that class only to the root container of whichever panel has actually been migrated so far. A not-yet-migrated panel simply never gets the wrapper class, so it's structurally unreachable by any scoped rule regardless of how many class names collide — the 476-collision count became irrelevant rather than something to individually resolve. This is the answer to "can old, unscoped CSS and specd-ds's CSS coexist in one document during a migration window": yes, but only with an explicit scoping boundary — never by relying on load order, specificity, or hoping the class names don't actually clash in practice.

**One real trap in the scoping transform itself, worth carrying forward:** the transform must exempt not just `:root`/`html`/`body`-anchored selectors from the `.specd-v2-root` prefix, but also any selector *led by* a `[data-theme="..."]` attribute selector (e.g. `[data-theme="dark"] .some-component`). The theme attribute lives on `<html>`/`<body>` — an **ancestor** of `.specd-v2-root`, not a descendant of it — so naively prefixing that selector produces `.specd-v2-root [data-theme="dark"] .some-component`, which can never match anything in the real DOM. This is a silent failure (the rule just never fires, no error), so it's easy to ship and only notice much later when a dark-theme-specific style mysteriously doesn't apply to a newly-migrated panel.

**Applicability:** this is a suite-wide pattern for any Specd Tools plugin doing a *partial* migration (an existing plugin moving onto `specd-ds` panel-by-panel), not a Pulse-specific workaround — Branch and any future from-scratch plugin never need this, since they have no legacy CSS to coexist with in the first place.

## Surfaces

### Light
| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Canvas | `#FAFAFB` | Panel background |
| 1 | Paper | `#FFFFFF` | Cards, rows, popovers |
| 2 | Violet Tint | `#F1EDFF` | Selected/active row, ghost-button fill |

### Dark
| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Void | `#0A0B14` | Panel background |
| 1 | Carbon | `#14151F` | Cards, rows, popovers |
| 2 | Obsidian | `#1B1C2B` | Modals, nested/elevated panels |
| 3 | Violet Tint (dark) | `rgba(139,118,255,0.16)` — `--color-violet-tint` | Selected/active row, focus states |

## Gradients (three, each argued for)

Gradients are intentional accents, not general decoration — matching the one reference (Linear) that used them at all.

1. **Score ring sweep** — a conic-gradient from `--color-signal-violet` through `--color-signal-violet-hover` and back, following the ring's stroke-dasharray progress. This is the system's signature moment: the one place color visibly *fills* rather than just marking a control.
2. **Header wash** — a near-invisible linear-gradient behind the app header/nav bar, `--color-canvas` (or `--color-void`) fading to a 4–6% violet tint at the top edge. Atmospheric only — text and controls sit on top unaffected.
3. **Landing Page Hero** — an Overview tab's score+name+meta card (`.ov2-hero-dynamic`), prototyped on Pulse and first actually implemented on Library Asset Auditor, documented here as the intended suite-wide pattern (see the dedicated Landing Page Hero section below for the full recipe and per-plugin metric guidance). Reference: Apple Health's Summary header. A slow-drifting pastel linear-gradient wash tinted by score tier (calm green for a healthy library, amber for middling, coral for poor — a 4th violet tint exists only as a comparison-story sample colour, per components.css's own tier-mapping comment, never used for a real scored result), plus a soft white corner ripple (`.ov2-header-ripple`, five blurred concentric shapes, one continuous expand-and-fade loop) anchored to one corner for a touch of ambient depth. Contrast checked for real, not assumed: every gradient stop is ≥88% lightness, `--color-ink` measures 14.2–16.5:1 against every stop, `--text-secondary` (used for the meta line) measures 7.75–9.01:1 — `--text-muted` was tried first and failed on 3 of 8 stops, so it isn't used here. Light theme only for now (a bright pastel wash reads wrong on a dark canvas regardless of the contrast math; dark theme keeps a plain card). This was explicitly proposed, reviewed, and iterated live with the product owner (colour count, motion style, anchor corner, and blur amount were each tried and adjusted in turn) before being promoted here — see the `.ov2-hero-dynamic`/`.ov2-header-ripple` comment blocks in `components.css` for the full history.

No gradients on buttons, badges, or body content, and no gradient anywhere outside these three named locations. If a fourth use case comes up later, it should be argued for with the same rigor as these three — proposed as an explicit experiment, reviewed live, contrast-checked before shipping — not added by default.

## Icons

Thin-stroke line icons only, 1.5px stroke weight, monochrome (inherit `currentColor` — never a separate icon-color system). Sized 14–16px in compact UI contexts, 20px+ only in empty-states or onboarding illustrations. Filled/solid icon variants are reserved for tiny status dots (success/warning/error) at 6–8px — never for a full icon glyph.

This rule governs *in-product* icons only. Plugin-level app icons (the icon shown for Pulse, Specced, etc. in Figma's plugin picker and each plugin's own header) are a separate, deliberately different system — see below.

## Landing Page Hero

The intended shared recipe for every Specd Tools plugin's Overview-style landing tab — prototyped on Pulse (currently only in its redesign mockup, not yet wired to its real UI) and first fully implemented on Library Asset Auditor (on an unmerged feature branch as of this writing, not yet on LAA's main). Documented here as the suite-wide pattern going forward, not a Pulse-specific one. Reference: Apple Health's Summary header (a big number, calmly colored by what it means, with just enough supporting text to explain it).

**Structure** (verbatim class names, unchanged from Pulse's original):
- `.ov2-hero-dynamic.tier-{positive|warning|negative}` — the outer card. The tier modifier drives the gradient wash (see Gradients, above, for the exact color stops and contrast numbers) and must be computed from the plugin's own real metric, never hand-picked.
- `.ov2-header-ripple` (five `.circle.{size}.shade{1-5}` divs) — the ambient corner ripple, identical markup regardless of plugin.
- `.ov2-hero` containing, in order: `.ov2-hero-ring-wrap` (a `<specd-score-ring>`), `.ov2-hero-name`, `.ov2-hero-meta`, `.ov2-hero-badges`.

**Tier mapping** (collapses the ring's own 4-tier scale to the hero's 3 gradient tiers): ring tier `excellent` or `good` → `tier-positive`; `med` → `tier-warning`; `poor` → `tier-negative`. Never hand-pick a tier independently of the ring's own computed value for the same number.

**What the ring's number should represent — plugin-specific, but always a real, explainable metric.** Each plugin picks its own single metric, appropriate to what it actually audits:
- **Pulse**: a weighted health score blending description/token/doc-link/dev-status/publish coverage — formula documented in Pulse's own `CLAUDE.md`.
- **Library Asset Auditor**: a plain compliant-items ÷ total-items ratio — no weighting, since LAA's four categories (components/variables/overrides/detachments) aren't naturally comparable enough to justify picking relative weights the way Pulse's five factors are.

Both are valid because both are *derived, documented, and reproducible from the plugin's own visible data* — per DESIGN.md's "show your work" principle applied to the metric itself, not just its on-screen display. A future plugin adopting this pattern must document its own formula the same way, not silently reuse a number that doesn't mean what the hero implies it means.

**`.ov2-hero-name` content varies by plugin.** Pulse shows the audited library's name (it has one, definite name). A plugin auditing a page/selection/document rather than a single named library — like LAA — shows the number itself as the heading (`"78% compliant"`) rather than inventing a name for something that doesn't have one.

## Plugin Icon System

Reference: Apple's Settings app. Every row — Wi-Fi, Notifications, Siri, Screen Time — gets a small rounded-square ("squircle") icon: one signature colour per function, one simple white glyph, one consistent container shape. Apple's actual app-icon squircle uses a corner radius of ~22.37% of the icon's width with continuous corner smoothing (a true superellipse, not a simple rounded rect) — Specd approximates the same visual effect with a generous rounded-rect at the same ~22% ratio, since a hand-authored superellipse isn't worth the complexity for icon assets this small.

**Why this doesn't contradict "one accent, used sparingly":** the accent discipline governs *in-product UI* — the thing you're looking at while auditing a design system. App icons are a *wayfinding* layer, seen in a plugin picker or a running-plugins list, not while doing the actual audit work. Apple's own Settings app is a good precedent here too: the Settings icon itself is a distinct grey gear, but the UI *inside* Settings uses plain system blue as its one interactive accent. Specd follows the same split — every plugin's icon gets its own signature colour, but every plugin's *internal* UI shares the exact same single violet accent from this document. Colour lives at the icon layer; discipline lives at the product layer.

| Plugin | Colour | Hex | Glyph concept |
|---|---|---|---|
| **Pulse** | Violet | `#5B3DF0` | Concentric diamond rings (existing mark) — scanning/signal |
| **Specced** | Blue | `#2563EB` | Document with text lines — documentation |
| **Mapped** | Teal | `#0D9488` | Connected nodes — variable/alias mapping |
| **Shipped** | Orange | `#EA580C` | Arrow crossing a boundary — handoff. Now also the working name for the AI code-review product (pull-request checks against the design system) |
| **Shift** | Slate | `#475569` | Archive box — safe deprecation |
| **Released** (was Branch Release Notes) | Green | `#16A34A` | Tag — release notes/changelog |
| **Checked** (was Library Asset Auditor) | Cyan | `#0891B2` | Checkmark within brackets (existing mark) — scan boundary + verification |

Pulse keeps the signal-violet accent for its icon specifically because it's both the flagship product and the one that established the existing diamond mark — its icon color and its in-product accent are the same value, which is a coincidence of it being the reference plugin, not a rule the other five need to follow (their icons use dedicated colors distinct from the shared violet accent). Library Asset Auditor sits outside the core six-plugin Specd Tools suite (it predates the suite's formal naming) but adopts the same shared visual language and icon system — cyan was picked because it reads as "scanning/detection," is distinct from every in-product severity colour (red/green/amber are all reserved for compliance status itself, so the icon can't borrow any of them), and isn't already claimed by another plugin.

**Construction spec**: 96–128px canvas, ~21–28px corner radius (≈22% of width), solid signature-colour fill, single white glyph centered at roughly 50% of the canvas size, 1.8px stroke weight (line-cap/line-join round). No gradients, no drop shadows, no secondary colours within the glyph. Source assets: `specd-ds/src/assets/plugin-icons.html`.

## Motion

| Token | Value | Use |
|-------|-------|-----|
| `--duration-instant` | 120ms | Press-feedback, scale on `:active` |
| `--duration-fast` | 200ms | Hover, toggle, checkbox, focus ring |
| `--duration-base` | 260ms | Tab switch, panel transitions, accordion expand |
| `--duration-slow` | 340ms | Score ring fill animation, modal enter/exit |
| `--duration-modal` | 280ms | Modal + drawer entrances |
| `--duration-exit` | 180ms | Every exit — deliberately faster than its matching entry |
| `--easing-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default for all transitions |
| `--easing-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Reserved for the score-ring completion pop and success-checkmark moments only — used sparingly, never on routine hovers |

Bumped ~25-30% across the board from an earlier, snappier ladder (was 100/160/200/260ms) — feedback was that interactions read as "too fast and instant" for a calm, considered instrument rather than a reactive one. Two follow-on rules from the same feedback pass:
- **Reveal, don't just recolor, on hover.** A hover state should feel like the interface noticing you, not just a color swap: nav icons sit at `opacity:0` at rest and fade+scale in on hover/active (never via `width`/`margin`, which reflows neighboring text); directional glyphs (jump arrows, disclosure chevrons) get a small `translate` nudge on hover in the direction they'd travel, signaling "this leads somewhere" before the click commits to it.
- **Never mix a non-interpolable value into a transitioned property's cascade.** A CSS transition can't animate to/from keywords like `max-height: none` or `height: auto` — if a component's collapsed state relies on a class-based fallback for those, the very first interactive toggle can silently skip the animation (the browser sees the non-numeric intermediate value and abandons the transition for that cycle) even though the *final* rendered value is correct. Fix at mount: measure real content and set an explicit pixel value before the user can interact, so every toggle from then on is a clean number-to-number transition. (This is what was silently breaking the Issues card open-animation — see the Ground-up redesign project log.)
- **A property still mid-transition at measurement time under-measures.** A sibling trap to the one above: if JS measures an element's `scrollHeight` to drive a *different* element's height transition (the standard pattern for animating open/closed), and the measured element also has its own `transition` on a box-model property — padding, border-width — that hasn't finished animating yet, the measurement is taken against that property's *old* value, silently undershooting the true height by exactly that property's delta. This produced a real, shipped bug: a card's last row read as flush against its own bottom edge because 16px of `padding-bottom` hadn't visually applied yet at the exact instant `scrollHeight` was read (both the class toggle and the read happened in the same synchronous tick, before the browser had a chance to animate anything). Fix: only transition box-model properties that don't affect the height being measured (`border-width` is safe; `padding` used for the content's own spacing is not).
- **A `transform`-based entrance animation on an ancestor of a `position: fixed` element is a genuine risk, not just a style choice.** Any element with an in-progress — or, worse, a *stuck* — `transform` becomes a containing block for `position: fixed` descendants. If that transform never resolves to `none` (observed in practice for automated or backgrounded browser tabs, where CSS animations can silently stall at their starting keyframe indefinitely), every fixed-position descendant renders offset by however far that transform moved it, frequently by exactly one element-width — a confusing symptom that looks like a positioning bug but is actually an animation bug. Prefer opacity-only entrances for anything that is, or contains, a full-screen `position: fixed` element (drawers, modals, toasts); reserve `transform`-based entrances (slide-ins, scale-ins) for content with no such descendants.
- **`scrollHeight` silently reads `0` on an element that isn't actually laid out — no error, just a wrong number.** Pulse's migration hit this same root cause twice, from two different directions, both driving a manual measure-then-pin-`max-height` expand/collapse animation (the standard workaround for animating to/from `auto`, per the non-interpolable-value rule above): (1) measuring a card's `scrollHeight` immediately after `document.createElement`, before it had been `appendChild`-ed into a live container — a detached node's `scrollHeight` is always `0` regardless of its real content, so every card that should have opened pre-expanded instead rendered pinned shut; (2) measuring an accordion's `scrollHeight` while its own ancestor panel (a different, currently-inactive tab) had `display: none` — layout is fully suppressed for an entire hidden subtree, so the reading was `0` there too, even though the accordion itself was internally marked `.open`. Both bugs looked identical from the outside (content correctly present in the DOM, but visually clipped to zero height) and both trace to the same lesson: **never trust a `scrollHeight` reading without first confirming the element is actually attached to the document AND has no `display:none` ancestor.** Guard with `element.offsetParent !== null` (returns `null` for both a detached node and one under a hidden ancestor) before measuring, and if a hidden ancestor is the reason a measurement was skipped, re-measure and re-pin once that ancestor becomes visible again (e.g. on tab activation) — don't just skip and leave the stale/zero value in place until the next unrelated user interaction happens to trigger a fresh measurement.

## Do's and Don'ts

### Do
- Use the signal-violet accent for exactly one thing per screen: the primary action. Every other control is neutral, ghost, or outline.
- Use the theme-correct violet value — `#5B3DF0` on light surfaces, `#8B76FF` on dark — never the other theme's value on the wrong canvas; that's how the contrast guarantee breaks.
- Keep green/amber/red confined to status badges, icons, and inline text — never a button fill, never a section background.
- Tighten letter-spacing as Geist scales up: -0.01em at 16–20px through -0.03em at 32px+.
- Use hairline borders (`--color-hairline`, 10% ink) and the surface-tint stack (canvas → paper → tint, or void → carbon → obsidian) for all depth — never a box-shadow.
- Reserve JetBrains Mono strictly for machine-readable values: hex codes, percentages, variable IDs, keyboard shortcuts. If a human wrote the sentence, it's Geist.
- Keep the three gradients (score ring, header wash, Overview hero card) as the only chromatic decoration in the system.
- Build both light and dark themes from the same token names — a component should never need theme-specific markup, only theme-specific token values.
- Reach for `.btn-pill-primary`/`.btn-pill-ghost` (see Buttons, above) on any new or updated screen — it's the current standard, not one of several equally-valid options.

### Don't
- Never tint a card, section, or full-width band with violet — it is a control color, not a paint color.
- Never mix filled-violet and outlined-violet buttons in the same row without a clear primary/secondary relationship — one filled action per view, same as every reference system reviewed.
- Never mix pill buttons and legacy box buttons within the same view — a screen is either fully migrated or not yet, never half of each (see Buttons, above).
- Never use Geist below weight 700 for headings or display numerals, and never below 400 for body — the single-family system still needs clear weight jumps to read as hierarchy.
- Never add a drop-shadow to a card, button, or panel — flatness plus hairline borders is the entire elevation system.
- Never invent a fourth gradient use case casually — score ring, header wash, and the Overview hero card are the intentional exceptions, not a pattern to extend by default.
- Never let a status color (green/amber/red) double as a decorative accent, even at low opacity.
- Never use radius values outside the defined scale (6 / 8 / 10 / 12 / 16 / 20 / 24 / 9999px), and never hand-pick a nested tile's radius — derive it from its parent's radius minus its inset (`--radius-tile`/`--radius-tile-sm`), the same way `ConcentricRectangle` derives it automatically.
- Never apply concentric math to an element that isn't hugging a rounded parent's corner (`gap ≥ r_outer`) — pick a radius on taste there, or use a full circle for small floating badges/avatars, same as Apple treats those as a different shape category entirely.
- Never place violet text on the navy ink surface — contrast fails there; violet only sits on canvas/paper or void/carbon.

## Layout

Specd's **product surfaces** — plugin panels (360–660px wide) and the web app — use instrument density: section gaps are 16–24px rather than 64–96px, and there is no hero/imagery layer. The marketing site (specd.tools) and docs follow the **Marketing Extension** below: larger type, generous section spacing, and heroes built only from live product UI. Both keep the same hairline-border, no-shadow, one-accent discipline — the instrument aesthetic should feel identical whether you're looking at the plugin, the app, or the website.

## Marketing Extension (proposed 2026-09-27 — awaiting review)

Everything above was written for 360–660px plugin panels. The marketing site (specd.tools) borrows the *structure* of Apple's product pages — big type, generous space, a sticky product nav, one idea per section, a "compare" grid — while keeping every rule above. Nothing here changes the product scale; plugins and the web app never load these tokens. They live in `src/tokens/marketing.css`, published as `@specd/specd-ds/marketing.css`, and are not part of `index.css`.

### Where Apple's patterns meet this document

| Apple pattern | Rule it would break | Resolution |
|---|---|---|
| 56–96px headlines | Type scale stops at 40px | Separate marketing type scale (below) |
| Full-width bands, 120px+ section gaps | Product density, no hero layer | Section spacing tokens; heroes are **live product UI only**, never photography or illustration |
| Device shadows, glossy renders | No shadows | Flat **panel frame**: hairline border, `--radius-surface-lg`, tint step behind, small title bar |
| Product-coloured pages | Signature colours are icon-layer only | Signature colour in exactly three places on a product page: the squircle icon, a 2px underline under the product name in the local nav, and the eyebrow glyph. Never text, bands, buttons or gradients |
| Gradient glows, gradient headlines | Only three named gradients | Heroes use gradient #1 (the live score ring). The header wash (#2) may sit behind the global nav. A new gradient needs its own argued case |
| Alternating black and white sections | Violet differs per theme | Scope dark sections with `data-theme="dark"` so every token flips; never hard-code light-theme violet on void |
| "Compare models" grid with coloured dots | Green/amber/red mean health only | Plan inclusion uses a neutral check or dash **plus text** |
| Landing Page Hero wash as decoration | Tier must come from a real metric | Only inside a framed product render whose demo data computes that tier |

### Display type (Geist)

| Token | Size | Weight | Line height | Tracking |
|---|---|---|---|---|
| `--mk-type-hero` | `clamp(48px, 7.5vw, 96px)` | 800 | 1.02 | −0.045em |
| `--mk-type-display-xl` | `clamp(40px, 5.5vw, 72px)` | 800 | 1.05 | −0.04em |
| `--mk-type-display` | `clamp(32px, 4vw, 56px)` | 700 | 1.08 | −0.035em |
| `--mk-type-headline` | `clamp(24px, 2.6vw, 40px)` | 700 | 1.12 | −0.03em |
| `--mk-type-lede` | `clamp(19px, 1.6vw, 24px)` | 500 | 1.35 | −0.01em |
| `--mk-type-body` | 17px | 400 | 1.5 | normal |
| `--mk-type-eyebrow` | 12px JetBrains Mono, uppercase | 500 | 1.3 | 0.05em |

Stat callouts ("3,412 components") use `display-xl` with `font-variant-numeric: tabular-nums`. Headlines use `text-wrap: balance` and never truncate.

### Space and grid

- Section rhythm: `--mk-space-section: clamp(80px, 12vw, 160px)`; within a section, `--mk-space-chapter: clamp(48px, 8vw, 120px)`.
- Containers: `--mk-w-text: 680px` (reading), `--mk-w-content: 980px` (standard), `--mk-w-wide: 1200px` (renders, compare table).
- Side gutter: `max(16px, 4vw)`. 12-column grid, 24px gutters, collapsing to one column below 734px.

### Navigation

- **Global nav**: 48px, canvas at 80% opacity with `backdrop-filter: saturate(180%) blur(20px)` (solid canvas fallback where unsupported), hairline bottom edge, optional header wash. Products ▾ · AI Guardrails · Pricing · Docs · Sign in · **Get started** (the one filled button).
- **Local nav** (product pages): 52px, sticks below the global nav once the hero scrolls away. Left: 24px squircle and product name at 21px/700 with the 2px signature underline. Right: section anchors at 12px/500 with `aria-current`, and a small `btn-pill-primary`. Collapses to a disclosure menu on phones. Anchored sections set `scroll-margin-top` so the sticky bars never cover a focused heading.

### Page patterns

- **Chapter**: eyebrow → headline (max 2 lines) → lede (max 3 lines) → framed live render → 2–3 short "show your work" footnotes explaining the claim. One audit question per chapter.
- **Panel frame**: `--color-paper` or `--color-carbon`, 1px hairline, `--radius-surface-lg`, inner radius concentric (`24px − inset`), 12px faux title bar with three 6px neutral dots. Renders are `inert` with a visually hidden text summary unless explicitly labelled as an interactive demo. Demo data is deterministic and marked as an example.
- **Dark bands**: at most one every 2–3 chapters (e.g. AI Guardrails, the GitHub check). Light is the default.
- **Coming soon**: greyed squircle, neutral "Coming soon" tag, waitlist form. No invented screenshots.

### Motion

- Scroll-driven reveals (`animation-timeline: view()`, IntersectionObserver fallback) may animate only opacity, an 8–24px translate, and the score-ring fill. Each plays once.
- Proposed token `--mk-duration-reveal: 480ms` with `--easing-standard`; spring stays reserved for the score-ring completion.
- No scroll-jacking and no pinned section longer than one viewport.
- Content is readable at rest: nothing waits at `opacity: 0` for an observer that might not fire.
- `prefers-reduced-motion`: show the final state immediately — no translate, no parallax, no autoplay. Any loop longer than 5 seconds (the hero ripple, a ring replay) gets a pause control.

### Accessibility (WCAG 2.2 AA)

- Text inputs and focus states need a boundary of at least 3:1, so `--mk-color-outline: rgba(18,20,43,0.48)` (light, 3.2:1 on canvas) / `rgba(255,255,255,0.40)` (dark, 3.8:1 on carbon) is proposed for input edges. Focus ring: 2px `--color-signal-violet`, 2px offset.
- One `h1` per page; `nav` landmarks labelled "Global" and "<Product>"; a skip link; `lang` set.
- Compare table: real `<table>` with `<caption>`, `th scope`, a sticky header that still works at 400% zoom, and text (not just icons) in every cell.
- Charts get a data-table alternative; score tiers always show the number and label, never colour alone.
- Touch targets at least 24×24px; the panel-density chips and `.btn-sm` need extra padding on the web.
- Check contrast in both themes in CI (axe + Playwright).

### Superseded files

`pulse/design/*.html` (brand guidelines v3, design system, website v2, Pulse redesign v3) predate this document: DM Sans / Bricolage / IBM Plex Mono, navy `#0C1F3F` + lime `#C8FF00`, drop shadows, 13 gradients, the "Specd_" underscore wordmark (now dropped), and "no backend / free forever" copy. They are not canonical and should be archived.

## Implementation Notes for Component Authors

These aren't visual decisions — they're correctness traps specific to this codebase's architecture (light-DOM Lit components, no Shadow DOM) that have each cost real debugging time more than once. Read before authoring a new `specd-*` component.

**Light-DOM custom elements default to `display: inline`.** Unknown/custom HTML elements get `display: inline` from the browser's own UA stylesheet unless a component's CSS says otherwise. This is invisible until the element needs to behave like a block in normal flow — an inline element's `margin-top`/`margin-bottom` against a sibling is simply discarded by the box model, so a rule like `.previous-element + specd-my-component { margin-top: 10px; }` will silently do nothing, with no error and no visual clue beyond "the spacing I added isn't there." This isn't hypothetical: it happened to `<specd-segmented>` and was only caught by chance during an unrelated visual review — and it happened again during Pulse's migration, independently, to `specd-cov-row` and `specd-stat-tile-lg` (both defaulted to `display: inline`, collapsing their internal flex layout into a single clipped line the moment they weren't a direct child of an already-flex/grid container). Two unrelated components hitting the identical gap confirms this isn't a one-off oversight but a standing risk for every new component. **Any component meant to sit in normal block flow needs its own `specd-x { display: block; }` base rule** (see `specd-radio-row` for the existing precedent) — add it when authoring the component, don't wait to discover the gap later.

**`<slot>` does nothing outside a real Shadow DOM tree.** Since every component in this system renders to light DOM (`createRenderRoot() { return this; }`), a `<slot>` / `<slot name="x">` in a component's template is inert — it doesn't project anything. If a component needs to accept and place child content (like `SpecdDrawer`'s body/footer), capture the real children in `connectedCallback()`, detach them immediately so they don't leak into the page while closed, and re-parent them into the rendered template by hand whenever the component opens. Write a regression test for both "children don't leak while closed" and "children appear in the right place while open" — the bug is otherwise easy to ship silently, since a quick visual check with short placeholder content can look correct by coincidence.

**A `<dialog>` element is not always simpler than a styled `<div>`.** It looks like the "correct" semantic choice for anything modal-shaped, but `showModal()`'s top-layer promotion breaks any layout trick that confines a drawer to less than the full real viewport (see Full-screen Drawer, above), and even plain `.show()` was observed, once, to render every descendant offset by its own width regardless of the descendant's own `position` value — root cause was eventually traced to an unrelated stuck CSS animation, not `<dialog>` itself, but the detour cost real debugging time before that was confirmed. If a drawer/modal doesn't need `<dialog>`'s native focus-trap and `::backdrop` (both already sacrificed the moment `showModal()` is dropped in favor of `.show()`), a plain `<div role="dialog" aria-modal="true">` is one less variable to rule out when something positions unexpectedly.

**A *consumer* doing `element.appendChild(...)` on a light-DOM component hits the same inert-`<slot>` problem from the outside.** The `<slot>` note above covers what a component *author* must do internally; the failure mode is just as real for a consumer who never opens the component's source and reasonably expects normal Web Component slotting to just work. `SpecdModal` and `SpecdCard` both declare `createRenderRoot() { return this; }` and render a bare `<slot>` / `<slot name="footer">` with no capture-and-reparent logic — unlike `SpecdDrawer` (described above) or `SpecdAppHeader`, which both do the capture/reparent themselves in `connectedCallback()`/`updated()`. A consumer who appends content to `<specd-modal>` or `<specd-card>` expecting it to land inside the rendered `.modal-body`/`.card-inner` instead gets an **inert sibling** of the component's own internal structure — the content still renders *somewhere* on screen, so a quick visual check can look correct by coincidence, but it isn't actually nested inside the card or modal and won't inherit their layout, padding, or scroll behavior.

*How to tell if a component needs this:* before assuming `appendChild`/slotting works normally, check whether the component declares `createRenderRoot() { return this; }` (light DOM). If it does, its `<slot>`s are decorative only unless the component's own source shows it doing manual reparenting.

*The fix, on the consumer side* (a workaround for the consumer to apply, not a `specd-ds` change):
```js
const modal = document.querySelector('specd-modal');
modal.open = true;
await modal.updateComplete;                        // wait for Lit's own render to land
const body = modal.querySelector('.modal-body');    // the real container, not <slot>
body.appendChild(myContent);
// footer content: modal.querySelector('.modal-footer')
// SpecdCard: modal.querySelector('.card-inner') (or '.card' itself if inner="false")
```

*Forward-looking suggestion, not a mandate:* light DOM is a suite-wide, deliberate choice here — `docs/implementation-plan.md` and this codebase's own component comments (e.g. `SpecdWizardShell`, `SpecdButton`) give the reason as letting global CSS reach into every component's internals and keeping Figma's plugin event-delegation model from being broken by a shadow boundary — so switching `SpecdModal`/`SpecdCard` alone to a real shadow root would be inconsistent with every other component in the suite, even though it would make their `<slot>`s work as consumers expect. Within that constraint, a documented content-container method or property (e.g. `modal.appendToBody(node)`) would let a consumer target the right element without discovering and depending on an internal class name that could change later — worth weighing against the cost of adding that API to every content-accepting component.

**`SpecdInput` doesn't forward the native `input` event or keep its own `.value` live — read through the inner `<input>`.** `SpecdInput` re-dispatches a *synthetic* `input`/`change` `Event` from the custom element itself (`this.dispatchEvent(new Event('input', { bubbles: true }))`) rather than forwarding the native event object from its inner `<input>`, and nothing in the component syncs live keystrokes back onto its own `.value` property — the inner `<input>`'s value is bound one-way, from `this.value` down (`.value=${this.value}`). A consumer listening for `input` on a `<specd-input>` and reading `event.target.value` gets `this.value`, which never changes as the user types, so it reads as permanently stale. Read the live value through the inner element instead:

```js
specdInputEl.addEventListener('input', () => {
  const liveValue = specdInputEl.querySelector('input').value; // not specdInputEl.value
});
```

*(A narrower, related trap worth a quick general reminder rather than its own subsection: a Lit `@property` can reflect to a different HTML attribute than its property name — `SpecdStageBar`'s `applyLabel` property reflects to the kebab-case `apply-label` attribute, standard `@property({ attribute: '...' })` behavior, easy to miss if you guess the attribute name from the property name instead of checking the component's real source.)*

## Agent Prompt Guide

**Quick color reference**
- accent: `#5B3DF0` (light theme) / `#8B76FF` (dark theme) — never the same value on both
- text (light): `#12142B` · text (dark): `#F4F4F8`
- canvas (light): `#FAFAFB` · canvas (dark): `#0A0B14`
- border: `rgba(18,20,43,0.08)` light / `rgba(255,255,255,0.08)` dark
- success `#16A34A`/`#34D399` · warning `#D97706`/`#FBBF24` · error `#DC2626`/`#F87171` (status only)

**Example component prompts**
1. **Primary button:** background `#5B3DF0` (light) / `#8B76FF` (dark), text `#FFFFFF`, radius 9999px, padding 8px 16px, Geist 13px weight 500. Hover: `#7A64F2` / `#A695FF`. No shadow.
2. **Card:** background `#FFFFFF` (light) / `#14151F` (dark), radius 10px, 1px hairline border, padding 16px. No shadow.
3. **Health score numeral:** Geist 800 at 32–40px, color `#12142B`/`#F4F4F8`, tracking -0.03em, sitting inside a conic-gradient ring (accent → accent-hover) at `--duration-slow` fill animation.
4. **Status badge:** radius 9999px, padding 2px 8px, 11px Geist weight 500, background is a 10%-opacity tint of the status color, text is the full-opacity status color. Never violet.
5. **Token/variable label:** JetBrains Mono 10px weight 500, uppercase, tracking 0.04em, color `--color-muted`.

## Similar Brands
- **Stripe** — closest sibling for the "financial-instrument" restraint: one accent, no shadows, tight tracking at display sizes. Specd departs by allowing soft-modern radii instead of Stripe's sharp 4px.
- **Linear** — same single-accent discipline and the same permission to use exactly one gradient exactly once (score ring here, hero floor there).
- **shadcn/ui** — same soft-modern radius philosophy (pill interactive, larger-radius containers) and near-total achromatic base with color reserved for meaning, not decoration.
- **Apple (iOS system apps)** — source for the nested/concentric radius math and the grouped-list/segmented-pill patterns above (reviewed directly: iCloud storage settings, Health's Summary and Heart Rate/Highlights screens). Specd departs by keeping the flat hairline+tint elevation system rather than Apple's own soft card shadows — see the Shadows note above.

## Quick Start

### CSS Custom Properties

```css
:root {
  /* Accent — light theme values (defaults) */
  --color-signal-violet: #5B3DF0;
  --color-signal-violet-hover: #7A64F2;
  --color-violet-tint: #F1EDFF;

  /* Light theme neutrals */
  --color-ink: #12142B;
  --color-ink-soft: #40415C;
  --color-muted: #6B6D85;
  --color-faint: #9799AC;
  --color-hairline: rgba(18, 20, 43, 0.08);
  --color-canvas: #FAFAFB;
  --color-paper: #FFFFFF;

  /* Dark theme neutrals */
  --color-paper-dark: #F4F4F8;
  --color-mist-dark: #B8B9CC;
  --color-muted-dark: #7B7D93;
  --color-hairline-dark: rgba(255, 255, 255, 0.08);
  --color-void: #0A0B14;
  --color-carbon: #14151F;
  --color-obsidian: #1B1C2B;

  /* Semantic (status only) */
  --color-success: #16A34A;
  --color-warning: #D97706;
  --color-error: #DC2626;
  --color-success-dark: #34D399;
  --color-warning-dark: #FBBF24;
  --color-error-dark: #F87171;

  /* Typography — single family, per the Geist decision */
  --font-ui: 'Geist', 'Inter', -apple-system, system-ui, sans-serif;
  --font-display: var(--font-ui);
  --font-mono: 'JetBrains Mono', 'IBM Plex Mono', 'SF Mono', Menlo, monospace;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;

  /* Radius — control scale */
  --radius-chip: 6px;
  --radius-input: 8px;
  --radius-card: 10px;
  --radius-modal: 12px;
  --radius-pill: 9999px;

  /* Radius — surface scale (cards/panels/rows) + concentric-derived tiles.
     See "Border Radius — nested & concentric" above: a nested icon tile's
     radius is the surface radius minus its own inset, not a hand-picked
     value, so it stays correct if either number is retuned later. */
  --radius-surface: 20px;
  --radius-surface-sm: 16px;
  --radius-surface-lg: 24px;
  --radius-tile: calc(var(--radius-surface) - 14px);
  --radius-tile-sm: calc(var(--radius-surface-sm) - 12px);

  /* Motion — mirrors src/tokens/motion.css */
  --duration-instant: 120ms;
  --duration-fast: 200ms;
  --duration-base: 260ms;
  --duration-slow: 340ms;
  --duration-modal: 280ms;
  --duration-exit: 180ms;
  --easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --easing-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

[data-theme="dark"] {
  --color-signal-violet: #8B76FF;
  --color-signal-violet-hover: #A695FF;
  --color-violet-tint: rgba(139, 118, 255, 0.16);
  --color-ink: var(--color-paper-dark);
  --color-ink-soft: var(--color-mist-dark);
  --color-muted: var(--color-muted-dark);
  --color-hairline: var(--color-hairline-dark);
  --color-canvas: var(--color-void);
  --color-paper: var(--color-carbon);
  --color-success: var(--color-success-dark);
  --color-warning: var(--color-warning-dark);
  --color-error: var(--color-error-dark);
}
```
