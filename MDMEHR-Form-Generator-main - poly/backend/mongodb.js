const {MongoClient} = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function dbConnect(){
    let res = await client.connect();
    let db = res.db('EHRDB');
    return  db.collection('EHRS');
}

module.exports = dbConnect;