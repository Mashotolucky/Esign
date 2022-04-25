const express = require('express');
const app = express();
const cors = require('cors');
let server = require( 'http' ).Server( app );
let io = require( 'socket.io' )( server );
let stream = require( './video/stream' );
const rateLimit = require('express-rate-limit');
const { cloudinary } = require('./cloudinary/cloudinary');
const helmet = require('helmet');

if(process.env.NODE_ENV=="dev" ){ 
    const morgan =require('morgan');
    app.use(morgan("dev"))
}
const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 100, // Limit each IP to 10 requests per `window` (here, per 2 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const options={
  origin:'*'
}
const Port=process.env.PORT || 4314;
const esign_routes = require('./routes');

app.use(helmet());
app.use(cors(options));
// remember to Apply the rate limiting middleware to all requests
app.use(limiter);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

//test route
app.get('/api/v1/test',(req,res)=>{
    res.status(200).send({msg:"hello word"});
});

//handle all app routes
app.use("/api/v1/",esign_routes);

//404 resource not found
app.use((req,res)=>{
  const error=new Error(`Resource not found`);
  error.status=404;
  res.status(error.status).json(error.message);
});

//handle all errors 
app.use((err,req,res,next)=>{
    res.status(err.status||500).send({
    message: `${err.message}` || "Oops something went wrong",
    timestamp: Date.now(),
    origin: req.originalurl
    })
})


server.listen(Port,"0.0.0.0",()=>{
  console.log(`server running on localhost Port:${Port}`);
})

process.on( 'uncaughtException', err => {
  console.log(`Uncaught Exception: ${err.message}` )
  
  server.close(() => {
    process.exit(1)
  })
 // If server hasn't finished in 1000ms, let's shutdown process
  setTimeout( () => {
    process.exit(1)
  }, 1000).unref() // Don't register timeout on event loop
 
})
process.on( 'unhandledRejection', (reason, promise) => {
  console.log( 'Unhandled rejection at', promise,`  reason:${reason}` )
  server.close(() => {
    process.exit(1)
  })
 // If server hasn't finished in 1000ms, let's shutdown process
  setTimeout( () => {
    process.exit(1)
  }, 1000).unref() // Don't register timeout on event loop

})
