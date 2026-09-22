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
})
