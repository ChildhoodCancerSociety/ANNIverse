import AWS from 'aws-sdk';
import { S3 } from '@aws-sdk/client-s3';

const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
const s3 = new S3({
  endpoint: spacesEndpoint
});

// const s3 = new S3({
//   accessKeyId: 'DO0087VNW4WMTCLWZBGW',
//   secretAccessKey: 'IxykgOhqx9nwZYqawl2Jza5i7a9nAZfGmAXsO5TpWmE',
//   region: 'us-east-1',
//   endpoint: spacesEndpoint
// });

export { AWS, s3 };