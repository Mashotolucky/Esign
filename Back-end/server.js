const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http= require('http');
const path = require('path');
const BodyParser =require('body-parser');
const { log } = require('console');

const server = http.createServer(app);


const app = express();
const server = http.createServer(app);
const Port=process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.status(200).send("hello word");
});


server.on('error', (err) => {
  console.log('ERROR', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception', err)
  throw err
})

process.on('unhandledRejection', (err) => {
  console.error('unhandled rejection', err)
})

// 5 second request timeout
server.setTimeout(20000, (socket) => {
  console.log('ERROR', 'The request timed out');
  socket.destroy();
});

server.listen(Port,()=>{
  console.log(`server running on localhost Port:${Port}`);
})