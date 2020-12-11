import Phaser from 'phaser';
import { barHandlers } from './barHandlers';
import { addHandlers, removeHandlers } from './utils';

const { DESTROY } = Phaser.Scenes.Events;

class LoaderBarPlugin extends Phaser.Plugins.ScenePlugin {
  boot () {
    this.systems.events.once(DESTROY, this.sceneDestroy, this);

    addHandlers(this.systems.load, barHandlers, this);
  }

  sceneDestroy () {
    removeHandlers(this.systems.load, barHandlers, this);
  }
}

export { LoaderBarPlugin };
