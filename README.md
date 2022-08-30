# base64-esm

A Base64 library written in ESM.

## Usage

### Base64

```typescript
import { Base64 } from 'base64-esm'

// encode
Base64.encode(new Uint8Array([80, 171, 243, 128])) // UKvzgA==
Base64.encode('Hello, world!') // SGVsbG8sIHdvcmxkIQ==

// decode
Base64.decode('UKvzgA==') // Uint8Array(4) [80, 171, 243, 128]
Base64.decodeToString('SGVsbG8sIHdvcmxkIQ==') // Hello, world!
```

### Base64Url

```typescript
import { Base64Url } from 'base64-esm'

// encode
Base64Url.encode(new Uint8Array([80, 171, 243, 128])) // UKvzgA
Base64Url.encode('你好，🌏！这是一个处理 Base64 的 ESM 库。') // 5L2g5aW977yM8J-Mj--8gei_meaYr-S4gOS4quWkhOeQhiBCYXNlNjQg55qEIEVTTSDlupPjgII

// decode
Base64Url.decode('UKvzgA==') // Uint8Array(4) [80, 171, 243, 128]
Base64Url.decodeToString('5L2g5aW977yM8J-Mj--8gei_meaYr-S4gOS4quWkhOeQhiBCYXNlNjQg55qEIEVTTSDlupPjgII') // 你好，🌏！这是一个处理 Base64 的 ESM 库。
```

## Reference

- Base64: [RFC 4648: Base 64 Encoding](https://datatracker.ietf.org/doc/html/rfc4648#section-4)

- Base64Url: [RFC 4648: Base 64 Encoding with URL and Filename Safe Alphabet](https://datatracker.ietf.org/doc/html/rfc4648#section-5)

## License

MIT
