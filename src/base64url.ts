import { textDecoder, textEncoder } from "./basic"

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
const values: Record<string, number> = {}
for (let i = 0; i < chars.length; i++)
  values[chars[i]] = i

function encode(data: string | Uint8Array, padding = false): string {
  if (typeof data === 'string')
    data = textEncoder.encode(data)
  let str = ''
  let tmp = 0
  for (let i = 0; i < data.length; i++) {
    switch (i % 3) {
      case 0:
        str += chars[(data[i] & 0b11111100) >> 2]
        tmp = (data[i] & 0b00000011) << 4
        break
      case 1:
        str += chars[tmp | ((data[i] & 0b11110000) >> 4)]
        tmp = (data[i] & 0b00001111) << 2
        break
      case 2:
        str += chars[tmp | ((data[i] & 0b11000000) >> 6)]
        str += chars[(data[i] & 0b00111111)]
        tmp = 0
        break
    }
  }
  switch (data.length % 3) {
    case 1:
      str += chars[tmp]
      if (padding)
        str += '=='
      break
    case 2:
      str += chars[tmp]
      if (padding)
        str += '='
      break
  }
  return str
}

function decode(str: string): Uint8Array {
  const charCount = str.length - (str.endsWith('==') ? 2 : str.endsWith('=') ? 1 : 0)
  const byteCount = Math.ceil(charCount * 6 / 8) - (charCount % 4 === 0 ? 0 : 1)
  const data = new Uint8Array(byteCount)
  for (let i = 0; i < charCount; i++) {
    const offset = Math.floor(i / 4) * 3
    const val = values[str[i]]
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

function decodeToString(str: string): string {
  return textDecoder.decode(decode(str))
}

export const Base64Url = {
  encode,
  decode,
  decodeToString,
}
