const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
const options = {

    useNewUrlParser: true,
    useUnifiedTopology: true,

};

if (!process.env.MONGODB_URI) {

    throw new Error('database url in .env.local not found!');

}

mongoose.connect(uri, options);

const db = mongoose.connection;

export default db;
