import { textDecoder, textEncoder } from "./basic"

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
const values: Record<string, number> = {}
for (let i = 0; i < chars.length; i++)
  values[chars[i]] = i

function encode(data: string | Uint8Array, padding = false): string {
  if (typeof data === 'string')
    data = textEncoder.encode(data)
  let b64url = ''
  let tmp = 0
  for (let i = 0; i < data.length; i++) {
    switch (i % 3) {
      case 0:
        b64url += chars[(data[i] & 0b11111100) >> 2]
        tmp = (data[i] & 0b00000011) << 4
        break
      case 1:
        b64url += chars[tmp | ((data[i] & 0b11110000) >> 4)]
        tmp = (data[i] & 0b00001111) << 2
        break
      case 2:
        b64url += chars[tmp | ((data[i] & 0b11000000) >> 6)]
        b64url += chars[(data[i] & 0b00111111)]
        tmp = 0
        break
    }
  }
  switch (data.length % 3) {
    case 1:
      b64url += chars[tmp]
      if (padding)
        b64url += '=='
      break
    case 2:
      b64url += chars[tmp]
      if (padding)
        b64url += '='
      break
  }
  return b64url
}

function decode(b64url: string): Uint8Array {
  const charCount = b64url.length - (b64url.endsWith('==') ? 2 : b64url.endsWith('=') ? 1 : 0)
  const byteCount = Math.ceil(charCount * 6 / 8) - (charCount % 4 === 0 ? 0 : 1)
  const data = new Uint8Array(byteCount)
  for (let i = 0; i < charCount; i++) {
    const offset = Math.floor(i / 4) * 3
    const val = values[b64url[i]]
    switch (i % 4) {
      case 0:
        data[offset + 0] |= val << 2
        break
      case 1:
        data[offset + 0] |= val >> 4
        data[offset + 1] |= val << 4
        break
      case 2:
        data[offset + 1] |= val >> 2
        data[offset + 2] |= val << 6
        break
      case 3:
        data[offset + 2] |= val
        break
    }
  }
  return data
}

function decodeToString(b64url: string): string {
  return textDecoder.decode(decode(b64url))
}

export const Base64Url = {
  encode,
  decode,
  decodeToString,
}
