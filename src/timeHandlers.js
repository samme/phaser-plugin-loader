/* eslint-disable no-console */

import Phaser from 'phaser';
import { getSceneKeyForLoader } from './utils';

const { COMPLETE, START } = Phaser.Loader.Events;

let count = 1;

const timeHandlers = {
  [START]:
    function (loader) {
      const label = `Loader complete (${getSceneKeyForLoader(loader)}) (${count++})`;

      console.time(label);

      loader.once(COMPLETE, function () {
        console.timeEnd(label);
      });
    }
};

export { timeHandlers };
