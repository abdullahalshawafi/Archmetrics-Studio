const fs = require('fs');
const { Storage } = require("@google-cloud/storage");
const path = require('path');

const storage = new Storage({
  keyFilename: path.join(__dirname, "./warm-sunlight-331910-45e7ded0be86.json"),
  projectId: 'warm-sunlight-331910'
});

module.exports = {
  UploadToGCP: (FileName) => {
    const bucket = storage.bucket('archmetrics');
    const localReadStream = fs.createReadStream(`temp/${FileName}`);
    const remoteWriteStream = bucket.file(FileName).createWriteStream();
    localReadStream.pipe(remoteWriteStream)
      .on('error', (err) => { console.log(err) })
      .on('finish', () => {
        console.log("Done Uploading")
        //let imageurl = 'https://storage.googleapis.com/archmetrics/'+FileName
        // The file upload is complete.
      });
  },
  uploadToTemp: (req, res) => {
    const uploadDate = new Date().toISOString().replace(/:/g, '-');
    const image = uploadDate + req.files.image.name;
    const targetPath = path.join(__dirname, '..', 'temp', image)
    fs.writeFile(targetPath, req.files.image.data, (err) => {
      if (err) throw err;
      res.json(image);
    });
  }
}
