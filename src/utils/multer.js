const multer = require('multer');
const multerGoogleCloudStorage = require('multer-google-storage');


const uploadGCS = multer({
  storage: multerGoogleCloudStorage.storageEngine({
    autoRetry: true,
    bucket: 'paep22-files',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: 'proud-plane-349115',
    filename: (req, file, cb) => {
      cb(null, `polizas/${Date.now()}_${file.originalname}`);
    },
    acl: 'publicRead'
  })
});

module.exports = uploadGCS;