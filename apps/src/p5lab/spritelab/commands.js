import {commands as actionCommands} from './commands/actionCommands';
import {commands as behaviorCommands} from './commands/behaviorCommands';
import {commands as eventCommands} from './commands/eventCommands';
import {commands as locationCommands} from './commands/locationCommands';
import {commands as spriteCommands} from './commands/spriteCommands';
import {commands as worldCommands} from './commands/worldCommands';
import {commands as validationCommands} from './commands/validationCommands';
import * as coreLibrary from './coreLibrary';

function drawBackground() {
  if (typeof coreLibrary.background === 'string') {
    this.background(coreLibrary.background);
  } else {
    this.background('white');
  }
  if (typeof coreLibrary.background === 'object') {
    coreLibrary.background.resize(400, 400);
    this.image(coreLibrary.background);
  }
}

function updateTitle() {
  this.fill('black');
  this.textAlign(this.CENTER, this.CENTER);
  this.textSize(50);
  this.text(coreLibrary.title, 0, 0, 400, 200);
  this.textSize(35);
  this.text(coreLibrary.subtitle, 0, 200, 400, 200);
}

export const commands = {
  executeDrawLoopAndCallbacks() {
    drawBackground.apply(this);
    coreLibrary.runBehaviors();
    coreLibrary.runEvents(this);
    this.drawSprites();
    updateTitle.apply(this);
  },

  // Action commands
  changePropBy(sprites, prop, val) {
    actionCommands.changePropBy(sprites, prop, val);
  },

  edgesDisplace(sprites) {
    actionCommands.edgesDisplace.apply(this, [sprites]);
  },

  isTouchingEdges(sprites) {
    return actionCommands.isTouchingEdges.apply(this, [sprites]);
  },

  jumpTo(sprites, location) {
    actionCommands.jumpTo(sprites, location);
  },

  mirrorSprite(sprites, direction) {
    actionCommands.mirrorSprite(sprites, direction);
  },

  moveInDirection(sprites, distance, direction) {
    actionCommands.moveInDirection(sprites, distance, direction);
  },

  moveForward(sprites, distance) {
    actionCommands.moveForward(sprites, distance);
  },

  moveToward(sprites, distance, target) {
    actionCommands.moveToward(sprites, distance, target);
  },

  removeTint(sprites) {
    actionCommands.setProp(sprites, 'tint', null);
  },

  setProp(sprites, prop, val) {
    actionCommands.setProp.apply(this, [sprites, prop, val]);
  },

  setTint(sprites, color) {
    actionCommands.setProp(sprites, 'tint', color);
  },

  turn(sprites, n, direction) {
    actionCommands.turn(sprites, n, direction);
  },

  // Behavior commands
  addBehaviorSimple(sprites, behavior) {
    behaviorCommands.addBehavior(sprites, behavior);
  },

  Behavior(callback) {
    return behaviorCommands.Behavior(callback);
  },

  draggableFunc(sprites) {
    return behaviorCommands.draggableFunc(this);
  },

  removeAllBehaviors(sprites) {
    behaviorCommands.removeAllBehaviors(sprites);
  },

  removeBehaviorSimple(sprites, behavior) {
    behaviorCommands.removeBehavior(sprites, behavior);
  },

  // Event commands
  checkTouching(condition, sprites, targets, callback) {
    eventCommands.checkTouching(condition, sprites, targets, callback);
  },

  keyPressed(condition, key, callback) {
    eventCommands.keyPressed(condition, key, callback);
  },

  spriteClicked(condition, sprites, callback) {
    eventCommands.spriteClicked(condition, sprites, callback);
  },

  // Location commands
  locationAt(x, y) {
    return locationCommands.locationAt(x, y);
  },

  locationMouse() {
    return locationCommands.locationMouse.apply(this);
  },

  locationOf(sprites) {
    return locationCommands.locationOf(sprites);
  },

  randomLocation() {
    return locationCommands.randomLocation();
  },

  // Sprite commands
  allSpritesWithAnimation(animation) {
    return spriteCommands.allSpritesWithAnimation(animation);
  },

  countByAnimation(animation) {
    return spriteCommands.countByAnimation(animation);
  },

  /**
   * name parameter is unused but needs to be here because the generated code
   * calls createNewSprite() with name as an argument.
   * TODO (ajpal): change generated code to not pass assignment arguments
   * to the generated function.
   */
  createNewSprite(name, animation, location) {
    return spriteCommands.makeSprite.apply(this, [
      {name: name, animation: animation, location: location}
    ]);
  },

  destroy(sprites) {
    spriteCommands.destroy(sprites);
  },

  displace(sprites, targetSpriteIndex) {
    spriteCommands.displace(sprites, targetSpriteIndex);
  },

  getProp(sprites, prop) {
    return spriteCommands.getProp(sprites, prop);
  },

  getSpriteByName(name) {
    return spriteCommands.getSpriteByName(name);
  },

  getThisSprite(which, extraArgs) {
    return spriteCommands.getThisSprite(which, extraArgs);
  },

  makeNewSpriteAnon(animation, location) {
    spriteCommands.makeSprite.apply(this, [
      {animation: animation, location: location}
    ]);
  },

  setAnimation(sprites, animation) {
    spriteCommands.setAnimation(sprites, animation);
  },

  // World commands
  comment(text) {
    worldCommands.comment(text);
  },

  hideTitleScreen() {
    worldCommands.hideTitleScreen();
  },

  printText(text) {
    worldCommands.printText(text);
  },

  setBackground(color) {
    worldCommands.setBackground(color);
  },
  setBackgroundImage(img) {
    worldCommands.setBackgroundImage.apply(this, [img]);
  },
  showTitleScreen(title, subtitle) {
    worldCommands.showTitleScreen(title, subtitle);
  },

  // Validation commands
  getAnimationsInUse() {
    return validationCommands.getAnimationsInUse();
  },

  getBackground() {
    return validationCommands.getBackground();
  },

  getNumBehaviorsForAnimation(animation) {
    return validationCommands.getNumBehaviorsForAnimation(animation);
  },

  getNumBehaviorsForSpriteId(sprites) {
    return validationCommands.getNumBehaviorsForSpriteId(sprites);
  },

  getSpriteIdsInUse() {
    return validationCommands.getSpriteIdsInUse();
  }
};
