/* spell-checker: disable */

import { describe, expect, it } from 'vitest'
import { Base64Url } from '../src/base64url'

describe.concurrent('base64url encoding', () => {
  it('encode without padding', () => {
    expect(
      Base64Url.encode(new Uint8Array([22])),
    ).toBe('Fg')
    expect(
      Base64Url.encode(new Uint8Array([77, 203])),
    ).toBe('Tcs')
    expect(
      Base64Url.encode(new Uint8Array([79, 2, 229])),
    ).toBe('TwLl')
    expect(
      Base64Url.encode(new Uint8Array([80, 171, 243, 128])),
    ).toBe('UKvzgA')
    expect(
      Base64Url.encode('Hello, world!'),
    ).toBe('SGVsbG8sIHdvcmxkIQ')
    expect(
      Base64Url.encode('你好，🌏！这是一个处理 Base64 的 ESM 库。'),
    ).toBe('5L2g5aW977yM8J-Mj--8gei_meaYr-S4gOS4quWkhOeQhiBCYXNlNjQg55qEIEVTTSDlupPjgII')
  })

  it('encode with padding', () => {
    expect(
      Base64Url.encode(new Uint8Array([22]), true),
    ).toBe('Fg==')
    expect(
      Base64Url.encode(new Uint8Array([80, 171, 243, 128]), true),
    ).toBe('UKvzgA==')
    expect(
      Base64Url.encode('Hello, world!', true),
    ).toBe('SGVsbG8sIHdvcmxkIQ==')
  })
})

describe.concurrent('base64url decoding', () => {
  it('decode without padding', () => {
    expect(
      Base64Url.decode('UKvzgA'),
    ).toEqual(new Uint8Array([80, 171, 243, 128]))
    expect(
      Base64Url.decodeToString('SGVsbG8sIHdvcmxkIQ'),
    ).toEqual('Hello, world!')
  })

  it('decode with padding', () => {
    expect(
      Base64Url.decode('UKvzgA=='),
    ).toEqual(new Uint8Array([80, 171, 243, 128]))
    expect(
      Base64Url.decodeToString('SGVsbG8sIHdvcmxkIQ=='),
    ).toEqual('Hello, world!')
  })
})
