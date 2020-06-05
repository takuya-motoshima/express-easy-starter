import fs from 'fs';
import aws from 'aws-sdk';
import Media from './Media';
import File from './File';

export default class {

  constructor() {
    this.client = new aws.Rekognition({
      region: process.env.AWS_REKOGNITION_REGION,
      accessKeyId: process.env.AWS_REKOGNITION_ACCESS_KEY,
      secretAccessKey: process.env.AWS_REKOGNITION_SECRET_KEY
    });
  }

  /**
   * @example
   * 
   * import RekognitionClient from '~/shared/RekognitionClient';
   * import fs from 'fs';
   * 
   * const client = new RekognitionClient();
   * 
   * await client.detectionFaces('/upload/image.png');
   * await client.detectionFaces('data:image/png;base64,/9j/4AAQ...');
   * await client.detectionFaces(fs.readFileSync('/upload/image.png'));
   * 
   * @param  {string} faceImage Image file path, base 64 character string, or BLOB
   * @param  {number} threshold
   * @return {Promise<Object>}
   */
  async detectionFaces(faceImage, threshold = 90) {
    if (/^data:image\//.test(faceImage)) {
      faceImage = this.base64ToBlob(faceImage);
    } else if (File.isFile(faceImage)) {
      faceImage = fs.readFileSync(faceImage);
    }
    const data = await new Promise((resolve, reject) => {
      this.client.detectFaces({
        Image: { Bytes: faceImage },
        Attributes: [ 'ALL' ]
      }, (error, data) => error ? reject(error) : resolve(data));
    });
    if (!data.FaceDetails) {
      return [];
    }
    const results = [];
    for (let faceDetail of data.FaceDetails) {
      if (faceDetail.Confidence >= threshold) {
        results.push({ BoundingBox: faceDetail.BoundingBox });
      }
    }
    return results;
  }

  /**
   * @example
   * 
   * import RekognitionClient from '~/shared/RekognitionClient';
   * import fs from 'fs';
   * 
   * const client = new RekognitionClient();
   * 
   * await client.compareFaces('/upload/image1.png', '/upload/image2.png');
   * await client.compareFaces('data:image/png;base64,/9j/4AAQ...'. 'data:image/png;base64,/9j/4AAQ...');
   * await client.compareFaces(fs.readFileSync('/upload/image1.png'), fs.readFileSync('/upload/image1.png'));
   * 
   * @param  {string} faceImage1 Image file path, base 64 character string, or BLOB
   * @param  {string} faceImage2 Image file path, base 64 character string, or BLOB
   * @return {Promise<number>}
   */
  async compareFaces(faceImage1, faceImage2) {
    if (/^data:image\//.test(faceImage1)) {
      faceImage1 = this.base64ToBlob(faceImage1);
      faceImage2 = this.base64ToBlob(faceImage2);
    } else if (File.isFile(faceImage1)) {
      faceImage1 = fs.readFileSync(faceImage1);
      faceImage2 = fs.readFileSync(faceImage2);
    }
    const data = await new Promise((resolve, reject) => {
      this.client.compareFaces({
        SourceImage: { Bytes: faceImage1 },
        TargetImage: { Bytes: faceImage2 },
        SimilarityThreshold: 0
      }, (error, data) => error ? reject(error) : resolve(data));
    });
    let similarity = .0;
    if (data.FaceMatches.length > 0) {
      similarity = Math.round(data.FaceMatches[0].Similarity * 10) /10;
    }
    return similarity;
  }

  async addCollection(collectionId) {
    const data = await new Promise((resolve, reject) => {
      this.client.createCollection({ CollectionId: collectionId }, (error, data) => error ? reject(error) : resolve(data));
    });
    console.log('data=', data.collectionId);
  }

  async getCollections() {
    const data = await new Promise((resolve, reject) => {
      this.client.listCollections({}, (error, data) => error ? reject(error) : resolve(data));
    });
    if (!data.CollectionIds || !data.CollectionIds.length) return [];
    return data.CollectionIds.map((collectionId, i) => ({ id: collectionId, faceModelVersion: data.FaceModelVersions[i] }));
  }

  async deleteCollection(collectionId) {
    await new Promise((resolve, reject) => {
      this.client.deleteCollection({ CollectionId: collectionId }, (error, data) => error ? reject(error) : resolve(data));
    });
  }

  base64ToBlob(base64) {
    const tmp = File.getTmpPath('.png');
    Media.writeBase64ToImage(tmp, base64);
    return fs.readFileSync(tmp);
  }
}