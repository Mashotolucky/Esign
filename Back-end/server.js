const express = require('express');
const app = express();
const http= require('http');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const BodyParser =require('body-parser');
const { log, error } = require('console');

const server = http.createServer(app);
const Port=process.env.PORT || 8081;

//const esign_routes = require('./routes');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/api/v1/test',(req,res)=>{
    res.status(200).send("hello word");
});

//handle all app routes
//app.use('api/v1/esign',esign_routes);

//404 resource not found
app.use((req,res,next)=>{
    const error=new Error("resource not found");
    error.status=404;
    next(error);
  });

  //handle all errors 
app.use((err,req,res)=>{
  error("error:",err);
  res.status(err.status||500).send({"error":{
     message: err.message || "Oops something went wrong",
     timestamp: Date.now(),
     origin: req.originalurl
  }})
})

app.listen(Port,()=>{
  console.log(`server running on localhost Port:${Port}`);
})