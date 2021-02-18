import Phaser from 'phaser';
import { getFiles } from './utils';
import { fileToText, loaderToText } from './textUtils';

const { COMPLETE, POST_PROCESS, PROGRESS, START } = Phaser.Loader.Events;

const textHandlers = {
  [COMPLETE]:
    function () {
      this.view.destroy();
      this.view = null;
    },
  [POST_PROCESS]:
    function () {
      this.view.setText('Processing …');
    },
  [PROGRESS]:
    function () {
      const { load } = this.systems;

      this.view.setText([
        loaderToText(load),
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
