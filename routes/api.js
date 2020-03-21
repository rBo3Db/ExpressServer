'use strict';

// кеш кат и товар. рефакт. токен в хедер. добавить пут метод для эдд товар. доабвить коды ошибок 


const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bodyParserJson = bodyParser.json();
const fs = require('fs');

let data = require('../data/data');
const urlencodedParser = bodyParser.urlencoded({extended: false});

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

router.post('/add', bodyParserJson, (req, res) => {
  let biggestId = -1;
  // data.forEach((item) => {
  //   let itemId =  Number(item.id);
  //   if (data.length && biggestId < itemId) {
  //     biggestId = itemId;
  //   }
  const name =  req.body.name
  console.log('request');
  console.log(req);
    res.send('name' + name)
    console.log(name)
    console.log(req.name)
    
    data.push = {   
      number: biggestId,
      name: req.body.name,
      dateOfCreation: new Date().getUTCDate(),
      listOfParticipants: req.body.participants,
      description: req.body.description
  }
  console.log(data)

});

module.exports = router;