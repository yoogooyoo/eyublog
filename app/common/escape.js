export function escape2Html(str) {
  let arrEntities = {
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'amp': '&',
    'quot': '"'
  }
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
    return arrEntities[t]
  })
}