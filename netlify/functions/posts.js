// Goal: Provide a function to return all materials and their course from Firebase.

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/posts
exports.handler = async function(event) {


  // define an empty Array to hold the return value from our lambda
  let returnValue = []

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query against firestore for all posts, wait for it to return, store in memory
  let postsQuery = await db.collection(`courses`).get()
 
  // retrieve the documents from the query
  let posts = postsQuery.docs

  console.log(posts)
  // loop through the post documents
  for (let postIndex=0; postIndex < posts.length; postIndex++) {
    // get the id from the document
    let postId = posts[postIndex].id

    // get the data from the document
    let postData = posts[postIndex].data()

    
    // create an Object to be added to the return value of our lambda
    let courseObject = {
      id: postId,
      code: postData.code,
      name: postData.name,
      quarter: postData.quarter,
      materials: [],
      takeaways: []      
    }

    // perform a query to get the number of likes for this post
    let materialQuery = await db.collection(`materials`).where(`courseId`, `==`, postId).get()

    // the number of likes is the number of documents returned
    let materialInput = materialQuery.docs

    for (let materialIndex=0; materialIndex < materialInput.length; materialIndex++) {
      //get the data from the materials document

      let materialData = materialInput[materialIndex].data()

      // create an objett to be added to the materials array of the post
      let materialsObject = {
        summary: materialData.summary,
        attachment: materialData.attachment

      }

      //add the Object to the post
      courseObject.materials.push(materialsObject)

    }

    //add the Object tothe retrun value
    returnValue.push(courseObject)



    let takeawaysQuery = await db.collection(`takeaways`).where(`courseId`, `==`, postId).get()

    let takeaways = takeawaysQuery.docs

    for (let takeawaysIndex=0; takeawaysIndex < takeaways.length; takeawaysIndex++) {
      // get the id from the takeaway document
      let takeawayId = takeaways[takeawaysIndex].id

      // get the data from the takeaway document
      let takeawayData = takeaways[takeawaysIndex].data()

      // create an Object to be added to the takeaway Array of the post
      let takeawaysObject = {
        id: takeawayId,
        body: takeawaytData.body
      
      }

      // add the Object to the post
      courseObject.takeaways.push(takeawaysObject)
      }

    // add the Object to the return value
    returnValue.push(courseObject)
  }

  
   

  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}
