# hackthon-AutoDocs

#### Navigate to backend folder ..
#### do npm install
#### do npm run start

call the below curl

````
curl -X POST \
  http://localhost:3002/autodocs \
  -d '{
	"UUID":1,
	"templates":["doc1","doc2"],
	"uniqueKey":"Loannumber",
	"uniqueValue":"500532"
}'

````

#### check files in template folder (eg:cre_commitment_letter)

#### check files in output folder (eg:CRE_commitment_letter)

#### check util constants for local path : please update your local path accordingly before running code
```
util\constants.js
```


