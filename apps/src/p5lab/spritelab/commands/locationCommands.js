export const commands = {
  locationAt(x, y) {
    return {x: x, y: 400 - y};
  },

  locationMouse() {
    return {x: this.World.mouseX, y: this.World.mouseY};
  },

  locationOf(sprites) {
    let sprite = sprites[0];
    if (sprite) {
      return {x: sprite.x, y: sprite.y};
    }
  },

  randomLocation() {
    let max = 380;
    let min = 20;
    let x = Math.floor(Math.random() * (max - min + 1)) + min;
    let y = Math.floor(Math.random() * (max - min + 1)) + min;
    return {x: x, y: y};
  }
};
