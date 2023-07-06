// GETTING SOME FUCKED UP `SignatureDoesNotMatch` error?
// regenerate the DO keys and retry. ask @GeorgeIpsum if this needs to be done
// Need the keys for this? Check discord
import { S3 } from "@aws-sdk/client-s3";

// import AWS from "aws-sdk";

// const spacesEndpoint = new AWS.Endpoint("nyc3.digitaloceanspaces.com");
const s3 = new S3({
  forcePathStyle: false,
  region: "us-east-1",
  endpoint: "https://nyc3.digitaloceanspaces.com",
});

export { s3 };
