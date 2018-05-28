const { blobIdRegex } = require('ssb-ref')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'title', 'blog'],
  properties: {
    type: {type: 'string', pattern: 'blog'},
    title: {type: 'string'},
    blog: {type: 'string', pattern: blobIdRegex},
    summary: {
      oneOf: [
        {type: 'string'},
        {type: 'null'}
      ]
    },
    thumbnail: {
      oneOf: [
        {type: 'string', pattern: blobIdRegex},
        {type: 'null'}
      ]
    },
    channel: {type: 'string'}
  }
}
