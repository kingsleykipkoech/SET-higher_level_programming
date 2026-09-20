#!/usr/bin/node
const SquareP = require('./5-square');

class Square extends SquareP {
  charPrint (c) {
    const ch = c || 'X';
    for (let i = 0; i < this.height; i++) {
      console.log(ch.repeat(this.width));
    }
  }
}
module.exports = Square;
