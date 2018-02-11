const { Struct, Value } = require('mutant')
const fetch = require('../../async/fetch')

module.exports = function (server) {
  return function get (blogMsg) {
    fetch(blogMsg, (err, success) => {

    }
  }
}

function Blog (blogMsg) {
  var blogMsgBody = blogMsg.key
    ? blogMsg.value.content

  return Struct({
    title,
    summary,
    thumbnail,
    content,
    channel
  })
}

