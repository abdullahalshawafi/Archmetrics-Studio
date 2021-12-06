var fs = require('fs');
const { Storage } = require("@google-cloud/storage");
const path = require('path');





const storage = new Storage({ 
    keyFilename: path.join(__dirname,"./warm-sunlight-331910-45e7ded0be86.json"), 
    projectId: 'warm-sunlight-331910'    
});

// Authenticating on a per-API-basis. You don't need to do this if you auth on a
// global basis (see Authentication section above).
  
module.exports.UploadtoGCP = (FileName) =>{
const bucket = storage.bucket('archmetrics');                
var localReadStream = fs.createReadStream(`../photos/${FileName}`);
var remoteWriteStream = bucket.file(`${FileName}`).createWriteStream();
localReadStream.pipe(remoteWriteStream)
  .on('error', function(err) {console.log(err)})
  .on('finish', function() {
      console.log("Done Uploading")
    // The file upload is complete.
  });
}

