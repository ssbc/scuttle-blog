const pull = require('pull-stream')
const fetch = require('../async/fetch')
const isBlog = require('../isBlog')
const Blog = require('../struct')
const getMsgContent = require('../lib/getMsgContent')

module.exports = function (server) {
  return function obsGet (blogMsg) {
    if (!isBlog(blogMsg)) return // TODO handle this more gracefully?

    var obs = Blog(blogMsg)

    fetch(server)(blogMsg, (err, success) => {
      if (err) return obs.errors.push(err)
      if (!success) return obs.errors.push(new Error('Unable to fetch blob'))

      pull(
        server.blobs.get(getMsgContent(blogMsg).blog),
        pull.collect((err, ary) => {
          if (err) return obs.errors.push(err)

          obs.body.set(Buffer.concat(ary).toString())
        })
      )
    })

    return obs
  }
}
