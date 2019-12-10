const  createReport = require('docx-templates').default
const {docContants,OpenDBinfo} = require('../util/constants')
const _ = require('lodash')


/*
template: 'C:/work/hackaton/eagle-appdocs-backend/input/test1.docx',
        output: 'C:/work/hackaton/eagle-appdocs-backend/output/test1_output.docx',
        data: {
         film:{ name: 'muthu',
          surname: 'Appleseed',
        }
        },
*/
function  upsertdata(tpath, dataObj) {
    console.log(tpath)
    const buffer =  createReport({
        template: tpath.inputFile,
        output: tpath.OutputFile,
        data: dataObj[0]
      });

      console.log('buffer',buffer)

    
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
      uniqueKey=_.get(uk,'uniqueKey','')
      uniqueValue=_.get(uk,'uniqueValue','')
      const obj =[uniqueKey,uniqueValue]
    return _.filter(OpenDBinfo,obj)  
  }

  /*

  */

  function  mapTemplate(req, res, next) {
   const templatesList = req.body.templates
   const templatemap = getTemplatefromMap(templatesList)
   console.log('templatemap',templatemap)
   const dataObj = getdatafromOpenDB(req.body)
   console.log('dataObj',dataObj)
   if(dataObj.length ==0){
      throw new Error("no valid records for given loan number");
       //next(error)
   }
   let a = templatemap.map(function(i){
    upsertdata(i,dataObj)
   
  
   })
   console.log(a)
   next()
  }


  module.exports = {
    mapTemplate:mapTemplate
  }