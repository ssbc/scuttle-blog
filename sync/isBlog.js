const validator = require('is-my-json-valid')
const schema = require('../schema/blog')
const isBlogContent = validator(schema, {verbose: true})

// server is not used here. Closure pattern is just for consistency of use with other functions.
module.exports = function (server) {
  return function isBlog (obj) {
    const result = isBlogContent(getMsgContent(obj))

    // exposes error messages provided by is-my-json-valid
    isBlog.errors = isBlogContent.errors

    return result
  }
}

function getMsgContent (obj) {
  if (obj.value && obj.value.content) return obj.value.content
  else if (obj.content) return obj.content
  else return obj
}


