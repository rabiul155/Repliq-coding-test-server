const express = require('express')
const app = express();
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());



const uri = "mongodb+srv://react-task:0jYacFkCScRw7clN@cluster0.i4cqwjk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {

    try {

        const cartProduct = client.db('Replic-user').collection('cart-product')
        const usersCollection = client.db('Replic-user').collection('users-collection')
        const productCollection = client.db('Replic-user').collection('product-collection')


        app.get('/products', async (req, res) => {
            const query = {}
            const result = await productCollection.find(query).toArray()
            res.send(result);
        })

        app.post('/products', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.send(result);
        })

        app.delete('/products/:_id', async (req, res) => {
            const id = req.params._id;
            console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await productCollection.deleteOne(query);
            res.send(result);

        })

        app.get('/item/:_id', async (req, res) => {
            const id = req.params._id;
            console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await productCollection.findOne(query)
            res.send(result);
        })

        app.get('/cart', async (req, res) => {
            const email = req.query.email;
            console.log(email);
            const query = { email: email }
            const result = await cartProduct.find(query).toArray();
            res.send(result);

        })

        app.post('/cart', async (req, res) => {
            const product = req.body;

            const result = await cartProduct.insertOne(product);
            res.send(result);
        })

        app.delete('/item/:_id', async (req, res) => {
            const _id = req.params._id;
            console.log(_id);
            const query = { _id: ObjectId(_id) }
            const result = await cartProduct.deleteOne(query);
            res.send(result);
        })

        app.get('/orders', async (req, res) => {
            const query = {}
            const result = await cartProduct.find(query).toArray();
            res.send(result);
        })

        app.get('/users', async (req, res) => {
            const query = {}
            const result = await usersCollection.find(query).toArray()
            res.send(result);
        })


        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await usersCollection.insertOne(user);
            res.send(result);
        })

        app.get('/customerDetails', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const result = await cartProduct.find(query).toArray();
            res.send(result);
        })


        app.get('/customer/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email }
            console.log(email);
            const result = await usersCollection.findOne(query);
            res.send(result);

        })

        app.put('/updateCart', async (req, res) => {
            const email = req.query.email;
            const _id = req.query._id;
            const quantity = req.body.quantity;
            console.log(quantity);

            const filter = {
                email: email,
                _id: ObjectId(_id)
            }

            const options = { upsert: true };

            const updatedDoc = {
                $set: {
                    quantity: quantity
                }
            }

            const result = await cartProduct.updateOne(filter, updatedDoc, options);
            res.send(result);
        })













    }


    finally {

    }



}
run().catch(error => console.log(error));



app.get('/', (req, res) => {
    res.send('hello buddy i am your server ');
})



app.listen(port, () => {
    console.log(`server running on port ${port}`);
})