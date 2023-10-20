const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http); // Initialize Socket.io with your server

const config = require('./config');
const routes = require('./network/routes');
const db = require('./db');

db(config.DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static('public_representante'));

routes(app);

// Emit 'nuevo_registro' event when a new record is created
app.post('/representante', (req, res) => {
    // ... your code to save the new record ...
    const newRecord = { /* Your new record data */ };
    io.emit('nuevo_registro', newRecord); // Emit the event to all connected clients
    res.json(newRecord);
});

http.listen(config.PORT, () => {
    console.log(`La aplicación se encuentra arriba en http://localhost:${config.PORT}/`);
});
