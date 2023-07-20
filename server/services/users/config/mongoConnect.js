
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://raymcnd:YrWUyqlOyFEicNiu@cluster0.n9lp5uq.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbName = "kompor-users";
let db;

async function mongoConnect() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");

        const database = client.db(dbName);
        db = database
        return database
    } catch (err) {
        console.log(err.stack);
        await client.close();
    }
    // finally {
    //     await client.close();
    // }
}

function getDb() {
  return db
}

// mongoConnect().catch(console.dir);
module.exports = {mongoConnect, getDb}

