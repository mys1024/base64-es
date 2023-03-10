const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()

const values = new Uint8Array(128)

const b64Chars = new Uint8Array(64)
// 'A' to 'Z'
for (let char = 65; char <= 90; char++) {
  const value = char - 65
  b64Chars[value] = char
  values[char] = value
}
// 'a' to 'z'
for (let char = 97; char <= 122; char++) {
  const value = char - 97 + 26
  b64Chars[value] = char
  values[char] = value
}
// '0' to '9'
for (let char = 48; char <= 57; char++) {
  const value = char - 48 + 52
  b64Chars[value] = char
  values[char] = value
}
// '+' and '/'
b64Chars[62] = 43
b64Chars[63] = 47
values[43] = 62
values[47] = 63

const b64urlChars = new Uint8Array(b64Chars)
// '-' and '_'
b64urlChars[62] = 45
b64urlChars[63] = 95
values[45] = 62
values[95] = 63

function b64Length(byteCount: number, padding: boolean): number {
  let len = Math.ceil(byteCount / 3) * 4
  if (!padding) {
    switch (byteCount % 3) {
      case 1:
        len -= 2
        break
      case 2:
        len -= 1
    }
  }
  return len
}

export function encode(data: string | Uint8Array, url: boolean, padding: boolean): string {
  if (typeof data === 'string')
    data = textEncoder.encode(data)
  const chars = url ? b64urlChars : b64Chars
  const byteCount = data.length
  const b64Buffer = new Uint8Array(b64Length(byteCount, padding))
  let bi = 0
  let tmp = 0
  for (let i = 0; i < byteCount; i++) {
    switch (i % 3) {
      case 0:
        b64Buffer[bi++] = chars[(data[i] & 0b11111100) >> 2]
        tmp = (data[i] & 0b00000011) << 4
        break
      case 1:
        b64Buffer[bi++] = chars[tmp | ((data[i] & 0b11110000) >> 4)]
        tmp = (data[i] & 0b00001111) << 2
        break
      case 2:
        b64Buffer[bi++] = chars[tmp | ((data[i] & 0b11000000) >> 6)]
        b64Buffer[bi++] = chars[(data[i] & 0b00111111)]
    }
  }
  switch (byteCount % 3) {
    case 1:
      b64Buffer[bi++] = chars[tmp]
      if (padding) {
        b64Buffer[bi++] = 61
        b64Buffer[bi++] = 61
      }
      break
    case 2:
      b64Buffer[bi++] = chars[tmp]
      if (padding)
        b64Buffer[bi++] = 61
  }
  return textDecoder.decode(b64Buffer)
}

export function decode(b64: string): Uint8Array {
  const charCount = b64.length - (b64.endsWith('==') ? 2 : b64.endsWith('=') ? 1 : 0)
  const byteCount = Math.ceil(charCount * 6 / 8) - (charCount % 4 === 0 ? 0 : 1)
  const data = new Uint8Array(byteCount)
  const b64Buffer = textEncoder.encode(b64)
  for (let i = 0; i < charCount; i++) {
    const offset = Math.floor(i / 4) * 3
    const val = values[b64Buffer[i]]
    switch (i % 4) {
      case 0:
        data[offset] |= val << 2
        break
      case 1:
        data[offset] |= val >> 4
        data[offset + 1] |= val << 4
        break
      case 2:
        data[offset + 1] |= val >> 2
        data[offset + 2] |= val << 6
        break
      case 3:
        data[offset + 2] |= val
    }
  }
  return data
}

export function decodeToStr(b64: string): string {
  return textDecoder.decode(decode(b64))
}
