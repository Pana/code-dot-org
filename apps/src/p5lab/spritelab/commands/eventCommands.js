import * as coreLibrary from '../coreLibrary';

export const commands = {
  checkTouching(condition, sprites, targets, callback) {
    if (condition === 'when' || condition === 'while') {
      coreLibrary.addEvent(
        condition + 'touch',
        {sprites: sprites, targets: targets},
        callback
      );
    }
  },

  keyPressed(condition, key, callback) {
    if (condition === 'when' || condition === 'while') {
      coreLibrary.addEvent(condition + 'press', {key: key}, callback);
    }
  },

  spriteClicked(condition, sprites, callback) {
    if (condition === 'when' || condition === 'while') {
      coreLibrary.addEvent(condition + 'click', {sprites: sprites}, callback);
    }
  }
};
