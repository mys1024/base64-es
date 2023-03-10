/* spell-checker: disable */

import { describe, expect, it } from 'vitest'
import { base64urlEncode, base64urlDecode, base64urlDecodeToStr } from '../src/base64url'

describe.concurrent('base64url encoding', () => {
  it('encode without padding', () => {
    expect(
      base64urlEncode(new Uint8Array([22])),
    ).toBe('Fg')
    expect(
      base64urlEncode(new Uint8Array([77, 203])),
    ).toBe('Tcs')
    expect(
      base64urlEncode(new Uint8Array([79, 2, 229])),
    ).toBe('TwLl')
    expect(
      base64urlEncode(new Uint8Array([80, 171, 243, 128])),
    ).toBe('UKvzgA')
    expect(
      base64urlEncode('Hello, world!'),
    ).toBe('SGVsbG8sIHdvcmxkIQ')
    expect(
      base64urlEncode('你好，🌏！这是一个处理 Base64 的 ESM 库。'),
    ).toBe('5L2g5aW977yM8J-Mj--8gei_meaYr-S4gOS4quWkhOeQhiBCYXNlNjQg55qEIEVTTSDlupPjgII')
  })

  it('encode with padding', () => {
    expect(
      base64urlEncode(new Uint8Array([22]), true),
    ).toBe('Fg==')
    expect(
      base64urlEncode(new Uint8Array([80, 171, 243, 128]), true),
    ).toBe('UKvzgA==')
    expect(
      base64urlEncode('Hello, world!', true),
    ).toBe('SGVsbG8sIHdvcmxkIQ==')
  })
})

describe.concurrent('base64url decoding', () => {
  it('decode without padding', () => {
    expect(
      base64urlDecode('UKvzgA'),
    ).toEqual(new Uint8Array([80, 171, 243, 128]))
    expect(
      base64urlDecodeToStr('SGVsbG8sIHdvcmxkIQ'),
    ).toEqual('Hello, world!')
  })

  it('decode with padding', () => {
    expect(
      base64urlDecode('UKvzgA=='),
    ).toEqual(new Uint8Array([80, 171, 243, 128]))
    expect(
      base64urlDecodeToStr('SGVsbG8sIHdvcmxkIQ=='),
    ).toEqual('Hello, world!')
  })
})
