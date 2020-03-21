'use strict';

// кеш кат и товар. рефакт. токен в хедер. добавить пут метод для эдд товар. доабвить коды ошибок 


const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bodyParserJson = bodyParser.json();
const fs = require('fs');

let data = require('../data/data');
let users = require('../data/users');

router.get('/', (req, res) => {
  res.send(data);
})
router.get('/users', (req, res) => {
  res.send(users);
})

router.delete('/delete/:id', bodyParserJson, (req, res) => {
  const itemId = Number(req.params.id);
  const result = data.filter((item) => {
    console.log(item)
    return (Number(item.number) !== itemId)
  });
  fs.writeFileSync('./data/data.json', JSON.stringify(result), function(err, data) {
    if(err) console.log('error', err);
  });
  res.send(result);
});

router.put('/edit/:id', bodyParserJson, (req, res) => {
  const itemId = Number(req.params.id);
  const newItem = {
    name: req.body.name,
    dateOfCreation: new Date().toISOString(),
    listOfParticipants: req.body.participants,
    description: req.body.description
  }
  console.log(req.body);
  console.log(newItem);
  let result = data.map((item) => {
    if (Number(item.number) === itemId) {
      return {
        ...item,
        name: req.body.name,
        dateOfCreation: new Date().toISOString(),
        listOfParticipants: req.body.participants,
        description: req.body.description
      }
    } else {
      return item;
    }
  })
  fs.writeFileSync('./data/data.json', JSON.stringify(result), function(err, data) {
    if(err) console.log('error', err);
  });
  res.send(data);
});

router.post('/add', bodyParserJson, (req, res) => {
  let biggestId = -1;
  data.forEach((item) => {
    let itemId =  Number(item.number);
    if (data.length && biggestId < itemId) {
      biggestId = itemId;
    }
  });

    let result = data;
    console.log(result)
    data.push({   
      number: biggestId+1,
      name: req.body.name,
      dateOfCreation: new Date().toISOString(),
      listOfParticipants: req.body.participants,
      description: req.body.description
    });
  
  fs.writeFileSync('./data/data.json', JSON.stringify(data), function(err, result) {
    if(err) console.log('error', err);
  });
  res.send(data);
});

module.exports = router;