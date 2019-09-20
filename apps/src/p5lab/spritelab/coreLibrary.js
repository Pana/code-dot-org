var spriteId = 0;
var nativeSpriteMap = {};
var inputEvents = [];
var behaviors = [];

export var background;
export var title = '';
export var subtitle = '';

export function reset() {
  spriteId = 0;
  nativeSpriteMap = {};
  inputEvents = [];
  behaviors = [];
  background = 'white';
  title = subtitle = '';
}

/**
 * Returns a list of all sprites that have the specified animation.
 * Called on each tick of the draw loop because animations can change throughout runtime.
 * @param {string} animation - animation name
 */
export function allSpritesWithAnimation(animation) {
  let group = [];
  Object.keys(nativeSpriteMap).forEach(spriteId => {
    if (nativeSpriteMap[spriteId].getAnimationLabel() === animation) {
      let sprite = nativeSpriteMap[spriteId];
      if (sprite) {
        group.push(sprite);
      }
    }
  });
  return group;
}

export function getSpriteByName(name) {
  let sprite;
  Object.keys(nativeSpriteMap).forEach(spriteId => {
    if (nativeSpriteMap[spriteId].name === name) {
      sprite = nativeSpriteMap[spriteId];
    }
  });
  return [sprite];
}

export function getAnimationsInUse() {
  let animations = new Set();
  Object.keys(nativeSpriteMap).forEach(spriteId => {
    animations.add(nativeSpriteMap[spriteId].getAnimationLabel());
  });
  return Array.from(animations);
}

/**
 * @param {string} animation
 * @return {number} Number of behaviors associated with the specified animation.
 */
export function getNumBehaviorsForAnimation(animation) {
  let numBehaviors = 0;
  behaviors.forEach(behavior => {
    if (behavior.sprite.getAnimationLabel() === animation) {
      numBehaviors++;
    }
  });
  return numBehaviors;
}

/**
 * @param {number} spriteId
 * @return {number} Number of behaviors associated with the specified sprite
 */
export function getNumBehaviorsForSpriteId(spriteId) {
  let numBehaviors = 0;
  behaviors.forEach(behavior => {
    if (behavior.sprite.id === spriteId) {
      numBehaviors++;
    }
  });
  return numBehaviors;
}

export function getSpriteIdsInUse() {
  let spriteIds = [];
  Object.keys(nativeSpriteMap).forEach(spriteId =>
    spriteIds.push(parseInt(spriteId))
  );
  return spriteIds;
}

/**
 * Adds the specified sprite to the native sprite map
 * @param {Sprite} sprite
 * @returns {Number} A unique id to reference the sprite.
 */
export function addSprite(sprite, name) {
  nativeSpriteMap[spriteId] = sprite;
  if (name) {
    sprite.name = name;
  }
  sprite.id = spriteId;
  spriteId++;
  return sprite.id;
}

/**
 * Removes a sprite from the native sprite map
 * @param {Number} spriteId
 */
export function deleteSprite(spriteId) {
  delete nativeSpriteMap[spriteId];
}

export function addEvent(type, args, callback) {
  inputEvents.push({type: type, args: args, callback: callback});
}

function whenPressEvent(inputEvent, p5Inst) {
  if (p5Inst.keyWentDown(inputEvent.args.key)) {
    // Call callback with no extra args
    return [{}];
  } else {
    // Don't call callback
    return [];
  }
}

function whilePressEvent(inputEvent, p5Inst) {
  if (p5Inst.keyDown(inputEvent.args.key)) {
    // Call callback with no extra args
    return [{}];
  } else {
    // Don't call callback
    return [];
  }
}

function whenTouchEvent(inputEvent) {
  let getFired = function(map, spriteId, targetId) {
    if (map && map[spriteId] && map[spriteId][targetId]) {
      return map[spriteId][targetId].firedOnce;
    }
  };
  let setFired = function(map, spriteId, targetId, fired) {
    if (!map) {
      map = {};
    }
    if (!map[spriteId]) {
      map[spriteId] = {};
    }
    if (!map[spriteId][targetId]) {
      map[spriteId][targetId] = {};
    }
    map[spriteId][targetId].firedOnce = fired;
  };
  let sprites = inputEvent.args.sprite1;
  let targets = inputEvent.args.sprite2;
  let callbackArgList = [];
  let previousCollisions = inputEvent.previous;

  // We need to clear out previous, so that events get re-triggered when sprite animations change
  inputEvent.previous = {};
  sprites.forEach(sprite => {
    targets.forEach(target => {
      let firedOnce = getFired(previousCollisions, sprite.id, target.id);
      if (sprite.overlap(target)) {
        if (!firedOnce) {
          // Sprites are overlapping, and we haven't fired yet for this collision,
          // so we should fire the callback
          callbackArgList.push({sprite: sprite.id, target: target.id});
          firedOnce = true;
        }
      } else {
        // Sprites are not overlapping (anymore), so we should make sure firedOnce is
        // set to false, so that if the sprites overlap again, we will fire the callback.
        // This is required to handle the case where sprites start touching, stop touching, and start
        // touching again- we want the callback to fire two times.
        firedOnce = false;
      }
      setFired(inputEvent.previous, sprite.id, target.id, firedOnce);
    });
  });
  return callbackArgList;
}

function whileTouchEvent(inputEvent) {
  let callbackArgList = [];
  let sprites = inputEvent.args.sprites;
  let targets = inputEvent.args.targets;
  sprites.forEach(sprite => {
    targets.forEach(target => {
      if (sprite.overlap(target)) {
        callbackArgList.push({sprite: sprite.id, target: target.id});
      }
    });
  });
  return callbackArgList;
}

function whenClickEvent(inputEvent, p5Inst) {
  let callbackArgList = [];
  if (p5Inst.mouseWentDown('leftButton')) {
    let sprites = inputEvent.args.sprites;
    sprites.forEach(sprite => {
      if (p5Inst.mouseIsOver(sprite)) {
        callbackArgList.push({sprite: sprite.id});
      }
    });
  }
  return callbackArgList;
}

function whileClickEvent(inputEvent, p5Inst) {
  let callbackArgList = [];
  let sprites = inputEvent.args.sprites;
  sprites.forEach(sprite => {
    if (p5Inst.mousePressedOver(sprite)) {
      callbackArgList.push({sprite: sprite.id});
    }
  });
  return callbackArgList;
}

function checkEvent(inputEvent, p5Inst) {
  switch (inputEvent.type) {
    case 'whenpress':
      return whenPressEvent(inputEvent, p5Inst);
    case 'whilepress':
      return whilePressEvent(inputEvent, p5Inst);
    case 'whentouch':
      return whenTouchEvent(inputEvent);
    case 'whiletouch':
      return whileTouchEvent(inputEvent);
    case 'whenclick':
      return whenClickEvent(inputEvent, p5Inst);
    case 'whileclick':
      return whileClickEvent(inputEvent, p5Inst);
  }
}

export function runEvents(p5Inst) {
  inputEvents.forEach(inputEvent => {
    let callbackArgList = checkEvent(inputEvent, p5Inst);
    callbackArgList.forEach(args => {
      inputEvent.callback(args);
    });
  });
}

export function addBehavior(sprite, behavior) {
  if (sprite && behavior) {
    let existing = behaviors.find(
      b => b.sprite === sprite && b.name === behavior.name
    );
    if (!existing) {
      behaviors.push({
        func: behavior.func,
        name: behavior.name,
        sprite: sprite
      });
    }
  }
}

export function removeAllBehaviors(sprite) {
  behaviors = behaviors.filter(behavior => behavior.sprite !== sprite);
}

export function removeBehavior(sprite, behavior) {
  if (sprite && behavior) {
    let index = behaviors.findIndex(
      b => b.sprite === sprite && b.name === behavior.name
    );
    if (index !== -1) {
      behaviors.splice(index, 1);
    }
  }
}

export function runBehaviors() {
  behaviors.forEach(behavior =>
    behavior.func(getSpriteByName(behavior.sprite.name))
  );
}
