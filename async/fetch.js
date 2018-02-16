const isBlog = require('../isBlog')

// TODO take blog or blogKey?

module.exports = function (server) {
  return function fetch (blog, cb) {
    if (!isBlog(blog)) return cb(`Not a valid blog ${JSON.stringify(blog, null, 2)}`)

    server.blobs.want(getBlob(blog), (err, success) => {
      if (err) {
        if (cb) return cb(err)
        else throw err
      }
      
      cb(null, success)
    })
  }
}

function getBlob (msg) {
  // is msg of form { key, value }
  if (msg.value.content && msg.value.content.blog) return msg.value.content.blog
  // is just body of the message, 'msg content'
  else if (msg.blog) return msg.blog
}

