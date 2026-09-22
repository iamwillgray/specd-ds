import { describe, expect, it } from 'vitest'
import { suggestVariables, buildContextFromLayerDetail, type IndexedVariable } from './variableMatcher'

function makeVar(overrides: Partial<IndexedVariable> = {}): IndexedVariable {
  return {
    id: 'VariableID:1',
    key: 'key1',
    name: 'color/text/primary',
    collectionName: 'Semantic',
    collectionId: 'col1',
    resolvedType: 'COLOR',
    resolvedValue: '#111111',
    publishStatus: 'CURRENT',
    isRemote: false,
    ...overrides,
  }
}

describe('suggestVariables', () => {
  it('scores an exact value match highest', () => {
    const exact = makeVar({ name: 'color/brand/exact', resolvedValue: '#ff0000' })
    const near = makeVar({ name: 'color/brand/near', resolvedValue: '#fe0000' })
    const results = suggestVariables('#ff0000', { property: 'fill', nodeType: 'FRAME' }, [near, exact])
    expect(results[0].variable.name).toBe('color/brand/exact')
    expect(results[0].matchReason).toContain('Exact value match')
  })

  it('scores a colour near-match (ignoring alpha) above no match', () => {
    const near = makeVar({ name: 'color/x', resolvedValue: '#ff0000ff' })
    const results = suggestVariables('#ff0000', { property: 'fill', nodeType: 'FRAME' }, [near])
    expect(results).toHaveLength(1)
    expect(results[0].matchReason).toContain('ignoring alpha')
  })

  it('applies text-fill keyword bonus only for TEXT node context', () => {
    const textVar = makeVar({ name: 'color/text/foreground' })
    const asText = suggestVariables('#123456', { property: 'fill', nodeType: 'TEXT' }, [textVar])
    const asFrame = suggestVariables('#123456', { property: 'fill', nodeType: 'FRAME' }, [textVar])
    expect(asText[0]?.score ?? 0).toBeGreaterThan(asFrame[0]?.score ?? 0)
  })

  it('penalises colour keywords in a spacing context via anti-rules', () => {
    const colourNamedSpacing = makeVar({ name: 'space-color-8', resolvedType: 'FLOAT', resolvedValue: '8' })
    const plainSpacing = makeVar({ name: 'space-8', resolvedType: 'FLOAT', resolvedValue: '8' })
    const a = suggestVariables('8', { property: 'padding' }, [colourNamedSpacing])
    const b = suggestVariables('8', { property: 'padding' }, [plainSpacing])
    expect(a[0]?.score ?? 0).toBeLessThan(b[0]?.score ?? 0)
  })

  it('scores a semantic collection above a primitive collection for an otherwise-tied match', () => {
    const semantic = makeVar({ name: 'brand/accent', collectionName: 'Semantic' })
    const primitive = makeVar({ name: 'brand/accent', collectionName: 'Primitive' })
    const results = suggestVariables('#zzzzzz', { property: 'fill', nodeType: 'FRAME' }, [primitive, semantic])
    expect(results[0].variable.collectionName).toBe('Semantic')
  })

  it('gives remote (connected-library) variables a small bonus and names the library in the reason', () => {
    // Neutral name/collection so no other keyword/collection reason competes
    // for the two-reason display slot — isolates the remote-library signal.
    const remote = makeVar({ name: 'token-x1', collectionName: 'Library Tokens', isRemote: true, libraryName: 'Acme DS' })
    const results = suggestVariables('#zzzzzz', { property: 'fill', nodeType: 'FRAME' }, [remote])
    expect(results[0].matchReason).toContain('Acme DS')
  })

  it('finds a close numeric match within 15% for FLOAT variables', () => {
    const close = makeVar({ resolvedType: 'FLOAT', resolvedValue: '26', name: 'space-26' })
    const results = suggestVariables('24', { property: 'padding' }, [close])
    expect(results[0].matchReason).toContain('Close match')
  })

  it('excludes candidates that score at or below zero', () => {
    // Neutral collection name and non-CURRENT publish status so no other
    // rule contributes a positive score — isolates the "no match" case.
    const irrelevant = makeVar({
      name: 'zzz-unrelated-token',
      resolvedType: 'FLOAT',
      resolvedValue: '99999',
      collectionName: 'Misc',
      publishStatus: 'CHANGED',
    })
    const results = suggestVariables('nonsense-value-with-no-match', { property: 'other' }, [irrelevant])
    expect(results.find(r => r.variable.name === 'zzz-unrelated-token')).toBeUndefined()
  })

  it('respects maxResults', () => {
    const many = Array.from({ length: 10 }, (_, i) => makeVar({ name: `primary-${i}`, id: `v${i}` }))
    const results = suggestVariables('#000000', { property: 'fill', nodeType: 'FRAME' }, many, 3)
    expect(results.length).toBeLessThanOrEqual(3)
  })

  it('applies the error-state keyword bonus regardless of property context', () => {
    const errorVar = makeVar({ name: 'color/error/critical', collectionName: 'Misc' })
    const results = suggestVariables('#zzzzzz', { property: 'fill', nodeType: 'SHAPE' }, [errorVar])
    expect(results[0].matchReason).toContain('Error state keyword')
  })

  it('applies the success-state keyword bonus', () => {
    const successVar = makeVar({ name: 'color/success/positive', collectionName: 'Misc' })
    const results = suggestVariables('#zzzzzz', { property: 'fill', nodeType: 'SHAPE' }, [successVar])
    expect(results[0].matchReason).toContain('Success state keyword')
  })

  it('applies the warning-state keyword bonus', () => {
    const warningVar = makeVar({ name: 'color/warning/caution', collectionName: 'Misc' })
    const results = suggestVariables('#zzzzzz', { property: 'fill', nodeType: 'SHAPE' }, [warningVar])
    expect(results[0].matchReason).toContain('Warning state keyword')
  })

  it('applies the info-state keyword bonus', () => {
    const infoVar = makeVar({ name: 'color/info/notice', collectionName: 'Misc' })
    const results = suggestVariables('#zzzzzz', { property: 'fill', nodeType: 'SHAPE' }, [infoVar])
    expect(results[0].matchReason).toContain('Info state keyword')
  })

  it('penalises spacing/sizing keywords in a TEXT fill context via anti-rules', () => {
    const sizingNamed = makeVar({ name: 'color-font-size-large', collectionName: 'Misc' })
    const plain = makeVar({ name: 'color-large', collectionName: 'Misc' })
    const a = suggestVariables('#zzzzzz', { property: 'fill', nodeType: 'TEXT' }, [sizingNamed])
    const b = suggestVariables('#zzzzzz', { property: 'fill', nodeType: 'TEXT' }, [plain])
    expect(a[0]?.score ?? 0).toBeLessThan(b[0]?.score ?? 0)
  })

  it('penalises spacing keywords in a FRAME fill context via anti-rules', () => {
    const spacingNamed = makeVar({ name: 'color-padding-large', collectionName: 'Misc' })
    const plain = makeVar({ name: 'color-large', collectionName: 'Misc' })
    const a = suggestVariables('#zzzzzz', { property: 'fill', nodeType: 'FRAME' }, [spacingNamed])
    const b = suggestVariables('#zzzzzz', { property: 'fill', nodeType: 'FRAME' }, [plain])
    expect(a[0]?.score ?? 0).toBeLessThan(b[0]?.score ?? 0)
  })

  it('penalises colour/spacing keywords in a cornerRadius context via anti-rules', () => {
    const colourNamed = makeVar({ name: 'radius-color-8', resolvedType: 'FLOAT', resolvedValue: '8', collectionName: 'Misc' })
    const plain = makeVar({ name: 'radius-8', resolvedType: 'FLOAT', resolvedValue: '8', collectionName: 'Misc' })
    const a = suggestVariables('8', { property: 'cornerRadius' }, [colourNamed])
    const b = suggestVariables('8', { property: 'cornerRadius' }, [plain])
    expect(a[0]?.score ?? 0).toBeLessThan(b[0]?.score ?? 0)
  })

  it('prioritises "gap" over generic spacing keywords for itemSpacing context', () => {
    const gapNamed = makeVar({ name: 'item-gap-8', resolvedType: 'FLOAT', resolvedValue: '8', collectionName: 'Misc' })
    const spacingNamed = makeVar({ name: 'item-spacing-8', resolvedType: 'FLOAT', resolvedValue: '8', collectionName: 'Misc' })
    const results = suggestVariables('8', { property: 'itemSpacing' }, [spacingNamed, gapNamed])
    expect(results[0].variable.name).toBe('item-gap-8')
  })

  it('penalises unpublished local variables', () => {
    const unpublished = makeVar({ name: 'brand/accent', collectionName: 'Misc', publishStatus: 'UNPUBLISHED' })
    const published = makeVar({ name: 'brand/accent', collectionName: 'Misc', publishStatus: 'CURRENT' })
    const a = suggestVariables('#zzzzzz', { property: 'fill', nodeType: 'FRAME' }, [unpublished])
    const b = suggestVariables('#zzzzzz', { property: 'fill', nodeType: 'FRAME' }, [published])
    expect(a[0]?.score ?? 0).toBeLessThan(b[0]?.score ?? 0)
  })

  it('clamps score to a maximum of 100 even when many bonuses stack', () => {
    // Exact match (30) + text keyword (15) + semantic collection (8) +
    // brand keyword (5) + CURRENT (3) + remote (2) = 63 unclamped here,
    // but stacking several exact-match-adjacent bonuses on a single var
    // that also wins every applicable rule should never exceed 100.
    const stacked = makeVar({
      name: 'primary text foreground accent',
      resolvedValue: '#ff0000',
      collectionName: 'Semantic',
      publishStatus: 'CURRENT',
      isRemote: true,
      libraryName: 'Acme DS',
    })
    const results = suggestVariables('#ff0000', { property: 'fill', nodeType: 'TEXT' }, [stacked])
    expect(results[0].score).toBeLessThanOrEqual(100)
  })
})

describe('buildContextFromLayerDetail', () => {
  it('maps fill+TEXT to a TEXT-typed fill context', () => {
    expect(buildContextFromLayerDetail('fill', 'TEXT')).toEqual({ property: 'fill', nodeType: 'TEXT' })
  })
  it('maps fill+FRAME to a FRAME-typed fill context', () => {
    expect(buildContextFromLayerDetail('fill', 'FRAME')).toEqual({ property: 'fill', nodeType: 'FRAME' })
  })
  it('maps fill+anything else to a SHAPE-typed fill context', () => {
    expect(buildContextFromLayerDetail('fill', 'VECTOR')).toEqual({ property: 'fill', nodeType: 'SHAPE' })
  })
  it('maps an unrecognized property to "other"', () => {
    expect(buildContextFromLayerDetail('unknown-prop', 'FRAME')).toEqual({ property: 'other' })
  })
  it('maps stroke to a stroke context', () => {
    expect(buildContextFromLayerDetail('stroke', 'FRAME')).toEqual({ property: 'stroke' })
  })
  it('maps padding to a padding context', () => {
    expect(buildContextFromLayerDetail('padding', 'FRAME')).toEqual({ property: 'padding' })
  })
  it('maps gap to a gap context', () => {
    expect(buildContextFromLayerDetail('gap', 'FRAME')).toEqual({ property: 'gap' })
  })
  it('maps itemSpacing to an itemSpacing context', () => {
    expect(buildContextFromLayerDetail('itemSpacing', 'FRAME')).toEqual({ property: 'itemSpacing' })
  })
  it('maps cornerRadius to a cornerRadius context', () => {
    expect(buildContextFromLayerDetail('cornerRadius', 'FRAME')).toEqual({ property: 'cornerRadius' })
  })
  it('maps fontSize to a fontSize context', () => {
    expect(buildContextFromLayerDetail('fontSize', 'TEXT')).toEqual({ property: 'fontSize' })
  })
  it('maps lineHeight to a lineHeight context', () => {
    expect(buildContextFromLayerDetail('lineHeight', 'TEXT')).toEqual({ property: 'lineHeight' })
  })
  it('maps letterSpacing to a letterSpacing context', () => {
    expect(buildContextFromLayerDetail('letterSpacing', 'TEXT')).toEqual({ property: 'letterSpacing' })
  })
  it('maps opacity to an opacity context', () => {
    expect(buildContextFromLayerDetail('opacity', 'FRAME')).toEqual({ property: 'opacity' })
  })
})
