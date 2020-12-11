import Phaser from 'phaser';

const { Loader } = Phaser;

export const fileStates = {
  [Loader.FILE_COMPLETE]: 'complete',
  [Loader.FILE_DESTROYED]: 'destroyed',
  [Loader.FILE_ERRORED]: 'errored',
  [Loader.FILE_FAILED]: 'failed',
  [Loader.FILE_LOADED]: 'loaded',
  [Loader.FILE_LOADING]: 'loading',
  [Loader.FILE_PENDING]: 'pending',
  [Loader.FILE_POPULATED]: 'populated',
  [Loader.FILE_PROCESSING]: 'processing'
};

export const loaderStates = {
  [Loader.LOADER_COMPLETE]: 'complete',
  [Loader.LOADER_DESTROYED]: 'destroyed',
  [Loader.LOADER_IDLE]: 'idle',
  [Loader.LOADER_LOADING]: 'loading',
  [Loader.LOADER_PROCESSING]: 'processing',
  [Loader.LOADER_SHUTDOWN]: 'shutdown'
};
