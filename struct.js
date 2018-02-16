const { Struct, Value, Array: MutantArray } = require('mutant')
const getMsgContent = require('./lib/getMsgContent')

module.exports = function Blog (blogMsg) {
  var { title, channel, summary, thumbnail } = getMsgContent(blogMsg)

  return Struct({
    title,
    summary,
    thumbnail,
    channel,
    body: Value(),
    // sync: Value(false),
    errors: MutantArray()
  })
}
