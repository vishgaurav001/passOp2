const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passopagain';

const app = express(); // ✅ Move this up

app.use(cors())
app.use(bodyparser.json())

const port = 3000

client.connect();

app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    await collection.insertOne(password);
    res.json({ success: true });
});

app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    await collection.deleteOne(password);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
