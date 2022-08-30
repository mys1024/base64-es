import {
  encode as _encode,
  decode as _decode,
  decodeToString as _decodeToString,
} from "./basic"

function encode(data: string | Uint8Array, padding = false): string {
  return _encode(data, true, padding)  
}

function decode(b64url: string): Uint8Array {
  return _decode(b64url)
}

function decodeToString(b64url: string): string {
  return _decodeToString(b64url)
}

export const Base64Url = {
  encode,
  decode,
  decodeToString,
}
