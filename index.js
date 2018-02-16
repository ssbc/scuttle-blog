const methods = {
  async: {
    create: require('./async/fetch'),
    get: require('./async/get')
  },
  obs: {
    get: require('./obs/get')
  },
  sync: {
    isBlog: require('./sync/isBlog')
  }
}

// Note : if you don't like this export pattern, there's no reason we can't add different mappings !!
//  e.g. book.validate.bookComment

module.exports = function Blog (server, opts) {
  return require('./lib/inject')(server, methods)
}
