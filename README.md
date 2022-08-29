# base64-esm

A Base64 library written in ESM.

## Usage

### Base64

```typescript
import { Base64 } from 'base64-esm'

const textEncoder = new TextEncoder()
const base64 = Base64.encode(textEncoder.encode('Hello, world!'))
console.log(base64) // SGVsbG8sIHdvcmxkIQ==

const textDecoder = new TextDecoder()
const text = textDecoder.decode(Base64.decode(base64))
console.log(text) // Hello, world!
```

### Base64Url

```typescript
import { Base64Url } from 'base64-esm'

const textEncoder = new TextEncoder()
const base64url = Base64Url.encode(textEncoder.encode('你好，🌏！这是一个处理 Base64 的 ESM 库。'))
console.log(base64url) // 5L2g5aW977yM8J-Mj--8gei_meaYr-S4gOS4quWkhOeQhiBCYXNlNjQg55qEIEVTTSDlupPjgII

const textDecoder = new TextDecoder()
const text = textDecoder.decode(Base64Url.decode(base64url))
console.log(text) // 你好，🌏！这是一个处理 Base64 的 ESM 库。
```

## Reference

- Base64: [RFC 4648: Base 64 Encoding](https://datatracker.ietf.org/doc/html/rfc4648#section-4)

- Base64URL: [RFC 4648: Base 64 Encoding with URL and Filename Safe Alphabet](https://datatracker.ietf.org/doc/html/rfc4648#section-5)
