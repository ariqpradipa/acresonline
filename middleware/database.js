import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const uri = process.env.MONGODB_URI;
const options = {

    useNewUrlParser: true,
    useUnifiedTopology: true,

};

if (!process.env.MONGODB_URI) {

    throw new Error('database url in .env.local not found!');

}

const client = new MongoClient(uri, options);

async function database(req, res, next) {

    if (!client.isConnected()) await client.connect();
    req.dbClient = client;
    req.db = client.db('MCT');
    return next();
    
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;