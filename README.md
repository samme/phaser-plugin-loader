Phaser 3 Loader Plugins
=======================

A collection of small loader plugins to help your development.

Examples: [audio player](https://codepen.io/samme/pen/NWPbQJY), [Spine](https://codepen.io/samme/pen/MWaPrEL), [load multiatlas](https://codepen.io/samme/pen/eYBJbLX).

Loader Bar Plugin
-----------------

Shows a progress bar. Removed when loading is complete.

Loader Logger Plugin
--------------------

Prints to console:

- debug: loader configuration, load progress, file add/load/complete
- info: loader start, post-process, complete
- warn: loader complete with failures
- error: file load failure

Loader Text Plugin
------------------

Shows load progress and file status while loading. Removed when loading is complete.

Loader Timer Plugin
-------------------

Prints to console the time interval from start to completion.

Use
---

Add any of the plugins you need.

### Browser / UMD

```js
/* global PhaserLoaderPlugin */
new Phaser.Game({
  plugins: {
    scene: [
      { key: 'LoaderBar', plugin: PhaserLoaderPlugin.LoaderBarPlugin, start: true },
      { key: 'LoaderLogger', plugin: PhaserLoaderPlugin.LoaderLoggerPlugin, start: true },
      { key: 'LoaderText', plugin: PhaserLoaderPlugin.LoaderTextPlugin, start: true },
      { key: 'LoaderTimer', plugin: PhaserLoaderPlugin.LoaderTimerPlugin, start: true }
    ]
  }
});
```

### Modules

```js
import { LoaderLoggerPlugin, LoaderTimerPlugin, LoaderBarPlugin, LoaderTextPlugin } from 'phaser-plugin-loader';

new Phaser.Game({
  plugins: {
    scene: [
      { key: 'LoaderBar', plugin: LoaderBarPlugin, start: true },
      { key: 'LoaderLogger', plugin: LoaderLoggerPlugin, start: true },
      { key: 'LoaderText', plugin: LoaderTextPlugin, start: true },
      { key: 'LoaderTimer', plugin: LoaderTimerPlugin, start: true }
    ]
  }
});
```
