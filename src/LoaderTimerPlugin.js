import Phaser from 'phaser';
import { addHandlers, removeHandlers } from './utils';
import { timeHandlers } from './timeHandlers';

const { DESTROY } = Phaser.Scenes.Events;

class LoaderTimerPlugin extends Phaser.Plugins.ScenePlugin {
  boot () {
    this.systems.events.once(DESTROY, this.sceneDestroy, this);

    addHandlers(this.systems.load, timeHandlers, this);
  }

  sceneDestroy () {
    removeHandlers(this.systems.load, timeHandlers, this);
  }
}

export { LoaderTimerPlugin };
