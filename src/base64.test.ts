import { Base64 } from './base64.js'

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

console.log('Test: base64.encode()')
eq(
  'GU3L',
  Base64.encode(new Uint8Array(
    [25, 77, 203]
  ))
)
eq(
  'UKvzgEM=',
  Base64.encode(new Uint8Array(
    [80, 171, 243, 128, 67]
  ))
)
eq(
  'SGVsbG8sIHdvcmxkIQ==',
  Base64.encode(new Uint8Array((new TextEncoder()).encode(
    'Hello, world!'
  )))
)
eq(
  '5L2g5aW977yM8J+Mj++8gei/meaYr+S4gOS4quWkhOeQhiBCYXNlNjQg55qE5bqT44CC',
  Base64.encode(new Uint8Array((new TextEncoder()).encode(
    '你好，🌏！这是一个处理 Base64 的库。'
  )))
)

console.log('\nTest: base64.decode()')
const d1 = (new TextEncoder()).encode('Hello, world!')
arrEq(
  d1,
  Base64.decode(Base64.encode(d1))
)
const d2 = (new TextEncoder()).encode('Teeeeeeeeeeeest!!!')
arrEq(
  d2,
  Base64.decode(Base64.encode(d2, false))
)
const d3 = (new TextEncoder()).encode('你好，🌏！这是一个处理 Base64 的库。')
arrEq(
  d3,
  Base64.decode(Base64.encode(d3))
)
const d4 = (new TextEncoder()).encode('977yM8J+Mj++8gei/meaYr+S4gOS4quWkhOeQhiBCYXNlNjQg55qE5')
arrEq(
  d4,
  Base64.decode(Base64.encode(d4))
)
