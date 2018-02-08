const inject = require('./inject')

const methods = {
  async: {
    create: require('./async/fetch'),
  },
  obs: {
    get: require('./obs/get'),
  },
  sync: {
    isBlog: require('./sync/isBook'),
  }
}

// Note : if you don't like this export pattern, there's no reason we can't add different mappings !!
//  e.g. book.validate.bookComment

module.exports = function Blog (server, opts) {
  if (!server.about) throw new Error('scuttle-book requires you to have the ssb-about plugin installed')

  return inject(server, methods)
}


// auto-inject the ssb-server to all methods to reduce repitition
function inject (server, methods) {
  for (var key in methods) {
    if (typeof methods[key] === 'function') {
      methods[key] = methods[key](server)

    }
    else {
      methods[key] = inject(server, methods[key])
    }
  }

  return methods
}


