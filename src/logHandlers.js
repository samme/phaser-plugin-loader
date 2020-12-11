/* eslint-disable no-console */

import Phaser from 'phaser';

const {
  ADD,
  COMPLETE,
  FILE_COMPLETE,
  FILE_LOAD_ERROR,
  FILE_LOAD,
  POST_PROCESS,
  PROGRESS,
  START
} = Phaser.Loader.Events;

const logHandlers = {
  [ADD]:
    function (key, type, loader, file) {
      console.debug(ADD, key, type, file.url);
    },
  [COMPLETE]:
    function (loader, totalComplete, totalFailed) {
      console[totalFailed ? 'warn' : 'info'](COMPLETE, totalComplete, totalFailed);
    },
  [FILE_COMPLETE]:
    function (key, type, data) {
      console.debug(FILE_COMPLETE, key, type, data);
    },
  [FILE_LOAD]:
    function (file) {
      console.debug(FILE_LOAD, file.key, file.type);
    },
  [FILE_LOAD_ERROR]:
    function (file) {
      console.error(FILE_LOAD_ERROR, file.key, file.type, file.src);
    },
  [POST_PROCESS]:
    function (loader) {
      console.info(POST_PROCESS, loader.queue.size);
    },
  [PROGRESS]:
    function (progress) {
      console.debug(PROGRESS, progress);
    },
  [START]:
    function (loader) {
      console.info(START);
      console.debug('baseURL', loader.baseURL);
      console.debug('crossOrigin', loader.crossOrigin);
      console.debug('maxParallelDownloads', loader.maxParallelDownloads);
      console.debug('path', loader.path);
      console.debug('prefix', loader.prefix);
      console.debug('totalToLoad', loader.totalToLoad);
      console.debug('xhr', loader.xhr);
    }
};

export { logHandlers };
