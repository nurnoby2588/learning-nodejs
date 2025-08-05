require('dotenv').config();
const express = require('express');
const dbConnect = require('./db/dbConnect');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js Application');
});
dbConnect()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
