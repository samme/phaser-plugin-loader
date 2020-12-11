import Phaser from 'phaser';
import { addHandlers, removeHandlers } from './utils';
import { textHandlers } from './textHandlers';

const { DESTROY } = Phaser.Scenes.Events;

class LoaderTextPlugin extends Phaser.Plugins.ScenePlugin {
  boot () {
    this.systems.events.once(DESTROY, this.sceneDestroy, this);

    addHandlers(this.systems.load, textHandlers, this);
  }

  sceneDestroy () {
    removeHandlers(this.systems.load, textHandlers, this);
  }
}

export { LoaderTextPlugin };
