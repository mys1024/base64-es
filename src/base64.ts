import {
  encode as _encode,
  decode as _decode,
  decodeToString as _decodeToString,
} from "./basic"

function encode(data: string | Uint8Array, padding = true): string {
  return _encode(data, false, padding)  
}

function decode(b64: string): Uint8Array {
  return _decode(b64)
}

function decodeToString(b64: string): string {
  return _decodeToString(b64)
}

export const Base64 = {
  encode,
  decode,
  decodeToString,
}
