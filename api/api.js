const express = require('express');
const redis = require('redis');
const {promisify} = require('util');

const client = redis.createClient('//redis:6379');

redisClient = {
  ...client,
  getAsync: promisify(client.get).bind(client),
  setAsync: promisify(client.set).bind(client),
  keysAsync: promisify(client.keys).bind(client),
  hmsetAsync: promisify(client.hmset).bind(client),
};

const checkId = (id) => true;
const idExist = (id) => true;
const checkAddres = (adr) => true;
const checkValue = (value) => true;

const app = express();
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.get('/addBounty', async (req, res) => {
  // id     : valid SO id
  // value  : bounty value
  // address: btc address that found the bounty
  const {id, value, addres} = req.query;
  if (checkId(id) && checkAddres(addres) && checkValue(value) && !idExist(id)) {
    try {
      await redisClient.hmsetAsync([`id:${id}`, 'value', value, 'addres', addres]);
      return res.send('Success');
    } 
    catch(err) {
      console.log(err);
      return res.send('FAIL');
    }
  }
  return res.send('FAIL');
});

app.get('/getIds', async (req, res) => {
  const { key } = req.params;
  const rawData = await redisClient.getAsync(key);
  try {
    const ids = await redisClient.keysAsync('id:*');
    return res.json(ids);
  } 
  catch(err) {
    console.log(err);
    return res.send('FAIL');
  }
});

app.get('/', (req, res) => {
  return res.send('Hello world');
});

