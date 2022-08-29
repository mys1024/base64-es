import { Base64Url } from './base64url.js'

function eq(expected: unknown, got: unknown) {
  if (expected === got)
    console.log(`EQ, expected: ${expected}, got: ${got}`)
  else
    console.error(`NE, expected: ${expected}, got: ${got}`)
}

function arrEq(expected: ArrayLike<unknown>, got: ArrayLike<unknown>) {
  if (expected.length !== got.length) {
    console.error(`NE, expected: ${expected}, got: ${got}`)
    return
  }
  for (let i = 0; i < expected.length; i++) {
    if (expected[i] !== got[i]) {
      console.error(`NE, expected: ${expected}, got: ${got}`)
      return
    }
  }
  console.log(`EQ, expected: ${expected}, got: ${got}`)
}

console.log('Test: Base64Url.encode()')
eq(
  'GU3L',
  Base64Url.encode(new Uint8Array(
    [25, 77, 203],
  )),
)
eq(
  'UKvzgEM',
  Base64Url.encode(new Uint8Array(
    [80, 171, 243, 128, 67],
  )),
)
eq(
  'SGVsbG8sIHdvcmxkIQ',
  Base64Url.encode(new Uint8Array((new TextEncoder()).encode(
    'Hello, world!',
  ))),
)
eq(
  '5L2g5aW977yM8J-Mj--8gei_meaYr-S4gOS4quWkhOeQhiBCYXNlNjRVcmwg55qE5bqT44CC',
  Base64Url.encode(new Uint8Array((new TextEncoder()).encode(
    '你好，🌏！这是一个处理 Base64Url 的库。',
  ))),
)

console.log('\nTest: Base64Url.decode()')
const d1 = (new TextEncoder()).encode('Hello, world!')
arrEq(
  d1,
  Base64Url.decode(Base64Url.encode(d1)),
)
const d2 = (new TextEncoder()).encode('Teeeeeeeeeeeest!!!')
arrEq(
  d2,
  Base64Url.decode(Base64Url.encode(d2, false)),
)
const d3 = (new TextEncoder()).encode('你好，🌏！这是一个处理 Base64Url 的库。')
arrEq(
  d3,
  Base64Url.decode(Base64Url.encode(d3)),
)
const d4 = (new TextEncoder()).encode('977yM8J+Mj++8gei/meaYr+S4gOS4quWkhOeQhiBCYXNlNjQg55qE5')
arrEq(
  d4,
  Base64Url.decode(Base64Url.encode(d4)),
)
