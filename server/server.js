//Librarie
const path = require('path');
const express = require('express');

//Init Server
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;

//Middleware
app.use(express.static(publicPath));

app.listen(3000, () => console.log(`Listening on port ${port}`));


