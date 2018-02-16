const validator = require('is-my-json-valid')
const schema = require('../schema/blog')
const getMsgContent = require('../lib/getMsgContent')

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


