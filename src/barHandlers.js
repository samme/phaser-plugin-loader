import Phaser from 'phaser';

const { COMPLETE, FILE_LOAD_ERROR, POST_PROCESS, PROGRESS, START } = Phaser.Loader.Events;

const HEIGHT = 20;
const ALPHA = 0.8;
const START_COLOR = 0xffdc00;
const LOAD_COMPLETE_COLOR = 0x2ecc40;
const PROCESSING_COLOR = 0x39cccc;
const FAILED_COLOR = 0xff4136;

const barHandlers = {
  [COMPLETE]:
    function () {
      this.view.destroy();
      this.view = null;
    },
  [FILE_LOAD_ERROR]:
    function () {
      this.view.setFillStyle(FAILED_COLOR);
    },
  [POST_PROCESS]:
    function () {
      this.view.setFillStyle(PROCESSING_COLOR);
    },
  [PROGRESS]:
    function (progress) {
      this.view.scaleX = progress;

      if (progress === 1) {
        this.view.setFillStyle(LOAD_COMPLETE_COLOR);
      }
    },
  [START]:
    function () {
      this.view = this.systems.add.rectangle(0, 0, this.systems.scale.width, HEIGHT, START_COLOR).setAlpha(ALPHA).setOrigin(0);
    }
};

export { barHandlers };
