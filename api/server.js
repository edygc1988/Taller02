"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http); // Initialize Socket.io with your server

const config = require('./src/config');
const routes = require('./network/routes');
const db = require('./src/db');

db(config.DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('src'));


routes(app);


http.listen(config.PORT, () => {
    console.log(`La aplicación se encuentra arriba en http://localhost:${config.PORT}/`);
});
