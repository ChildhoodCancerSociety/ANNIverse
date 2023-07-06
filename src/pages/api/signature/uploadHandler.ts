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

  export default function uploadHandler(req, res) {
    if (req.method === 'POST') {
      
      upload(req, res, function (error) {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: 'File upload failed' });
        }
        console.log('File uploaded successfully.');
      });

      const { body } = req;
    
      console.log('BODY ->', body)
      res.status(200).json({ message: 'POST request successful' });

    } else {
      // Return an error response for other HTTP methods
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  