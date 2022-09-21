import { bench, describe } from 'vitest'
import { Base64 } from '../src/base64'
import Base64Js from 'base64-js'
import { Base64 as JsBase64} from 'js-base64'
import CryptoJs from 'crypto-js'

function createTestData(length: number) {
  const data = new Uint8Array(length)
  for (let i = 0; i < length; i++)
    data[i] = i
  return data
}

const data = createTestData(1024 * 1024) // 1MB
const dataWA = CryptoJs.lib.WordArray.create(Array.from(data))
const b64 = Base64.encode(data)

describe('encode', () => {
  bench('base64-esm', () => {
    Base64.encode(data)
  })

  bench('base64-js', () => {
    Base64Js.fromByteArray(data)
  })

  bench('js-base64', () => {
    JsBase64.fromUint8Array(data)
  })

  bench('crypto-js', () => {
    CryptoJs.enc.Base64.stringify(dataWA)
  })
})

describe('decode', () => {
  bench('base64-esm', () => {
    Base64.decode(b64)
  })

  bench('base64-js', () => {
    Base64Js.toByteArray(b64)
  })

  bench('js-base64', () => {
    JsBase64.toUint8Array(b64)
  })

  bench('crypto-js', () => {
    CryptoJs.enc.Base64.parse(b64)
  })
})
