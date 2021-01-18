const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => { 
  const mongoConnectionString = 'mongodb+srv://Tegar:zhN4NrfwQMTLCyFA@cluster0.iazfi.mongodb.net/shop?retryWrites=true&w=majority';

  MongoClient.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      console.log('Connected');
      _db = client.db();
      callback();
    }) 
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if(_db) {
    return _db;
  }
  throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;