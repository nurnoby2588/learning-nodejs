require('dotenv').config();
const express = require('express');
const dbConnect = require('./db/dbConnect');
const urlRouter = require('./router/urlRouter');
const PORT = process.env.PORT || 3000;
const path = require('path');
const staticRouter = require('./router/staticRoute');
const userRouter = require('./router/userRouter');
const {restrictTo,checkForAuthentication} = require('./middleware/verifyUser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.set('view engine', 'ejs');
app.set('views', path.resolve( './view'));

app.use("/url", restrictTo(["NORMAL"]), urlRouter);
app.use('/',staticRouter)
app.use('/user',userRouter)
app.get('/', (req, res) => {
    res.send('Welcome to the Node.js Application');
});
dbConnect()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
