const multer  = require('multer')

//set destination folder
const uploader=(dest)=>{
    const upload = multer({ dest: `${dest}/` })
    return upload.single(dest)
}

module.exports={uploader}

