# Scuttle-blog

A helper module which covers all your ssb `blog` related needs from blog data.

The parts of this modules are : 
- queries/ getters
- schemas/ validaters

## Usage

```js
const Blog = require('scuttle-blog')
const blog = Blog(server)   // server is sometimes called sbot

blog.sync.isBlog(msg)
// => true

blog.async.fetch(msg.key, (err, success) => {
  if (err)
    return console.error('there was an error getting your blog', err)

  if (success)
    console.log('your blog is ready to read!')
  else 
    console.log('could not fetch your blog T_T')
})
```

## Constructor API

### `Blog(server)`

`server` is a connection to your scuttlebutt server provided by `ssb-client` (sometimes called sbot in other docs).


## Instance API

### `blog.obs.get(keyOrMsg) => Observeable`

`keyOrMsg` `(String|Object)` - either a msg key or a whole message.

The observeable returned is [Mutant Struct](https://github.com/mmckegg/mutant#struct) which emits data of the form:

```js
{
  title,
  summary,
  thumbnail,
  content,
  channel
}
```

The content and thumbnail will take some time to load if you haven't already got the whole blog.
This method called `blog.async.fetch` under the hood.


### `blog.sync.isBlog(msg) => Boolean`

`msg` - is a message from a server stream (or the message content).


### `blog.async.fetch(keyOrMsg, cb)`

Blogs store the body of their text as an attachement. In Scuttlebutt, attachments have to be manually requested, hence this method.

`keyOrMsg` `(String|Object)` - either a msg key or a whole message.

`cb` `(function)` - a callback with the standard signature `(err, success)` where `success` is a `Boolean`



## Schemas

Blog message content:
```js
{
  type:       'blog',
  title:       String,
  blog:        Blob,
  summary:     String,  (optional)
  thumbnail:   Blob,    (optional)
  channel:     String,  (optional)
}
```

## Development

Run the tests with `npm test`

