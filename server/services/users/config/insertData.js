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
 
 // The database to use
 const dbName = "kompor-users";
                      
 async function run() {
    try {
         await client.connect();
         console.log("Connected correctly to server");
         const db = client.db(dbName);
         const users = db.collection("users");
                                                                                                                                                            
         let userDocuments = [
            {
              "username": "user1",
              "email": "user1@mail.com",
              "password": "1",
              "role": "admin",
              "phoneNumber": "0812345678",
              "address": "Somewhere",
              "createdAt": "2023-07-09T01:03:44Z",
              "updatedAt": "2023-07-09T01:03:44Z"
            },
            {
              "username": "user2",
              "email": "user2@mail.com",
              "password": "2",
              "role": "user",
              "phoneNumber": "08123456789",
              "address": "Somewhere",
              "createdAt": "2023-07-09T01:03:44Z",
              "updatedAt": "2023-07-09T01:03:44Z"
            },
            {
              "username": "user3",
              "email": "user3@mail.com",
              "password": "3",
              "role": "user",
              "phoneNumber": "081234567890",
              "address": "Somewhere",
              "createdAt": "2023-07-09T01:03:44Z",
              "updatedAt": "2023-07-09T01:03:44Z"
            }
          ]

          const options = { ordered: true };
          const result = await users.insertMany(userDocuments, options);
          console.log(`${result.insertedCount} documents were inserted`);
        } catch (err) {
         console.log(err.stack);
     }
 
     finally {
        await client.close();
    }
}
run().catch(console.dir);