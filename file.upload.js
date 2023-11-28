// const cloudinary = require("cloudinary").v2;
// require("dotenv").config();
// const projectId = process.env.PROJECT_ID;
// const bucketName = process.env.BUCKET_NAME;

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     secure: true,
// });
// const imagePath = "./screenshot.png";
// // Uploads an image file
// const options = {
//     use_filename: false,
//     unique_filename: true,
//     overwrite: true,
// };


// async function imageUpload(imagePath, options){
//     try{
//         const result = await cloudinary.uploader.upload(imagePath, options);
//         console.log("Processing...")
//         console.log("Upload successful", result.url);
//         return (result);
//     }
//     catch(err){
//         console.log('Upload failed, an error occoured!', err)
//     }
    
// }
// imageUpload(imagePath, options);



