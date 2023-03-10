/* spell-checker: disable */

import { describe, expect, it } from 'vitest'
import { base64Encode, base64Decode, base64DecodeToStr } from '../src/base64'

describe.concurrent('base64 encoding', () => {
  it('encode with padding', () => {
    expect(
      base64Encode(new Uint8Array([22])),
    ).toBe('Fg==')
    expect(
      base64Encode(new Uint8Array([77, 203])),
    ).toBe('Tcs=')
    expect(
      base64Encode(new Uint8Array([79, 2, 229])),
    ).toBe('TwLl')
    expect(
      base64Encode(new Uint8Array([80, 171, 243, 128])),
    ).toBe('UKvzgA==')
    expect(
      base64Encode('Hello, world!'),
    ).toBe('SGVsbG8sIHdvcmxkIQ==')
    expect(
      base64Encode('你好，🌏！这是一个处理 Base64 的 ESM 库。'),
    ).toBe('5L2g5aW977yM8J+Mj++8gei/meaYr+S4gOS4quWkhOeQhiBCYXNlNjQg55qEIEVTTSDlupPjgII=')
  })

  it('encode without padding', () => {
    expect(
      base64Encode(new Uint8Array([22]), false),
    ).toBe('Fg')
    expect(
      base64Encode(new Uint8Array([80, 171, 243, 128]), false),
    ).toBe('UKvzgA')
    expect(
      base64Encode('Hello, world!', false),
    ).toBe('SGVsbG8sIHdvcmxkIQ')
  })
})

describe.concurrent('base64 decoding', () => {
  it('decode with padding', () => {
    expect(
      base64Decode('UKvzgA=='),
    ).toEqual(new Uint8Array([80, 171, 243, 128]))
    expect(
      base64DecodeToStr('SGVsbG8sIHdvcmxkIQ=='),
    ).toEqual('Hello, world!')
  })

  it('decode without padding', () => {
    expect(
      base64Decode('UKvzgA'),
    ).toEqual(new Uint8Array([80, 171, 243, 128]))
    expect(
      base64DecodeToStr('SGVsbG8sIHdvcmxkIQ'),
    ).toEqual('Hello, world!')
  })
})
