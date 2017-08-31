import mongodb from 'mongodb';
import assert from 'assert';
import bcrypt from 'bcryptjs';
import seedData from './seed';

const mongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017/';

const encryptPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  return hashedPassword;
};

const insertUsers = (database, callback) => {
  const collections = database.collection('User');
  // console.log(seedData); // eslint-disable-line
  seedData.map((user, key) => {
    const password = `hashPassword${key}`;
    user.hashedPassword = encryptPassword(password);
    // console.log(user.password);
    // console.log(key);
    return true;
  });
  // console.log(seedData); // eslint-disable-line

  collections.insertMany(seedData, (error, result) => {
    if (error) {
      // console.log(error) // eslint-disable-line
    } else {
      // console.log(result); // eslint-disable-line
      callback(result);
    }
  });
};


// Use connect method to connect to the server
mongoClient.connect(url, (err, db) => {
  assert.equal(null, err);
  console.log('Connected successfully to server'); // eslint-disable-line

  insertUsers(db, () => {
    db.close();
  });
});

