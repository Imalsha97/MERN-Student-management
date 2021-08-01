const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const studentRouter  = require('./routes/students');


const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use('/students',studentRouter);

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () =>{
    console.log("mongo db connection success!");
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})