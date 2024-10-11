import fs from "fs";
import S3 from "aws-sdk/clients/s3";
import { rethrow, rethrowAsync } from "./rethrow";

/**
 * @param {Object} param0
 * @returns {S3}
 */
const create = ({ region, accessKeyId, secretAccessKey, endpoint, local }) =>
  new S3({
    region,
    accessKeyId,
    secretAccessKey,
    endpoint,
    sslEnabled: !local,
    s3ForcePathStyle: local,
  });

/**
 * @param {S3} s3
 * @param {string} bucket
 * @param {string} key
 * @param {string} filePath
 * @returns {Promise<S3.ManagedUpload.SendData>}
 */
async function uploadFile(s3, bucket, key, filePath) {
  return rethrowAsync(() =>
    s3
      .upload({
        Bucket: bucket,
        Body: rethrow(() => fs.createReadStream(filePath)),
        Key: key,
      })
      .promise()
  );
}

/**
 * @param {S3} s3
 * @param {string} bucket
 * @param {string} key
 * @param {fs.ReadStream} stream
 * @returns {Promise<S3.ManagedUpload.SendData>}
 */
async function uploadStream(s3, bucket, key, stream) {
  return rethrowAsync(() =>
    s3
      .upload({
        Bucket: bucket,
        Body: stream,
        Key: key,
      })
      .promise()
  );
}

/**
 * @param {S3} s3
 * @param {string} bucket
 * @param {string} key
 * @returns {Promise<fs.ReadStream>}
 */
async function getStream(s3, bucket, key) {
  return (
    await rethrowAsync(() =>
      s3.getObject({
        Key: key,
        Bucket: bucket,
      })
    )
  ).createReadStream();
}

/**
 * @param {S3} s3
 * @param {string} bucket
 * @param {string} key
 * @param {string} filePath
 * @returns {Promise<String>}
 */
async function getFile(s3, bucket, key, filePath) {
  const buf = (
    await rethrowAsync(() =>
      s3.getObject({
        Key: key,
        Bucket: bucket,
      })
    )
  ).createReadStream();

  await rethrowAsync(() => fs.promises.writeFile(filePath, buf));
  return filePath;
}

/**
 * @param {S3} s3
 * @param {string} Bucket
 * @param {string} Key
 * @returns {Promise<any>}
 */
async function deleteObject(s3, Bucket, Key) {
  return await rethrowAsync(() =>
    s3
      .deleteObject({
        Key,
        Bucket,
      })
      .promise()
  );
}

//stackoverflow.com/a/49888947
async function getMoreKeys(s3, params, allKeys: string[] = []) {
  const response = await rethrowAsync(() => s3.listObjectsV2(params).promise());
  response.Contents.forEach((obj) => allKeys.push(obj.Key));

  if (response.NextContinuationToken) {
    params.ContinuationToken = response.NextContinuationToken;
    await getMoreKeys(s3, params, allKeys); // RECURSIVE CALL
  }
  return allKeys;
}

/**
 * @param {S3} s3
 * @param {string} Bucket
 * @returns {Promise<string[]>}
 */
async function getKeys(s3, Bucket) {
  return await getMoreKeys(s3, { Bucket });
}

export {
  create,
  uploadFile,
  uploadStream,
  getFile,
  getStream,
  deleteObject,
  getKeys,
};
