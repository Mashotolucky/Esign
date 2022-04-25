const { cloudinary } = require('../cloudinary/cloudinary');
const fs = require('fs');


    const fileUpload = async (file_path, dest_folder,resource_type) => {
        try {
            console.log(dest_folder);
            const uploadResponse = await cloudinary.uploader.upload(file_path, {
                folder: `${dest_folder}`,
                resource_type: `${resource_type}`
            });
            const path=file_path;
            fs.unlinkSync(path);
            //take cloudinary response and get url set cert_url to cloudinary url
            return uploadResponse.url;
        } catch (error) {
            console.log(error.message);
           throw error;
        }
    }
    module.exports = {
        fileUpload
    }