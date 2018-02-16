const { resolve } = require('mutant')
const pull = require('pull-stream')
const fetch = require('../async/fetch')
const isBlog = require('../isBlog')
const Blog = require('../struct')
const getMsgContent = require('../lib/getMsgContent')

module.exports = function (server) {
  return function asyncGet (blogMsg, cb) {
    if (!isBlog(blogMsg)) return // TODO handle this more gracefully?

    var obs = Blog(blogMsg)

    fetch(server)(blogMsg, (err, success) => {
      if (err) return cb(err)
      if (!success) return cb(new Error('Unable to fetch blob'))

      pull(
        server.blobs.get(getMsgContent(blogMsg).blog),
        pull.collect((err, ary) => {
          if (err) return cb(err)

          obs.body.set(Buffer.concat(ary).toString())
          cb(null, resolve(obs))
        })
      )
    })
  }
}

