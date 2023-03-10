import { encode as _encode } from "./basic"

export function base64urlEncode(data: string | Uint8Array, padding = false): string {
  return _encode(data, true, padding)  
}

export {
  decode as base64urlDecode,
  decodeToStr as base64urlDecodeToStr,
} from "./basic"
