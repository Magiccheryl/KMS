// Goal: Provide a function to search a learning material by key words in a specified category
// Return an array of learning material ID


let firebase = require('./firebase')

exports.handler = async function(event) {
  // get the querystring parameters and store in memory
  let keyWord = event.queryStringParameters.keyWord.toUpperCase()
  let category = event.queryStringParameters.category
  
  // establish a connection to firebase in memory
  let db = firebase.firestore()
  let searchQuery =await db.collection(`materials`).get()
  let materials = searchQuery.docs

  // create a blank array
  let returnValue = []
    
  // search through all learning materials
  for (let i=0; i<materials.length; i++){
  
    // get reference to the material
    material = materials[0]

    // Check the category
    if (category == `title`) {
        // search the key word in title of the learning material and add to the array if the key word is included
        if (material.title.toUpperCase().include(keyWord)){
          returnValue.push(material.id)
        }
      } else if (category == `summary`){
        // search the key word in summary of the learning material and add to the array if the key word is included
        if (material.summary.toUpperCase().include(keyWord)){
          returnValue.push(material.id)
        }
      } else if (category == `comment`){
        // get connection to the comments collection
        let commentQuery =await db.collection(`comments`).where(`materialId`,`==`,material.id).get()
        let comments = commentQuery.docs

        // search through comments to see if the key word is included
        for (let j=0; j<comment.length; j++){
          // check if the key word is included in the comments
          if (comments[j].body.toUpperCase().include(keyWord)){
            returnValue.push(material.id)
          }
        }
      } 
  }
  

 
   return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}