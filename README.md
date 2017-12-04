# electron-ad-block
Simple ad blocker for Electron.

### How It Works
The library is powered by [Brave Ad Block](https://www.npmjs.com/package/ad-block).

The core code is modified from [Jense5/electron-ad-blocker](https://github.com/Jense5/electron-ad-blocker) & [Jense5/is-ad](https://github.com/Jense5/is-ad).

But it works out of the box - automatically downloads EasyList filter lists and updates them in background.

```js
const { session } = require('electron');
const adBlock = require('electron-ad-block');

const currentSession = session.fromPartition('current');

adBlock(currentSession, {
  filterTypes: ['ads', 'privacy', 'annoyance', 'social'],
});
```

or

```js
const { BrowserWindow } = require('electron')
const adBlock = require('electron-ad-block');

const win = new BrowserWindow();

adBlock(win.webContents.session, {
  filterTypes: ['ads', 'privacy', 'annoyance', 'social'],
});
```

### Available Options
##### filterTypes
Default: `['ads', 'privacy', 'annoyance', 'social']`

Define what content types you want to block.

##### logger
`Default: console`

Optional logger that will be used. Uses the .log function as in console.log(). If you want to use `winston`, make sure to wrap it: `{ logger: { log: (...params) => winston.info(...params) } }`.

##### onRequest
Default: `undefined`

Optional function that will be called instead of the callback. This is useful if you still want to define your own onRequest function for the electron session. An extra parameter is added, which is shouldBeBlocked.

##### verbose
Default: `true`

Whether or not the Ad Blocker should log when he blocks a request.
