const { blobIdRegex } = require('ssb-ref')

module.exports = {
  $schema: 'http://json-schema.org/schema#',
  type: 'object',
  required: ['type', 'title', 'content'],
  properties: {
    type: {type: 'string', pattern: 'blog'},
    title: {type: 'string'},
    content: {type: 'string', pattern: blobIdRegex},
    summary: {type: 'string'},
    thumbnail: {type: 'string', pattern: blobIdRegex},
    channel: {type: 'string'},
  }
}

