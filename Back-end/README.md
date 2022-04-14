*structure


main app runs from server.js 

cloundinary -> cloudinary config file
config      -> db config file with script
controllers 
certificates ->temp folder to hold certificates 
db           ->db fuctions
helpers      ->helper functions misc
middleware
routes
services?
video        ->for video calls

installed modules
   "@hapi/joi": for validation
    "bcrypt": " for password encryption/hashing ,

    "cloudinary": for file upload to cloud,
    "file-system": for uploading files to server,
    "multer": for access file upload,

    "cors":  for cross plartform resourse handling,
    
    "dotenv": for environment variables,
    "express": server instance,
   
    "jsonwebtoken": for access token authorization,
    "crypto": for creating tokens,

    "nodemailer": for email,
    "pg": postgresql connection instance,
    "nodemon": development server hot reload,

    "socket.io" : for video calls


routes
```javascript
base='/api/v1';

//auth
/*
login body
   format:json
   {
      "email":string,
      "password":string
   }
*/
login= base+'/auth/login'

/*
register body
   format:json
   {
      "name":string,
      "lastname":string,
      "email":string,
      "password":string,
      "langID":number,       //can be null if role is "INTEPRETER"
      "pymentmethod":string  //can be null
   }
*/
register=base+'/auth/register/'

```
