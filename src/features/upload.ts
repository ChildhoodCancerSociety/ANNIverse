import multer from "multer";
import multerS3 from "multer-s3";

import { s3 } from "./awsConfig";

const upload = multer({
  storage: multerS3({
    s3,
    bucket: "childhoodcancersociety",
    acl: "public-read",
    key(request, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

export default upload;

// https://childhoodcancersociety.nyc3.digitaloceanspaces.com
