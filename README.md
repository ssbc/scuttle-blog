# Scuttle-blog

A helper module which covers all your ssb `blog` related needs from blog data.

The parts of this modules are : 
- queries/ getters
- schemas/ validaters

## Usage

```js
const isBlog = require('scuttle-blog/isBlog')
isBlog(msg)
// => true
```

```js
const { h } = require(mutant)
const ScuttleBook = require('scuttle-blog')

const sBook = ScuttleBook(server)  // server is sometimes called sbot

const myBook = sBook.obs.get('%GKGFNHKeUVAVPNUapE41skF3ND3Etm76XO7Y7sVeTLI=.sha256')

document.body.appendChild(
  h('Blog', [
    h('h1', blog.title),
    h('pre', blog.body)
  ])
)
// the blog here would be raw markdown, but fixing that is left to the reader!
```

## Constructor API

### `Blog(server)`

`server` is a connection to your scuttlebutt server provided by `ssb-client` (sometimes called sbot in other docs).

`server` can also be an _observeable_ which will resolve into the above at some point. If you pass in an observeable, synchronous methods will return observeables.


## Instance API

### `blog.sync.isBlog(msg) => Boolean`

`msg` - is a message from a server stream (or the message content).


### `blog.obs.get(blogMsg) => Observeable`

`blogMsg` `(Object)` - a blog message (or the content of a `blogMsg`)

The observeable returned is [Mutant Struct](https://github.com/mmckegg/mutant#struct) which holds data structured like:

```js
{
  title,
  channel,
  summary,
  thumbnail,
  body,       [MutantValue]
  errors      [MutantArray]
}
```

In this case all values will be observeables, and the blog content (`body`) will take some time to load if you haven't already got the whole blog. (This method called `blog.async.fetch` under the hood.)


### `blog.aync.get(blogMsg, cb)`

`blogMsg` `(Object)` - a blog message (or the content of a `blogMsg`)

`cb` - a callback with signature `(err, blogObj)` where `blogObj` is a plain js object with the same form described in `blog.obs.get`

The observeable returned is [Mutant Struct](https://github.com/mmckegg/mutant#struct) which holds data structured like:

```js
{
  title,
  channel,
  summary,
  thumbnail,
  body,       [MutantValue]
  errors      [MutantArray]
}
```

In this case all values will be observeables, and the blog content (`body`) will take some time to load if you haven't already got the whole blog. (This method called `blog.async.fetch` under the hood.)

### `blog.async.fetch(msg, cb)`

Blogs store the body of their text as an attachement. In Scuttlebutt, attachments have to be manually requested, hence this method.

`key` `(Object)` - a blog msg

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

Things could implement in future:
- have methods take a msg or a msgKey
- synchronous methods
- better pattern for not having to write `fetch(server)(cb)` when coding
- blog creation
- blog editing
- blog drafts (encrypted, but later revealed .. or just republished)


