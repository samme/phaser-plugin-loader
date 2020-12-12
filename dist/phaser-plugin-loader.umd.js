(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('phaser')) :
  typeof define === 'function' && define.amd ? define(['exports', 'phaser'], factory) :
  (global = global || self, factory(global.PhaserLoaderPlugin = {}, global.Phaser));
}(this, function (exports, Phaser) { 'use strict';

  Phaser = Phaser && Phaser.hasOwnProperty('default') ? Phaser['default'] : Phaser;

  var Loader = Phaser.Loader;

  var fileStates = {};
  fileStates[Loader.FILE_COMPLETE] = 'complete';
  fileStates[Loader.FILE_DESTROYED] = 'destroyed';
  fileStates[Loader.FILE_ERRORED] = 'errored';
  fileStates[Loader.FILE_FAILED] = 'failed';
  fileStates[Loader.FILE_LOADED] = 'loaded';
  fileStates[Loader.FILE_LOADING] = 'loading';
  fileStates[Loader.FILE_PENDING] = 'pending';
  fileStates[Loader.FILE_POPULATED] = 'populated';
  fileStates[Loader.FILE_PROCESSING] = 'processing';

  var loaderStates = {};
  loaderStates[Loader.LOADER_COMPLETE] = 'complete';
  loaderStates[Loader.LOADER_DESTROYED] = 'destroyed';
  loaderStates[Loader.LOADER_IDLE] = 'idle';
  loaderStates[Loader.LOADER_LOADING] = 'loading';
  loaderStates[Loader.LOADER_PROCESSING] = 'processing';
  loaderStates[Loader.LOADER_SHUTDOWN] = 'shutdown';

  var addHandlers = function (target, handlers, context) {
    for (var name in handlers) {
      target.on(name, handlers[name], context);
    }
  };

  var removeHandlers = function (target, handlers, context) {
    for (var name in handlers) {
      target.off(name, handlers[name], context);
    }
  };

  var percent = function (value, precision) {
    if ( precision === void 0 ) precision = 0;

    return (((100 * value).toFixed(precision)) + "%");
  };

  var getFiles = function (loader) {
    return loader.queue.entries.concat( loader.inflight.entries,
      loader.list.entries
    );
  };

  var getFileState = function (val) {
    return fileStates[val];
  };

  var getLoaderState = function (val) {
    return loaderStates[val];
  };

  var getSceneKey = function (scene) {
    return scene.sys.settings.key;
  };

  var getSceneKeyForLoader = function (loader) {
    return getSceneKey(loader.scene);
  };

  var fileToText = function (file) {
    return ((file.key) + " " + ((file.percentComplete >= 0) ? percent(file.percentComplete) : '-') + " (" + (getFileState(file.state)) + ")");
  };

  var loaderToText = function (loader) {
    return ("Loader (" + (getSceneKeyForLoader(loader)) + ") (" + (getLoaderState(loader.state)) + ") total: " + (loader.totalToLoad) + " | to load: " + (loader.list.size) + " | loading: " + (loader.inflight.size) + " | to process: " + (loader.queue.size) + " | complete: " + (loader.totalComplete) + " | failed: " + (loader.totalFailed));
  };

  var logLoader = function (loader) {
    // eslint-disable-next-line no-console
    console.log(loaderToText(loader));
  };

  /* eslint-disable no-console */

  var ref = Phaser.Loader.Events;
  var ADD = ref.ADD;
  var COMPLETE = ref.COMPLETE;
  var FILE_COMPLETE = ref.FILE_COMPLETE;
  var FILE_LOAD_ERROR = ref.FILE_LOAD_ERROR;
  var FILE_LOAD = ref.FILE_LOAD;
  var POST_PROCESS = ref.POST_PROCESS;
  var PROGRESS = ref.PROGRESS;
  var START = ref.START;

  var logHandlers = {};
  logHandlers[ADD] = function (key, type, loader, file) {
        console.debug(ADD, key, type, file.url);
      };
  logHandlers[COMPLETE] = function (loader, totalComplete, totalFailed) {
        console[totalFailed ? 'warn' : 'info'](COMPLETE, totalComplete, totalFailed);
      };
  logHandlers[FILE_COMPLETE] = function (key, type, data) {
        console.debug(FILE_COMPLETE, key, type, data);
      };
  logHandlers[FILE_LOAD] = function (file) {
        console.debug(FILE_LOAD, file.key, file.type);
      };
  logHandlers[FILE_LOAD_ERROR] = function (file) {
        console.error(FILE_LOAD_ERROR, file.key, file.type, file.src);
      };
  logHandlers[POST_PROCESS] = function (loader) {
        console.info(POST_PROCESS, loader.queue.size);
      };
  logHandlers[PROGRESS] = function (progress) {
        console.debug(PROGRESS, progress);
      };
  logHandlers[START] = function (loader) {
        console.info(START);
        console.debug('baseURL', loader.baseURL);
        console.debug('crossOrigin', loader.crossOrigin);
        console.debug('maxParallelDownloads', loader.maxParallelDownloads);
        console.debug('path', loader.path);
        console.debug('prefix', loader.prefix);
        console.debug('totalToLoad', loader.totalToLoad);
        console.debug('xhr', loader.xhr);
      };

  var ref$1 = Phaser.Scenes.Events;
  var DESTROY = ref$1.DESTROY;

  var LoaderLoggerPlugin = /*@__PURE__*/(function (superclass) {
    function LoaderLoggerPlugin () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) LoaderLoggerPlugin.__proto__ = superclass;
    LoaderLoggerPlugin.prototype = Object.create( superclass && superclass.prototype );
    LoaderLoggerPlugin.prototype.constructor = LoaderLoggerPlugin;

    LoaderLoggerPlugin.prototype.boot = function boot () {
      this.systems.events.once(DESTROY, this.sceneDestroy, this);

      addHandlers(this.systems.load, logHandlers, this);
    };

    LoaderLoggerPlugin.prototype.sceneDestroy = function sceneDestroy () {
      removeHandlers(this.systems.load, logHandlers, this);
    };

    return LoaderLoggerPlugin;
  }(Phaser.Plugins.ScenePlugin));

  /* eslint-disable no-console */

  var ref$2 = Phaser.Loader.Events;
  var COMPLETE$1 = ref$2.COMPLETE;
  var START$1 = ref$2.START;

  var count = 1;

  var timeHandlers = {};
  timeHandlers[START$1] = function (loader) {
        var label = "Loader complete (" + (getSceneKeyForLoader(loader)) + ") (" + (count++) + ")";

        console.time(label);

        loader.once(COMPLETE$1, function () {
          console.timeEnd(label);
        });
      };

  var ref$3 = Phaser.Scenes.Events;
  var DESTROY$1 = ref$3.DESTROY;

  var LoaderTimerPlugin = /*@__PURE__*/(function (superclass) {
    function LoaderTimerPlugin () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) LoaderTimerPlugin.__proto__ = superclass;
    LoaderTimerPlugin.prototype = Object.create( superclass && superclass.prototype );
    LoaderTimerPlugin.prototype.constructor = LoaderTimerPlugin;

    LoaderTimerPlugin.prototype.boot = function boot () {
      this.systems.events.once(DESTROY$1, this.sceneDestroy, this);

      addHandlers(this.systems.load, timeHandlers, this);
    };

    LoaderTimerPlugin.prototype.sceneDestroy = function sceneDestroy () {
      removeHandlers(this.systems.load, timeHandlers, this);
    };

    return LoaderTimerPlugin;
  }(Phaser.Plugins.ScenePlugin));

  var ref$4 = Phaser.Loader.Events;
  var COMPLETE$2 = ref$4.COMPLETE;
  var FILE_LOAD_ERROR$1 = ref$4.FILE_LOAD_ERROR;
  var POST_PROCESS$1 = ref$4.POST_PROCESS;
  var PROGRESS$1 = ref$4.PROGRESS;
  var START$2 = ref$4.START;

  var HEIGHT = 20;
  var ALPHA = 0.8;
  var START_COLOR = 0xffdc00;
  var LOAD_COMPLETE_COLOR = 0x2ecc40;
  var PROCESSING_COLOR = 0x39cccc;
  var FAILED_COLOR = 0xff4136;

  var barHandlers = {};
  barHandlers[COMPLETE$2] = function () {
        this.view.destroy();
        this.view = null;
      };
  barHandlers[FILE_LOAD_ERROR$1] = function () {
        this.view.setFillStyle(FAILED_COLOR);
      };
  barHandlers[POST_PROCESS$1] = function () {
        this.view.setFillStyle(PROCESSING_COLOR);
      };
  barHandlers[PROGRESS$1] = function (progress) {
        this.view.scaleX = progress;

        if (progress === 1) {
          this.view.setFillStyle(LOAD_COMPLETE_COLOR);
        }
      };
  barHandlers[START$2] = function () {
        this.view = this.systems.add.rectangle(0, 0, this.systems.scale.width, HEIGHT, START_COLOR).setAlpha(ALPHA).setOrigin(0);
      };

  var ref$5 = Phaser.Scenes.Events;
  var DESTROY$2 = ref$5.DESTROY;

  var LoaderBarPlugin = /*@__PURE__*/(function (superclass) {
    function LoaderBarPlugin () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) LoaderBarPlugin.__proto__ = superclass;
    LoaderBarPlugin.prototype = Object.create( superclass && superclass.prototype );
    LoaderBarPlugin.prototype.constructor = LoaderBarPlugin;

    LoaderBarPlugin.prototype.boot = function boot () {
      this.systems.events.once(DESTROY$2, this.sceneDestroy, this);

      addHandlers(this.systems.load, barHandlers, this);
    };

    LoaderBarPlugin.prototype.sceneDestroy = function sceneDestroy () {
      removeHandlers(this.systems.load, barHandlers, this);
    };

    return LoaderBarPlugin;
  }(Phaser.Plugins.ScenePlugin));

  var ref$6 = Phaser.Loader.Events;
  var COMPLETE$3 = ref$6.COMPLETE;
  var POST_PROCESS$2 = ref$6.POST_PROCESS;
  var PROGRESS$2 = ref$6.PROGRESS;
  var START$3 = ref$6.START;

  var textHandlers = {};
  textHandlers[COMPLETE$3] = function () {
        this.view.destroy();
        this.view = null;
      };
  textHandlers[POST_PROCESS$2] = function () {
        this.view.setText(['Processing …']);
      };
  textHandlers[PROGRESS$2] = function (progress) {
        var ref = this.systems;
        var load = ref.load;

        this.view.setText([
          ("Loading " + (percent(progress, 0))),
          '' ].concat( getFiles(load).map(fileToText)
        ));
      };
  textHandlers[START$3] = function (loader) {
        this.view = this.systems.add.text(0, 0, [
          'Starting …',
          '' ].concat( getFiles(loader).map(fileToText)
        ));
      };

  var ref$7 = Phaser.Scenes.Events;
  var DESTROY$3 = ref$7.DESTROY;

  var LoaderTextPlugin = /*@__PURE__*/(function (superclass) {
    function LoaderTextPlugin () {
      superclass.apply(this, arguments);
    }

    if ( superclass ) LoaderTextPlugin.__proto__ = superclass;
    LoaderTextPlugin.prototype = Object.create( superclass && superclass.prototype );
    LoaderTextPlugin.prototype.constructor = LoaderTextPlugin;

    LoaderTextPlugin.prototype.boot = function boot () {
      this.systems.events.once(DESTROY$3, this.sceneDestroy, this);

      addHandlers(this.systems.load, textHandlers, this);
    };

    LoaderTextPlugin.prototype.sceneDestroy = function sceneDestroy () {
      removeHandlers(this.systems.load, textHandlers, this);
    };

    return LoaderTextPlugin;
  }(Phaser.Plugins.ScenePlugin));

  exports.LoaderLoggerPlugin = LoaderLoggerPlugin;
  exports.LoaderTimerPlugin = LoaderTimerPlugin;
  exports.LoaderBarPlugin = LoaderBarPlugin;
  exports.LoaderTextPlugin = LoaderTextPlugin;
  exports.logLoader = logLoader;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=phaser-plugin-loader.umd.js.map
