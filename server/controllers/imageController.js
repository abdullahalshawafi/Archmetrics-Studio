const path = require('path');
const fs = require('fs-extra');
const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  keyFilename: path.join(
    __dirname,
    '../warm-sunlight-331910-45e7ded0be86.json',
  ),
  projectId: 'warm-sunlight-331910',
});

module.exports = {
  uploadToGCP: (FileName) => {
    const bucket = storage.bucket('archmetrics');
    const localReadStream = fs.createReadStream(`temp/${FileName}`);
    const remoteWriteStream = bucket.file(FileName).createWriteStream();
    localReadStream
      .pipe(remoteWriteStream)
      .on('error', (err) => {
        console.log(err);
      })
      .on('finish', () => {
        fs.removeSync(path.join(__dirname, `../temp/${FileName}`));
        console.log('Done Uploading');
      });
  },

  uploadToTemp: (req, res) => {
    const uploadDate = new Date().toISOString().replace(/:/g, '-');
    const image = uploadDate + ' ' + req.files.image.name;
    const targetPath = path.join(__dirname, `../temp/${image}`);
    fs.outputFileSync(targetPath, req.files.image.data);
    res.json(image);
  },

  deleteFile: async (image) => {
    try {
      const name = image.replace(process.env.CLOUD_STORAGE_PATH, '');
      await storage.bucket('archmetrics').file(name).delete();
      console.log(`gs://archmetrics/${name} deleted.`);
    } catch (error) {
      console.log(error.message);
    }
  },
};
