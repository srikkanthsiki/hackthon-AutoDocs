const  createReport = require('docx-templates').default
const {docContants,OpenDBinfo} = require('../util/constants')
const _ = require('lodash')
var AWS = require('aws-sdk');

/*
template: 'C:/work/hackaton/eagle-appdocs-backend/input/test1.docx',
        output: 'C:/work/hackaton/eagle-appdocs-backend/output/test1_output.docx',
        data: {
         film:{ name: 'muthu',
          surname: 'Appleseed',
        }
        },
          output: tpath.OutputFile,
*/
function  upsertdataandgeneratereport(req,tpath, dataObj) {
    console.log(tpath)
    const buffer =  createReport({
        template: tpath.inputFile,
        output:  tpath.OutputFile,
        data: dataObj[0]
      });
      
      console.log('buffer',buffer)
      req.output.push(tpath.OutputFile)
    // uploadtos3(tpath.OutputFile)
    
  }

  /*
  this code is used to get the correct path from configuration
  */
  function getTemplatefromMap(templatesList){
    return _.map(templatesList,function(i){
        let doc=i
        let template={}
        template.ref=doc,
        template.inputFile=docContants.TemplatePath+_.get(docContants,doc)
        template.OutputFile=docContants.OutputPath+_.get(docContants,doc)
        return template
    })
  }

  function getdatafromOpenDB(uk){
     let uniqueKey=_.get(uk,'uniqueKey','')
      let uniqueValue=_.get(uk,'uniqueValue','')
      const obj =[uniqueKey,uniqueValue]
    return _.filter(OpenDBinfo,obj)  
  }

  /*

  */

  function  mapTemplate(req, res, next) {
      req.output=[]
   req.templatesList = req.body.templates
   req.templatemap = getTemplatefromMap(req.templatesList)
   console.log('templatemap',req.templatemap)
   const dataObj = getdatafromOpenDB(req.body)
   console.log('dataObj',dataObj)
   if(dataObj.length ==0){
      throw new Error("no valid records for given loan number");
       //next(error)
   }
   let a = req.templatemap.map(function(i){
    upsertdataandgeneratereport(req,i,dataObj)
   
  
   })
   console.log(a)
 
   next()
  }
  
  
  function uploadtos3(req, res, next){
      
      // Load the AWS SDK for Node.js

// Set the region 
AWS.config.update({region: 'us-east-2'});

// Create S3 service object
let s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Call S3 to list the buckets
var bucketParams = {
  Bucket : 'lending-transformers',
  ACL : 'public-read'
};

// call S3 to create the bucket
// call S3 to retrieve upload file to specified bucket
var uploadParams = {Bucket: 'lending-transformers', Key: '', Body: '',ACL:'public-read'};
console.log(req)
req.s3link=[]
for(let i in req.output){
    let file = req.output[i]

console.log(file)

// Configure the file stream and obtain the upload parameters
var fs = require('fs');
var fileStream = fs.createReadStream(file);
fileStream.on('error', function(err) {
  console.log('File Error', err);
});
uploadParams.Body = fileStream;
var path = require('path');
uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
s3.upload (uploadParams, function (err, data) {
  if (err) {
    console.log("Error", err);
  } if (data) {
      req.s3link.push(data.Location)
    console.log("Upload Success", data.Location);
  }
});

}
next()
  }
  
  function  posttosend(req, res, next) {
  req.body= {
	"UUID":1,
	"templates":["doc1","doc2"],
	"uniqueKey":"Loannumber",
	"uniqueValue":"500532"
   }
   next()
  }


  module.exports = {
    mapTemplate:mapTemplate,
    posttosend:posttosend,
    uploadtos3:uploadtos3
  }