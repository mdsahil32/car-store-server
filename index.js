const express = require('express');
const app = express()
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;

// middleware 
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.6wm6qxp.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    const topCarCollection = client.db('carStoreDB').collection('topCar')
    const expensiveCarCollection = client.db('carStoreDB').collection('expensiveCar')
    const bugattiCarCollection = client.db('carStoreDB').collection('bugattiCar')
    const cheapCarCollection = client.db('carStoreDB').collection('cheapPriceCar')
    const bookingCarCollection = client.db('carStoreDB').collection('BookingCar')

    // Top 4 car start //
    app.get('/topCar', async (req, res) => {
      const result = await topCarCollection.find().toArray()
      res.send(result)
    })
    app.get('/topCar/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await topCarCollection.findOne(query)
      res.send(result)
    })
    // end //

    // Expensive car //
    app.get('/expensiveCar', async (req, res) => {
      const result = await expensiveCarCollection.find().toArray()
      res.send(result)
    })

    app.get('/expensiveCar/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await expensiveCarCollection.findOne(query)
      res.send(result)
    })
    // end //
    // Bugatti Car //
    app.get('/bugattiCar', async (req, res) => {
      const result = await bugattiCarCollection.find().toArray()
      res.send(result)
    })

    // Cheap Car //
    app.get('/cheapCar', async (req, res) => {
      const result = await cheapCarCollection.find().toArray()
      res.send(result)
    })

    app.get('/cheapCar/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await cheapCarCollection.findOne(query)
      res.send(result)
    })
    // end ------
    // booking car -----

    app.get('/bookingCar', async(req, res) =>{
      const cursor = bookingCarCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    app.get('/bookingCar/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await bookingCarCollection.findOne(query)
      res.send(result)
    })

    app.post('/bookingCar', async (req, res) => {
      const bookingCar = req.body;
      const result = await bookingCarCollection.insertOne(bookingCar)
      res.send(result)
    })

    app.delete('/bookingCar/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      const result = await bookingCarCollection.deleteOne(query)
      res.send(result)
    })
   

    // end --------


    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


// 


app.get('/', (req, res) => {
  res.send('car store server is running')
})

app.listen(port, () => {
  console.log(`running on port ${port}`);
})