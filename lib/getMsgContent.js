module.exports = function getMsgContent (obj) {
  if (obj.value && obj.value.content) return obj.value.content
  else if (obj.author && obj.timestamp && obj.content) return obj.content
  else return obj
}
