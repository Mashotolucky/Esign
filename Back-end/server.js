const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const BodyParser =require('body-parser');
const { log, error } = require('console');
const morgan =require('morgan');

const Port=process.env.PORT || 4314;

const esign_routes = require('./routes');

app.use(morgan("dev"))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/api/v1/test',(req,res)=>{
    res.status(200).send({msg:"hello word"});
});
const handle_errors=fn=>(req,res,next)=>Promise.resolve(fn(req,res,next)).catch(next);
//handle all app routes
app.use("/api/v1/",esign_routes);

//404 resource not found
app.use((req,res)=>{
    const error=new Error(`Resource not found ${req.method}:${req.originalUrl}`);
    error.status=404;
    res.status(error.status).json(error.message);
   // next(error);
  });

  //handle all errors 
app.use((err,req,res,next)=>{
 // error("error:",err);
 log("here")
  res.status(err.status||500).send({
     message: `${err.message} on ${req.method}:${req.originalUrl}` || "Oops something went wrong",
     timestamp: Date.now(),
     origin: req.originalurl
  })
})

app.listen(Port,()=>{
  console.log(`server running on localhost Port:${Port}`);
})