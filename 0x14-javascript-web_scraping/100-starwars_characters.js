#!/usr/bin/node
const request = require('request');
const url = 'https://swapi-api.alx-tools.com/api/films/' + process.argv[2];

request(url, function (error, response, body) {
  if (error) {
    console.log(error);
  } else {
    const characters = JSON.parse(body).characters;
    for (const charUrl of characters) {
      request(charUrl, function (err, res, charBody) {
        if (err) {
          console.log(err);
        } else {
          console.log(JSON.parse(charBody).name);
        }
      });
    }
  }
});
