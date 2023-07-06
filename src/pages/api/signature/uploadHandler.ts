import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

import upload from "../../../components/form/signature/upload";

// const express = require('express');
// import express from 'express';
// const app = express();

// app.post('/upload', function (request, response, next) {
//     upload(request, response, function (error) {
//       if (error) {
//         console.log(error);
//       }
//       console.log('File uploaded successfully.');
//     });
//   });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result, file) => {
      console.log("UPLOAD MIDDLEWARE", result, file);
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function uploadHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await runMiddleware(req, res, upload.any());

    // console.log("BODY ->", body);
    res.status(200).json({ success: "true" });
    // res.status(200).json({ message: "POST request successful" });
  } else {
    // Return an error response for other HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
