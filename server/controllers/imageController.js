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
      //let imageurl = 'https://storage.googleapis.com/archmetrics/'+FileName
      // The file upload is complete.
  });
}


module.exports.uploadtoTemp=(req,res)=>{
  String.prototype.replaceAll = function(match, replace) {
    return this.replace(new RegExp(match, 'g'), () => replace);
  }
  let uploadDate = new Date().toISOString();   
  uploadDate = uploadDate.replaceAll(':', '-');
  const image = uploadDate + req.files.image.name;
  target_path = path.join(__dirname,'..','..','photos',image)
  fs.writeFile(target_path,req.files.image.data ,function(err) {
      if (err) throw err;
  });
  res.json(image);
}
