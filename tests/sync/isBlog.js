const test = require('tape')

const isBlog = require('../../sync/isBlog')()
// or const isBlog = require('../../isBlog')

test('isBlog / blog schema', t => {
  const notBlog = {
    type: 'post',
    title: 'An important idea',
    blog: '&sfoIYo0kKKGI+TJYnznVDSs3BM/HjMWdCPXirvj9BfE=.sha256'
  }
  t.notOk(isBlog(notBlog), 'invalidates messages that are not blogs')

  const simpleBlog = {
    type: 'blog',
    title: 'An important idea',
    blog: '&sfoIYo0kKKGI+TJYnznVDSs3BM/HjMWdCPXirvj9BfE=.sha256'
  }
  t.ok(isBlog(simpleBlog), 'validates simple blog')

  const incompleteBlog = {
    type: 'blog',
    title: 'An important idea'
  }
  t.notOk(isBlog(incompleteBlog), 'invalidates incompleteBlog blog')
  t.equal(isBlog.errors[0].message, 'is required', 'provides error messages')

  const malformedBlog = {
    type: 'blog',
    title: 'An important idea',
    blog: '&sfoIYo0kKKGI+TJYnznVDSs3BM'
  }
  t.notOk(isBlog(malformedBlog), 'invalidates malformed blog')

  const actualBlog = {
    'key': '%GKGFNHKeUVAVPNUapE41skF3ND3Etm76XO7Y7sVeTLI=.sha256',
    'value': {
      'previous': '%MxC4d1BHqtBiC+mC+BaaZOAZSg41nFGOdXDpJiU+tg4=.sha256',
      'author': '@ye+QM09iPcDJD6YvQYjoQc7sLF/IFhmNbEqgdzQo3lQ=.ed25519',
      'sequence': 13369,
      'timestamp': 1518568914727,
      'hash': 'sha256',
      'content': {
        'type': 'blog',
        'channel': 'cooperative',
        'title': 'Coop-source',
        'summary': 'a day in the life of open source (and cooperatives) ',
        'mentions': [
          {
            'link': '&wpKZTZIifFeH0P0LY3Iztgzbj17VlKXIfQNjPnoas1g=.sha256',
            'name': 'at_mention.png'
          },
          {
            'link': '&3S7gQpN8ZznmLzstY9AZiWZaZXFG2UaxmeE9SuKU5jk=.sha256',
            'name': 'protoflip.png'
          },
          {
            'link': '&UgzlelvbBOTj6QGaTqi/PnfkjY8wUNSzUw37/yOxMLw=.sha256',
            'name': 'protozoa_logo.png'
          }
        ],
        'thumbnail': '&wpKZTZIifFeH0P0LY3Iztgzbj17VlKXIfQNjPnoas1g=.sha256',
        'blog': '&+/mENZOe+RTSn9ZsTFG7Xw0dtv05YDUpIhazYQEj48w=.sha256'
      },
      'signature': '1WEhVT42LCdNhuf5ogpcnJfJWbFTUily666pj1XDKS07hjEKGuwZTy/pYRcl/XJJIHMH9MiRkR6FIiOIa7t1DQ==.sig.ed25519'
    },
    'timestamp': 1518568915077,
    'dest': '#cooperative',
    'rts': 1518568914727
  }
  t.ok(isBlog(actualBlog), 'validates a blog from ticktack')

  t.end()
})
