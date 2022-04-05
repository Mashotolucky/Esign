const multer  = require('multer')

const uploader=(dest)=>{
    const upload = multer({ dest: `${dest}/` })
    return upload.single(dest)
}

module.exports={uploader}

