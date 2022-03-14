const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const Port=process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.status(200).send("hello word");
});

app.listen(Port,()=>{
  console.log(`server running on localhost Port:${Port}`);
})