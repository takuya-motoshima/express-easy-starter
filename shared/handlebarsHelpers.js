/**
 * JSON encoding.
 *
 * @example
 * {{{json value}}}
 */
export function json(value, replacer = null, space = null) {
  return JSON.stringify(value, replacer, space);
}

/**
 * Replace specified content.
 *
 * @example
 * {{replace 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?' 'dog' 'monkey'}}
 */
export function replace(str, find, replace) {
  return str.replace(find, replace);
}