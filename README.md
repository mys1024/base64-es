# base64-esm

A Base64 library written in ESM.

## Usage

### Base64

```typescript
import { base64Encode, base64Decode, base64DecodeToStr } from 'base64-esm'

// encode
base64Encode(new Uint8Array([80, 171, 243, 128])) // UKvzgA==
base64Encode('Hello, world!') // SGVsbG8sIHdvcmxkIQ==

// decode
base64Decode('UKvzgA==') // Uint8Array(4) [80, 171, 243, 128]
base64DecodeToStr('SGVsbG8sIHdvcmxkIQ==') // Hello, world!
```

### Base64Url

```typescript
import { base64urlEncode, base64urlDecode, base64urlDecodeToStr } from 'base64-esm'

// encode
base64urlEncode(new Uint8Array([80, 171, 243, 128])) // UKvzgA
base64urlEncode('你好，🌏！这是一个处理 Base64 的 ESM 库。') // 5L2g5aW977yM8J-Mj--8gei_meaYr-S4gOS4quWkhOeQhiBCYXNlNjQg55qEIEVTTSDlupPjgII

// decode
base64urlDecode('UKvzgA') // Uint8Array(4) [80, 171, 243, 128]
base64urlDecodeToStr('5L2g5aW977yM8J-Mj--8gei_meaYr-S4gOS4quWkhOeQhiBCYXNlNjQg55qEIEVTTSDlupPjgII') // 你好，🌏！这是一个处理 Base64 的 ESM 库。
```

## References

- Base64: [RFC 4648: Base 64 Encoding](https://datatracker.ietf.org/doc/html/rfc4648#section-4)

- Base64Url: [RFC 4648: Base 64 Encoding with URL and Filename Safe Alphabet](https://datatracker.ietf.org/doc/html/rfc4648#section-5)

## License

MIT
