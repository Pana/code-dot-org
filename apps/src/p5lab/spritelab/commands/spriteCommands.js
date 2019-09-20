import * as coreLibrary from '../coreLibrary';

export const commands = {
  allSpritesWithAnimation(animation) {
    return coreLibrary.allSpritesWithAnimation(animation);
  },

  getSpriteByName(name) {
    return coreLibrary.getSpriteByName(name);
  },

  countByAnimation(animation) {
    let sprites = coreLibrary.allSpritesWithAnimation(animation);
    return sprites.length;
  },
  destroy(sprites) {
    sprites.forEach(sprite => {
      sprite.destroy();
      coreLibrary.removeAllBehaviors(sprite);
      coreLibrary.deleteSprite(sprite.id);
    });
  },

  displace(sprites, targetSprites) {
    sprites.forEach(sprite => {
      targetSprites.forEach(target => sprite.displace(target));
    });
  },

  getProp(sprites, prop) {
    let sprite = sprites[0];
    if (sprite !== undefined) {
      if (prop === 'scale') {
        return sprite.getScale() * 100;
      } else if (prop === 'costume') {
        return sprite.getAnimationLabel();
      } else if (prop === 'y') {
        return 400 - sprite.y;
      } else {
        return sprite[prop];
      }
    }
  },

  getThisSprite(which, extraArgs) {
    if (extraArgs) {
      if (which === 'this') {
        return extraArgs.sprite;
      }
      if (which === 'other') {
        return extraArgs.target;
      }
    }
  },

  makeSprite(opts) {
    let location = opts.location;
    let animation = opts.animation;
    let name = opts.name;
    if (!location) {
      location = {x: 200, y: 200};
    }
    if (typeof location === 'function') {
      location = location();
    }
    var sprite = this.createSprite(location.x, location.y);
    sprite.direction = 0;
    sprite.baseScale = 1;
    sprite.setScale = function(scale) {
      sprite.scale = scale * sprite.baseScale;
    };
    sprite.getScale = function() {
      return sprite.scale / sprite.baseScale;
    };
    let spriteId = coreLibrary.addSprite(sprite, name);
    if (animation) {
      sprite.setAnimation(animation);
      sprite.scale /= sprite.baseScale;
      sprite.baseScale =
        100 /
        Math.max(
          100,
          sprite.animation.getHeight(),
          sprite.animation.getWidth()
        );
      sprite.scale *= sprite.baseScale;
    }
    return spriteId;
  },

  setAnimation(sprites, animation) {
    sprites.forEach(sprite => {
      sprite.setAnimation(animation);
      sprite.scale /= sprite.baseScale;
      sprite.baseScale =
        100 /
        Math.max(
          100,
          sprite.animation.getHeight(),
          sprite.animation.getWidth()
        );
      sprite.scale *= sprite.baseScale;
    });
  }
};
