const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECURITY_KEY}@cluster0.ukuxru5.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const appointmentCollection = client.db("doctorsPortal").collection("appointmentList");
        

        app.get('/appointmentOptions', async(req, res) => {
            const query = {};
            const options = await appointmentCollection.find(query).toArray();
            res.send(options)
        })
    }
    finally{

    }

}
run().catch(console.log)


app.get('/', async(req, res) => {
    res.send('Doctors portal server running')
});

app.listen(port, () => {
    console.log(`Doctors portal running on ${port}`)
})