#!/usr/bin/node
const request = require('request');
const url = 'https://swapi-api.alx-tools.com/api/films/' + process.argv[2];

request(url, function (error, response, body) {
  if (error) {
    console.log(error);
  } else {
    const characters = JSON.parse(body).characters;
    printCharacter(characters, 0);
  }
});

function printCharacter (characters, index) {
  if (index >= characters.length) {
    return;
  }
  request(characters[index], function (err, res, body) {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.parse(body).name);
      printCharacter(characters, index + 1);
    }
  });
}
