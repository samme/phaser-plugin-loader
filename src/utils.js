import { fileStates, loaderStates } from './states';

export const addHandlers = function (target, handlers, context) {
  for (const name in handlers) {
    target.on(name, handlers[name], context);
  }
};

export const removeHandlers = function (target, handlers, context) {
  for (const name in handlers) {
    target.off(name, handlers[name], context);
  }
};

export const percent = function (value, precision = 0) {
  return `${(100 * value).toFixed(precision)}%`;
};

export const getFiles = function (loader) {
  return [
    ...loader.queue.entries,
    ...loader.inflight.entries,
    ...loader.list.entries
  ];
};

export const getFileState = function (val) {
  return fileStates[val];
};

export const getLoaderState = function (val) {
  return loaderStates[val];
};

export const getSceneKey = function (scene) {
  return scene.sys.settings.key;
};

export const getSceneKeyForLoader = function (loader) {
  return getSceneKey(loader.scene);
};

export const loaderToLogText = function (loader) {
  return `Loader (${getSceneKeyForLoader(loader)}) (${getLoaderState(loader.state)}) total: ${loader.totalToLoad} | to load: ${loader.list.size} | loading: ${loader.inflight.size} | to process: ${loader.queue.size} | complete: ${loader.totalComplete} | failed: ${loader.totalFailed}`;
};

export const logLoader = function (loader) {
  // eslint-disable-next-line no-console
  console.log(loaderToLogText(loader));
};
