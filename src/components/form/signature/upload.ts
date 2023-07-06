import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3 } from './awsConfig';

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'childhoodcancersociety',
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    }
  })
}).array('upload', 1);

export default upload;