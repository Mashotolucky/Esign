const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const BodyParser =require('body-parser');
const { log, error } = require('console');
const morgan =require('morgan');

const { cloudinary } = require('./cloudinary/cloudinary');

const Port=process.env.PORT || 4000;

const esign_routes = require('./routes');

app.use(morgan("dev"))
app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
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


//Cloudinary media //
app.get('/api/images/:url', async (req, res) => {
  const url = req.params.url
  const { resources } = await cloudinary.search
      .expression('folder:images')
      .expression(`filename:${url}`)
      .sort_by('public_id', 'desc')
      .max_results(30)
      .execute();

  const publicIds = resources.map((file) => file.url);
  res.json(publicIds);

});

app.get('/api/images',async (req, res) => {
  const { resources } = await cloudinary.search
  .expression('folder:images')
  .sort_by('public_id', 'desc')
  .max_results(30)
  .execute();
  
   
res.json(resources);
})

const multer  = require('multer')
const upload = multer({ dest: 'images/' })
app.post('/api/upload',upload.single("images"), async (req, res) => {
   const images = req.file
   console.log(images);
  try {
      const fileStr = req.file.path;
      console.log(fileStr)
      const uploadResponse = await cloudinary.uploader.upload(fileStr, {
          folder: 'images',
          resource_type: 'image'
      });
      const filepath = req.file.path;
      fs.unlinkSync(filepath);

      console.log(uploadResponse);
      
      res.json(uploadResponse.url);
      
  } catch (err) {
      console.error(err);res.json({ msg: 'uploaded' });
      res.status(500).json({ err: 'Something went wrong' });
  }
});

const uploader = multer({ dest: 'videos/' })
app.post('/api/upload/video',uploader.single("videos"), async (req, res) => {
  const videos = req.file
  console.log(videos);
 try {
     const fileStr = req.file.path;
     console.log(fileStr)
     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
         folder: 'videos',
         resource_type: 'video'
     });
     const filepath = req.file.path;
     console.log('file path:');
     console.log(filepath);
     fs.unlinkSync(filepath);

     console.log(uploadResponse);
     
     res.json(uploadResponse.url);
     
 } catch (err) {
     console.error(err);res.json({ msg: 'video uploaded' });
     res.status(500).json({ err: 'Something went wrong with the video' });
 }
});

const docUploader = multer({ dest: 'documents/' })
app.post('/api/upload/document',docUploader.single("documents"), async (req, res) => {
  const documents = req.file
  console.log(documents);
 try {
     const fileStr = req.file.path;
     console.log(fileStr)
     const uploadResponse = await cloudinary.uploader.upload(fileStr, {
         folder: 'documents',
         resource_type: 'raw'
     });
     
     const filepath = req.file.path;
     console.log('file path:');
     console.log(filepath);
     fs.unlinkSync(filepath);

     console.log(uploadResponse);
     
     res.json(uploadResponse.url);
     
 } catch (err) {
     console.error(err);res.json({ msg: 'video uploaded' });
     res.status(500).json({ err: 'Something went wrong with the video' });
 }
});
//Cloudinary ends here//

app.listen(Port,()=>{
  console.log(`server running on localhost Port:${Port}`);
})