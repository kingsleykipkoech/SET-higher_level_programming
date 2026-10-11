#!/usr/bin/node
const request = require('request');

request(process.argv[2], function (error, response, body) {
  if (error) {
    console.log(error);
  } else {
    const todos = JSON.parse(body);
    const result = {};
    for (const todo of todos) {
      if (todo.completed) {
        if (result[todo.userId] === undefined) {
          result[todo.userId] = 0;
        }
        result[todo.userId]++;
      }
    }
    console.log(result);
  }
});
