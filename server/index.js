const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require('cors');
const morgan = require('morgan');
const PORT = process.env.port || 8000;

//connecticg to db

connectDB();

//middleware

app.use(express.json({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

//Routes

app.use('/file-uploader', require('./routes/posts'));

app.listen(PORT, () => {
   console.log(`Server running at port: ${PORT}`);
});
