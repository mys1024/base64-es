const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
const indexes = new Map<string, number>()
for (let i = 0; i <chars.length; i++) {
  indexes.set(chars[i], i)
}

function encode(data: Uint8Array, padding = true): string {
  let s = ''
  let tmp = 0
  for (let i = 0; i < data.length; i++) {
    switch (i % 3) {
      case 0:
        s += chars[(data[i] & 0b11111100) >> 2]
        tmp = (data[i] & 0b00000011) << 4
        break
      case 1:
        s += chars[tmp | ((data[i] & 0b11110000) >> 4)]
        tmp = (data[i] & 0b00001111) << 2
        break
      case 2:
        s += chars[tmp | ((data[i] & 0b11000000) >> 6)]
        s += chars[(data[i] & 0b00111111)]
        tmp = 0
    }
  }
  switch (data.length % 3) {
    case 1:
      s += chars[tmp]
      if (padding)
        s += '=='
      break
    case 2:
      s += chars[tmp]
      if (padding)
        s += '='
  }
  return s
}

function decode(base64url: string): Uint8Array {
  const arr: number[] = []
  // TODO
  return new Uint8Array(arr)
}

export const Base64Url = {
  encode,
  decode
}
