import * as coreLibrary from '../coreLibrary';

export const commands = {
  addBehavior(sprites, behavior) {
    sprites.forEach(sprite => coreLibrary.addBehavior(sprite, behavior));
  },

  Behavior(func) {
    return {func: func, name: func.funcName};
  },

  // draggableFunc(p5Inst) {
  //   return spriteId => {
  //     let sprite = coreLibrary.getSpriteArray(spriteId)[0];
  //     if (p5Inst.mousePressedOver(sprite) && !sprite.dragging) {
  //       sprite.dragging = true;
  //       sprite.xOffset = sprite.x - p5Inst.World.mouseX;
  //       sprite.yOffset = sprite.y - p5Inst.World.mouseY;
  //     }
  //     if (sprite.dragging) {
  //       sprite.x = p5Inst.World.mouseX + sprite.xOffset;
  //       sprite.y = p5Inst.World.mouseY + sprite.yOffset;
  //     }
  //     if (p5Inst.mouseWentUp()) {
  //       sprite.dragging = false;
  //     }
  //   };
  // },

  removeAllBehaviors(sprites) {
    sprites.forEach(sprite => coreLibrary.removeAllBehaviors(sprite));
  },

  removeBehavior(sprites, behavior) {
    sprites.forEach(sprite => coreLibrary.removeBehavior(sprite, behavior));
  }
};
