

/*
document DOC1 and DOC2 are document reference number coming from ui

*/


const docContants = {
    "TemplatePath":'/home/ec2-user/environment/hackthon-AutoDocs/template/',
   "OutputPath":'/home/ec2-user/environment/hackthon-AutoDocs/output/',
    "doc1":'cre_commitment_letter.docx',
   "doc2":'test1.docx',
    "outDoc1":'cre_commitment_letter_out.docx',
    "outDoc2":'test1_out.docx'
}

const OpenDBinfo =
[
    {
      "Loannumber": "500532",
      "Borrower1FirstName": "John",
      "Borrower1LastName": "Doe",
      "PropType": "Condo",
      "PropAddress1": "111 Pine St",
      "PropAddress2": "Suite1800",
      "PropCity": "San Francisco",
      "PropState": "CA",
      "PropZip": "94111"
    },
    {
      "Loannumber": "500533",
      "Borrower1FirstName": "Jane",
      "Borrower1LastName": "Doe",
      "PropType": "PUD",
      "PropAddress1": "1 Front St",
      "PropAddress2": "Floor 7",
      "PropCity": "San Francisco",
      "PropState": "CA",
      "PropZip": "94111"
    },
    {
      "Loannumber": "500534",
      "Borrower1FirstName": "Andy",
      "Borrower1LastName": "America",
      "PropType": "SFR",
      "PropAddress1": "388 Market St",
      "PropAddress2": "Room 14G",
      "PropCity": "San Francisco",
      "PropState": "CA",
      "PropZip": "94111"
    }
  ]



module.exports={
    docContants,
    OpenDBinfo
}