'use strict';

// кеш кат и товар. рефакт. токен в хедер. добавить пут метод для эдд товар. доабвить коды ошибок 


const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bodyParserJson = bodyParser.json();
const fs = require('fs');

let data = require('../data/data');

router.get('/', (req, res) => {
  res.send(data);
})

router.delete('/delete/:id', (req, res) => {
  let result;
  const itemId = req.params.id;
  result = data.filter((item) => {
    return (item.number !== itemId)
  });
  data = result;
  res.send('obnulil');
});

router.post('/add',bodyParserJson, (req, res) => {
  // let biggestId = -1;
  // data.forEach((item) => {
  //   let itemId =  Number(item.id);
  //   if (data.length && biggestId < itemId) {
  //     biggestId = itemId;
  //   }
    res.send(req.body.name)
  //   data.push = {   
  //     number: biggestId,
  //     name: req.body.name,
  //     dateOfCreation: req.body.date,
  //     listOfParticipants: req.body.listOfParticipants,
  //     description: req.body.description
  // }
  

});

module.exports = router;