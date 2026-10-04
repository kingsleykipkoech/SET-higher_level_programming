#!/usr/bin/node
const dict = require('./101-data').dict;
const total = {};
for (const key in dict) {
  if (total[dict[key]] === undefined) {
    total[dict[key]] = [];
  }
  total[dict[key]].push(key);
}
console.log(total);
