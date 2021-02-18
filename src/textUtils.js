import Phaser from 'phaser';
import { getFileState, getLoaderState, percent } from './utils';

const { Clamp } = Phaser.Math;
const { Pad } = Phaser.Utils.String;
const EMPTY_PERCENT = '    ';
const NUM_SHADES = 5;
const PAD_LEFT = 1;
const PERCENT_STRING_LENGTH = 4;
const SPACE = ' ';

const SHADES = {
  0: '░░░░░',
  1: '▓░░░░',
  2: '▓▓░░░',
  3: '▓▓▓░░',
  4: '▓▓▓▓░',
  5: '▓▓▓▓▓'
};

const getShade = function (amount) {
  amount = Clamp(Math.round(NUM_SHADES * amount), 0, NUM_SHADES);

  return SHADES[amount];
};

const filePercentToText = function (file) {
  return file.percentComplete >= 0 ? padPercent(file.percentComplete) : EMPTY_PERCENT;
};

const padPercent = function (val) {
  return Pad(percent(val), PERCENT_STRING_LENGTH, SPACE, PAD_LEFT);
};

export const fileToText = function (file) {
  return `${getShade(file.percentComplete)} ${filePercentToText(file)} ${file.key} (${getFileState(file.state)})`;
};

export const loaderToText = function (loader) {
  return `${getShade(loader.progress)} ${padPercent(loader.progress)} (${getLoaderState(loader.state)})`;
};
