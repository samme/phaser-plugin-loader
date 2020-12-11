import Phaser from 'phaser';
import { addHandlers, removeHandlers } from './utils';
import { logHandlers } from './logHandlers';

const { DESTROY } = Phaser.Scenes.Events;

class LoaderLoggerPlugin extends Phaser.Plugins.ScenePlugin {
  boot () {
    this.systems.events.once(DESTROY, this.sceneDestroy, this);

    addHandlers(this.systems.load, logHandlers, this);
  }

  sceneDestroy () {
    removeHandlers(this.systems.load, logHandlers, this);
  }
}

export { LoaderLoggerPlugin };
