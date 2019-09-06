const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  })
});

mongoose
  .connect("mongodb+srv://rocketbox:O3x1irrnIkxCpdhr@cluster0-jxsc8.mongodb.net/rocketbox?retryWrites=true&w=majority",
    { useNewUrlParser: true, }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use((req, res, next) => {
  req.io = io;
  return next;
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);
