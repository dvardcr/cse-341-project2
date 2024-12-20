const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
    .then ((client) => {
         // Assign the database instance here
        database = client.db(process.env.DB_NAME);
        console.log(`Connected to database: ${process.env.DB_NAME}`);
        callback(null, database);
    })
    .catch((err) => {
        callback(err);
    })
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized!')
    }
    return database;
};

module.exports = { initDb, getDatabase }