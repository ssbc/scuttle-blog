const test = require('tape')
const validator = require('is-my-json-valid')

const isBlog = require('../../sync/isBlog')()
// or const isBlog = require('../../isBlog')

test('isBlog / blog schema', t => {

  const notBlog = {
    type: 'post',
    title: 'An important idea',
    content: '&sfoIYo0kKKGI+TJYnznVDSs3BM/HjMWdCPXirvj9BfE=.sha256'
  }
  t.notOk(isBlog(notBlog), 'invalidates messages that are not blogs')

  const simpleBlog = {
    type: 'blog',
    title: 'An important idea',
    content: '&sfoIYo0kKKGI+TJYnznVDSs3BM/HjMWdCPXirvj9BfE=.sha256'
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
    content: '&sfoIYo0kKKGI+TJYnznVDSs3BM'
  }
  t.notOk(isBlog(malformedBlog), 'invalidates malformed blog')

  t.end()
})

