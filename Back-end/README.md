## structure


main app runs from server.js 

cloundinary -> cloudinary config file
config      -> db config file with script connect to db
controllers ->server logic 
certificates ->temp folder to hold certificates 
db           ->db fuctions get and send info from and to db
helpers      ->helper functions misc
middleware   ->
routes
services?
video        ->for video calls

## installed modules
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
```json
{
   "@hapi/joi": "^15.0.3",
    "bcrypt": "^5.0.0",
    "cloudinary": "^1.29.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "dotenv": "^8.2.0",
    "express": "^4.17.3",
    "file-system": "^1.2.2",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.29.2",
    "multer": "^1.4.4",
    "nodemailer": "^6.4.17",
    "nodemon": "^2.0.15",
    "pg": "^8.5.1",
    "pino": "^7.9.1",
    "socket.io": "^4.0.0"
}
```
## routes
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
