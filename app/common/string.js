export function strLen(str) {
  let strLen = 0
  for (let i = 0, len = str.length; i < len; i++) {
    if (str.charCodeAt(i) > 255) // if it's the Chinese character, string length should increase 2
      strLen += 2
    else
      strLen++
  }
  return strLen
}