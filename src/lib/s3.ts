import * as AWS from 'aws-sdk';
import { config } from '../config';

const s3 = new AWS.S3({
  accessKeyId: config.aws.accessKeyId,
  params: {
    Bucket: config.aws.bucket,
  },
  region: 'eu-central-1',
  secretAccessKey: config.aws.secretAccessKey,
  signatureVersion: 's3v4',
});

export default s3;
