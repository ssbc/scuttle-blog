const isBlog = require('../../isBlog')

// TODO take blog or blogKey?

module.exports = function (server) {
  return function fetch (blog, cb) {
    if (!isBlog(blog)) return cb(`Not a valid blog ${JSON.stringify(blog, null, 2)}`)

    server.blobs.want(getBlob(blog), (err, success) => {
      if (err) return cb(err)
      
      cb(null, success)
    })
  }
}

function getBlob (msg) {
  // is msg of form { key, value }
  if (msg.value.content && msg.value.content.content) return msg.value.content.content
  // is just body of the message, 'msg content'
  else if (msg.content) return msg.content
}

