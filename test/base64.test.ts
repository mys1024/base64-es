/* spell-checker: disable */

import { describe, expect, it } from 'vitest'
import { Base64 } from '../src/base64'

describe.concurrent('base64 encoding', () => {
  it('encode with padding', () => {
    expect(
      Base64.encode(new Uint8Array([22])),
    ).toBe('Fg==')
    expect(
      Base64.encode(new Uint8Array([77, 203])),
    ).toBe('Tcs=')
    expect(
      Base64.encode(new Uint8Array([79, 2, 229])),
    ).toBe('TwLl')
    expect(
      Base64.encode(new Uint8Array([80, 171, 243, 128])),
    ).toBe('UKvzgA==')
    expect(
      Base64.encode('Hello, world!'),
    ).toBe('SGVsbG8sIHdvcmxkIQ==')
    expect(
      Base64.encode('你好，🌏！这是一个处理 Base64 的 ESM 库。'),
    ).toBe('5L2g5aW977yM8J+Mj++8gei/meaYr+S4gOS4quWkhOeQhiBCYXNlNjQg55qEIEVTTSDlupPjgII=')
  })

  it('encode without padding', () => {
    expect(
      Base64.encode(new Uint8Array([22]), false),
    ).toBe('Fg')
    expect(
      Base64.encode(new Uint8Array([80, 171, 243, 128]), false),
    ).toBe('UKvzgA')
    expect(
      Base64.encode('Hello, world!', false),
    ).toBe('SGVsbG8sIHdvcmxkIQ')
  })
})

describe.concurrent('base64 decoding', () => {
  it('decode with padding', () => {
    expect(
      Base64.decode('SGVsbG8sIHdvcmxkIQ=='),
    ).toEqual(new Uint8Array([80, 171, 243, 128]))
    expect(
      Base64.decodeToString('SGVsbG8sIHdvcmxkIQ=='),
    ).toEqual('Hello, world!')
  })

  it('decode without padding', () => {
    expect(
      Base64.decode('UKvzgA'),
    ).toEqual(new Uint8Array([80, 171, 243, 128]))
    expect(
      Base64.decodeToString('SGVsbG8sIHdvcmxkIQ'),
    ).toEqual('Hello, world!')
  })
})
