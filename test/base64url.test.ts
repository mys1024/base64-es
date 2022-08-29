import { describe, expect, it } from 'vitest'
import { Base64 } from '../src/base64.js'

describe('Base64Url', () => {
  it('encode with padding', () => {
    const textEncoder = new TextEncoder()
    expect(
      Base64.encode(new Uint8Array([77, 203]), true),
    ).toMatchSnapshot()
    expect(
      Base64.encode(new Uint8Array([80, 171, 243, 128]), true),
    ).toMatchSnapshot()
    expect(
      Base64.encode(textEncoder.encode('Hello, world!'), true),
    ).toMatchSnapshot()
    expect(
      Base64.encode(textEncoder.encode('你好，🌏！这是一个处理 Base64 的库。'), true),
    ).toMatchSnapshot()
  })

  it('encode without padding', () => {
    const textEncoder = new TextEncoder()
    expect(
      Base64.encode(new Uint8Array([77, 203]), false),
    ).toMatchSnapshot()
    expect(
      Base64.encode(new Uint8Array([80, 171, 243, 128]), false),
    ).toMatchSnapshot()
    expect(
      Base64.encode(textEncoder.encode('Hello, world!'), false),
    ).toMatchSnapshot()
    expect(
      Base64.encode(textEncoder.encode('你好，🌏！这是一个处理 Base64 的库。'), false),
    ).toMatchSnapshot()
  })

  it('decode with padding', () => {
    const textEncoder = new TextEncoder()
    expect(
      Base64.decode(Base64.encode(new Uint8Array([80, 171, 243, 128]), true)),
    ).toMatchSnapshot()
    expect(
      Base64.decode(Base64.encode(textEncoder.encode('Hello, world!'), true)),
    ).toMatchSnapshot()
  })

  it('decode without padding', () => {
    const textEncoder = new TextEncoder()
    expect(
      Base64.decode(Base64.encode(new Uint8Array([80, 171, 243, 128]))),
    ).toMatchSnapshot()
    expect(
      Base64.decode(Base64.encode(textEncoder.encode('Hello, world!'))),
    ).toMatchSnapshot()
  })
})
