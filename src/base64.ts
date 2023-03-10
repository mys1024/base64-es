import { encode as _encode } from "./basic"

export function base64Encode(data: string | Uint8Array, padding = true): string {
  return _encode(data, false, padding)  
}

export {
  decode as base64Decode,
  decodeToStr as base64DecodeToStr,
} from "./basic"
