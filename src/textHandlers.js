import Phaser from 'phaser';

import { fileToText, getFiles, percent } from './utils';

const { COMPLETE, POST_PROCESS, PROGRESS, START } = Phaser.Loader.Events;

const textHandlers = {
  [COMPLETE]:
    function () {
      this.view.destroy();
      this.view = null;
    },
  [POST_PROCESS]:
    function () {
      this.view.setText(['Processing …']);
    },
  [PROGRESS]:
    function (progress) {
      const { load } = this.systems;

      this.view.setText([
        `Loading ${percent(progress, 0)}`,
        '',
        ...getFiles(load).map(fileToText)
      ]);
    },
  [START]:
    function (loader) {
      this.view = this.systems.add.text(0, 0, [
        'Starting …',
        '',
        ...getFiles(loader).map(fileToText)
      ]);
    }
};

export { textHandlers };
