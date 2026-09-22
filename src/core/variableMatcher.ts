/**
 * variableMatcher.ts
 * ─────────────────────────────────────────────────────────────────────
 * Smart variable suggestion engine, shared by Pulse and Library Asset
 * Auditor (both under the Specd Tools suite).
 *
 * Given a raw value (hex colour, number) and the context of the layer
 * it came from (property type + node type), this module ranks all
 * available variables by how likely they are to be the "right" token
 * for that value.
 *
 * Naming-convention rules are derived from analysis of 12+ major design
 * systems: Material Design 3, IBM Carbon, Atlassian, Shopify Polaris,
 * Adobe Spectrum, GitHub Primer, Salesforce Lightning, Tailwind, Ant
 * Design, Apple HIG, Fluent UI, and GitLab Pajamas.
 *
 * Framework-agnostic, pure scoring logic over plain data — no Lit, no
 * DOM, no Figma API calls. Safe to run in either host's sandbox or UI
 * context.
 */

export interface IndexedVariable {
  id: string;
  key: string;
  name: string;
  collectionName: string;
  collectionId: string;
  resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
  resolvedValue: string;
  publishStatus: "CURRENT" | "CHANGED" | "UNPUBLISHED";
  isRemote: boolean;
  libraryName?: string;
}

export interface RankedSuggestion {
  variable: IndexedVariable;
  score: number;
  matchReason: string;
}

// ─── Context types ────────────────────────────────────────────────────────────

export type LayerPropertyContext =
  | { property: "fill";         nodeType: "TEXT" | "FRAME" | "SHAPE" | "OTHER" }
  | { property: "stroke" }
  | { property: "padding" | "gap" | "itemSpacing" }
  | { property: "cornerRadius" }
  | { property: "fontSize" }
  | { property: "lineHeight" }
  | { property: "letterSpacing" }
  | { property: "opacity" }
  | { property: "other" };


// ─── Scoring rules ────────────────────────────────────────────────────────────

interface KeywordRule {
  /** Only apply when this context matches. null = always apply */
  context: LayerPropertyContext | null;
  /** Regex tested against the variable name */
  keywords: RegExp;
  /** Points added when rule matches */
  score: number;
  /** Human-readable explanation shown in the UI */
  reason: string;
}

interface AntiKeywordRule {
  context: LayerPropertyContext | null;
  /** Variables matching this are penalised */
  antiKeywords: RegExp;
  score: number;
  reason: string;
}

interface CollectionRule {
  /** Tested against the collection name */
  pattern: RegExp;
  score: number;
  reason: string;
}

const KEYWORD_RULES: KeywordRule[] = [
  // ── Text fills → foreground/text colour tokens ──────────────────────────
  {
    context: { property: "fill", nodeType: "TEXT" },
    keywords: /\b(text|foreground|fg|fg[-_]color|on[-_]?surface|on[-_]?primary|on[-_]?secondary|on[-_]?background|label|content|heading|body|ink|copy)\b/i,
    score: 15,
    reason: "Semantic text/foreground colour keyword",
  },

  // ── Frame/shape fills → background/surface tokens ───────────────────────
  {
    context: { property: "fill", nodeType: "FRAME" },
    keywords: /\b(background|bg|bg[-_]color|surface|container|canvas|layer|elevated|overlay|field|base|fill)\b/i,
    score: 15,
    reason: "Semantic background/surface colour keyword",
  },
  {
    context: { property: "fill", nodeType: "SHAPE" },
    keywords: /\b(background|bg|surface|fill|icon|solid|spot|brand|accent|highlight)\b/i,
    score: 12,
    reason: "Semantic fill colour keyword",
  },

  // ── Strokes → border/outline tokens ─────────────────────────────────────
  {
    context: { property: "stroke" },
    keywords: /\b(border|border[-_]color|outline|stroke|divider|separator|rule|hairline)\b/i,
    score: 15,
    reason: "Semantic border/stroke colour keyword",
  },

  // ── Spacing / padding / gap ──────────────────────────────────────────────
  {
    context: { property: "padding" },
    keywords: /\b(space|spacing|pad|padding|inset|gutter|indent)\b/i,
    score: 15,
    reason: "Spacing/padding token keyword",
  },
  // Strong bonus: variable explicitly named/collected as "padding"
  {
    context: { property: "padding" },
    keywords: /\bpadding\b/i,
    score: 10,
    reason: "Exact padding name match",
  },
  {
    context: { property: "gap" },
    keywords: /\b(space|spacing|gap|gutter|between)\b/i,
    score: 15,
    reason: "Gap/spacing token keyword",
  },
  // itemSpacing: gap > spacing priority split
  {
    context: { property: "itemSpacing" },
    keywords: /\bgap\b/i,
    score: 20,
    reason: "Gap token keyword (top priority for itemSpacing)",
  },
  {
    context: { property: "itemSpacing" },
    keywords: /\b(space|spacing|gutter|stack|between)\b/i,
    score: 12,
    reason: "Spacing token keyword",
  },

  // ── Corner radius ────────────────────────────────────────────────────────
  {
    context: { property: "cornerRadius" },
    keywords: /\b(radius|corner|rounded|shape|border[-_]radius|rounding|round)\b/i,
    score: 15,
    reason: "Corner radius token keyword",
  },

  // ── Typography ───────────────────────────────────────────────────────────
  {
    context: { property: "fontSize" },
    keywords: /\b(font[-_]?size|text[-_]?size|type[-_]?scale|size|scale)\b/i,
    score: 15,
    reason: "Font size token keyword",
  },
  {
    context: { property: "lineHeight" },
    keywords: /\b(line[-_]?height|leading|lh)\b/i,
    score: 15,
    reason: "Line height token keyword",
  },
  {
    context: { property: "letterSpacing" },
    keywords: /\b(letter[-_]?spacing|tracking|kerning|ls)\b/i,
    score: 15,
    reason: "Letter spacing token keyword",
  },

  // ── Opacity ──────────────────────────────────────────────────────────────
  {
    context: { property: "opacity" },
    keywords: /\b(opacity|alpha|transparency|disabled|muted)\b/i,
    score: 15,
    reason: "Opacity token keyword",
  },

  // ── Semantic state keywords (apply to all color contexts) ────────────────
  {
    context: null,
    keywords: /\b(primary|secondary|tertiary|brand|accent|interactive|action|cta)\b/i,
    score: 5,
    reason: "Brand/interactive colour keyword",
  },
  {
    context: null,
    keywords: /\b(error|danger|critical|destructive|negative|failure)\b/i,
    score: 5,
    reason: "Error state keyword",
  },
  {
    context: null,
    keywords: /\b(success|positive|confirm|valid)\b/i,
    score: 5,
    reason: "Success state keyword",
  },
  {
    context: null,
    keywords: /\b(warning|caution|alert|attention)\b/i,
    score: 5,
    reason: "Warning state keyword",
  },
  {
    context: null,
    keywords: /\b(info|informational|notice)\b/i,
    score: 3,
    reason: "Info state keyword",
  },
];

const ANTI_RULES: AntiKeywordRule[] = [
  // Prevent colour tokens from being suggested for spacing/radius contexts
  {
    context: { property: "padding" },
    antiKeywords: /\b(color|colour|fill|bg|background|text|foreground|border)\b/i,
    score: -20,
    reason: "Colour token not appropriate for spacing",
  },
  {
    context: { property: "cornerRadius" },
    antiKeywords: /\b(color|colour|fill|bg|background|text|foreground|border|space|spacing|gap)\b/i,
    score: -20,
    reason: "Colour/spacing token not appropriate for corner radius",
  },
  // Prevent spacing tokens from being suggested for fill contexts
  {
    context: { property: "fill", nodeType: "TEXT" },
    antiKeywords: /\b(radius|space|spacing|padding|gap|size|font|line[-_]?height)\b/i,
    score: -15,
    reason: "Spacing/sizing token not appropriate for fill colour",
  },
  {
    context: { property: "fill", nodeType: "FRAME" },
    antiKeywords: /\b(radius|space|spacing|padding|gap|font|line[-_]?height|letter[-_]?spacing)\b/i,
    score: -15,
    reason: "Spacing token not appropriate for fill colour",
  },
];

const COLLECTION_RULES: CollectionRule[] = [
  // Semantic layer preferred over primitives for most token uses
  {
    pattern: /\b(semantic|alias|system|functional|theme|decision)\b/i,
    score: 8,
    reason: "Semantic token collection (preferred over primitives)",
  },
  // Component tokens are too specific — slight penalty
  {
    pattern: /\b(component|comp)\b/i,
    score: -5,
    reason: "Component-specific token (may be too narrow)",
  },
  // Primitive collections are valid but less preferred for direct use
  {
    pattern: /\b(primitive|global|base|reference|core|raw|foundation)\b/i,
    score: -3,
    reason: "Primitive token (semantic alias preferred if available)",
  },
];


// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * suggestVariables
 *
 * Given a raw value and layer context, rank all candidate variables
 * from the provided pool. Returns up to `maxResults` suggestions
 * sorted by score descending.
 *
 * The pool should be pre-filtered to only the correct resolvedType
 * for the property (e.g. COLOR vars for fills, FLOAT vars for padding).
 */
export function suggestVariables(
  rawValue: string,
  context: LayerPropertyContext,
  candidates: IndexedVariable[],
  maxResults = 5
): RankedSuggestion[] {
  const results: RankedSuggestion[] = [];

  for (const variable of candidates) {
    let score = 0;
    const reasons: string[] = [];

    // ── Exact value match (highest signal) ──────────────────────────────────
    const normRaw = rawValue.toLowerCase().replace(/\s/g, "");
    const normVal = variable.resolvedValue.toLowerCase().replace(/\s/g, "");
    if (normRaw === normVal) {
      score += 30;
      reasons.push("Exact value match");
    } else if (
      // Near-match: ignore alpha channel for colours
      variable.resolvedType === "COLOR" &&
      normRaw.startsWith("#") &&
      normVal.startsWith(normRaw.slice(0, 7))
    ) {
      score += 20;
      reasons.push("Colour match (ignoring alpha)");
    } else if (variable.resolvedType === "FLOAT") {
      // Approximate match for numeric/spacing values.
      // Only suggest when no exact match exists — scored by proximity.
      const rawNum = parseFloat(rawValue);
      const varNum = parseFloat(variable.resolvedValue);
      if (!isNaN(rawNum) && !isNaN(varNum) && varNum > 0) {
        const diff = Math.abs(rawNum - varNum);
        const pct  = diff / Math.max(rawNum, varNum);
        if (pct <= 0.15) {
          // Within 15% — likely the "closest" token (e.g. 24 vs 28)
          score += 12;
          reasons.push(`Close match (${varNum})`);
        } else if (pct <= 0.35) {
          // Within 35% — plausible alternative
          score += 5;
          reasons.push(`Approximate match (${varNum})`);
        }
        // Beyond 35% — no value-proximity bonus; keyword rules still apply
      }
    }

    // ── Keyword rules ────────────────────────────────────────────────────────
    // Test against name + collectionName so collection-level tokens are found
    // (e.g. collection "Padding Tokens", variable "8" still matches padding context)
    const namePath = `${variable.name} ${variable.collectionName}`.toLowerCase();
    for (const rule of KEYWORD_RULES) {
      if (rule.context !== null && !contextMatches(context, rule.context)) continue;
      if (rule.keywords.test(namePath)) {
        score += rule.score;
        reasons.push(rule.reason);
      }
    }

    // ── Anti-keyword rules ───────────────────────────────────────────────────
    for (const rule of ANTI_RULES) {
      if (rule.context !== null && !contextMatches(context, rule.context)) continue;
      if (rule.antiKeywords.test(namePath)) {
        score += rule.score;
        // Don't add negative reasons to the display list
      }
    }

    // ── Collection rules ─────────────────────────────────────────────────────
    const collectionName = variable.collectionName.toLowerCase();
    for (const rule of COLLECTION_RULES) {
      if (rule.pattern.test(collectionName)) {
        score += rule.score;
        if (rule.score > 0) reasons.push(rule.reason);
      }
    }

    // ── Published status bonus ───────────────────────────────────────────────
    if (variable.publishStatus === "CURRENT") {
      score += 3;
    } else if (variable.publishStatus === "UNPUBLISHED") {
      score -= 5;
    }

    // ── Remote library bonus (user explicitly approved these) ────────────────
    if (variable.isRemote) {
      score += 2;
      reasons.push(`From connected library: ${variable.libraryName ?? "unknown"}`);
    }

    if (score > 0) {
      results.push({
        variable,
        score: Math.min(100, Math.max(0, score)),
        matchReason: reasons.slice(0, 2).join(" · ") || "Value match",
      });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}


// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * contextMatches
 * Returns true if the actual context satisfies the rule's required context.
 */
function contextMatches(
  actual: LayerPropertyContext,
  required: LayerPropertyContext
): boolean {
  if (actual.property !== required.property) return false;
  if ("nodeType" in required && "nodeType" in actual) {
    return actual.nodeType === required.nodeType;
  }
  return true;
}


/**
 * buildContextFromLayerDetail
 * Converts the HardCodedLayerDetail property field into a LayerPropertyContext.
 * Called from the scanner/issues layer to build context for suggestions.
 */
export function buildContextFromLayerDetail(
  property: string,
  nodeType: string
): LayerPropertyContext {
  const prop = property as LayerPropertyContext["property"];

  if (prop === "fill") {
    const nt =
      nodeType === "TEXT"  ? "TEXT"  :
      nodeType === "FRAME" ? "FRAME" :
                             "SHAPE";
    return { property: "fill", nodeType: nt };
  }
  if (prop === "stroke")        return { property: "stroke" };
  if (prop === "padding")       return { property: "padding" };
  if (prop === "gap")           return { property: "gap" };
  if (prop === "itemSpacing")   return { property: "itemSpacing" };
  if (prop === "cornerRadius")  return { property: "cornerRadius" };
  if (prop === "fontSize")      return { property: "fontSize" };
  if (prop === "lineHeight")    return { property: "lineHeight" };
  if (prop === "letterSpacing") return { property: "letterSpacing" };
  if (prop === "opacity")       return { property: "opacity" };
  return { property: "other" };
}
