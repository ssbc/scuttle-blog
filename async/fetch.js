const isBlog = require('../../isBlog')

// TODO take blog or blogKey?

module.exports = function (server) {
  return function fetch (blog, cb) {
    if (!isBlog(blog)) return cb(`Not a valid blog ${JSON.stringify(blog, null, 2)}`)

    server.blobs.want(getBlob(blog), (err, success) => {
      if (err) throw err
      
      if (success) cb(null, success)
      else cb(null, 'Could not fetch blog content')
    })
  }
}

function getBlob (msg) {
  if (msg.value.content && msg.value.content.content) return obj.value.content

  return obj
}

