const express = require("express");
const cors = require('cors');
const app = express();
const port = 5001;

const connectToDb = require('./DB/db');
connectToDb();

app.use(express.json({
  limit: '1000gb'
}));
app.use(cors());
app.use('/api/upload', require('./router/upload'))
 
app.listen(port, () => {
  console.log(`backend run on ${port}`);
});