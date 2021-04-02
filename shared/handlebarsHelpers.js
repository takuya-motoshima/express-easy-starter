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

/**
 * Returns the Assets path containing the file update time parameter.
 *
 * @example
 * {{cache_busting '/assets/style.css' '//example.com'}}
 * //example.com/assets/style.css?
 */
export function cache_busting(assetsPath, baseUrl) {
  const realPath = `${global.APP_ROOT}/public/${assetsPath.replace(/^\//, '')}`;
  if (!fs.existsSync(realPath)) return assetsPath;
  const mtime = (new Date(fs.statSync(realPath).mtime)).getTime();
  return `${baseUrl}/${assetsPath.replace(/^\//, '')}?${mtime}`;
}