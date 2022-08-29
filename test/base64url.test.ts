import { describe, expect, it } from 'vitest'
import { Base64Url } from '../src/base64url'

describe('Base64Url', () => {
  it('encode with padding', () => {
    const textEncoder = new TextEncoder()
    expect(
      Base64Url.encode(new Uint8Array([77, 203]), true),
    ).toMatchSnapshot()
    expect(
      Base64Url.encode(new Uint8Array([80, 171, 243, 128]), true),
    ).toMatchSnapshot()
    expect(
      Base64Url.encode(textEncoder.encode('Hello, world!'), true),
    ).toMatchSnapshot()
    expect(
      Base64Url.encode(textEncoder.encode(''), true),
    ).toMatchSnapshot()
  })

  it('encode without padding', () => {
    const textEncoder = new TextEncoder()
    expect(
      Base64Url.encode(new Uint8Array([77, 203]), false),
    ).toMatchSnapshot()
    expect(
      Base64Url.encode(new Uint8Array([80, 171, 243, 128]), false),
    ).toMatchSnapshot()
    expect(
      Base64Url.encode(textEncoder.encode('Hello, world!'), false),
    ).toMatchSnapshot()
    expect(
      Base64Url.encode(textEncoder.encode('你好，🌏！这是一个处理 Base64 的 ESM 库。'), false),
    ).toMatchInlineSnapshot('"5L2g5aW977yM8J-Mj--8gei_meaYr-S4gOS4quWkhOeQhiBCYXNlNjQg55qEIEVTTSDlupPjgII"')
  })

  it('decode with padding', () => {
    const textEncoder = new TextEncoder()
    expect(
      Base64Url.decode(Base64Url.encode(new Uint8Array([80, 171, 243, 128]), true)),
    ).toMatchSnapshot()
    expect(
      Base64Url.decode(Base64Url.encode(textEncoder.encode('Hello, world!'), true)),
    ).toMatchSnapshot()
  })

  it('decode without padding', () => {
    const textEncoder = new TextEncoder()
    expect(
      Base64Url.decode(Base64Url.encode(new Uint8Array([80, 171, 243, 128]))),
    ).toMatchSnapshot()
    expect(
      Base64Url.decode(Base64Url.encode(textEncoder.encode('Hello, world!'))),
    ).toMatchSnapshot()
  })
})
