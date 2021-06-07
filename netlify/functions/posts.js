// Goal: Provide a function to return all materials and their comments from Firebase.

// allows us to use firebase
let firebase = require(`./firebase`)

// /.netlify/functions/posts
exports.handler = async function(event) {
  // define an empty Array to hold the return value from our lambda
  let returnValue = []

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // perform a query against firestore for all posts, wait for it to return, store in memory
  let postsQuery = await db.collection(`courses`).orderBy(`created`, `desc`).get()

  // retrieve the documents from the query
  let posts = postsQuery.docs

  // loop through the post documents
  for (let postIndex=0; postIndex < posts.length; postIndex++) {
    // get the id from the document
    let postId = posts[postIndex].id

    // get the data from the document
    let postData = posts[postIndex].data()

    // perform a query to get the number of likes for this post
    let materialQuery = await db.collection(`materials`).where(`courseId`, `==`, postId).get()

    // the number of likes is the number of documents returned
    let materialSummary = materialQuery.summary
    let materialAttachment = materialQuery.attachment

    // create an Object to be added to the return value of our lambda
    let courseObject = {
      id: postId,
      code: postData.code,
      name: postData.name,
      quarter: postData.quarter,
      summary: materialSummary,
      attachment: materialAttachment,
      takeaways: []      
    }
    let takeawaysQuery = await db.collection(`takeaways`).where(`courseId`, `==`, postId).get()

    let takeaways = takeawaysQuery.docs

    for (let takeawaysIndex=0; takeawaysIndex < takeaways.length; takeawaysIndex++) {
      // get the id from the comment document
      let takeawayId = takeaways[takeawaysIndex].userId

      // get the data from the comment document
      let takeawayData = takeaways[takeawaysIndex].data()

      // create an Object to be added to the comments Array of the post
      let takeawaysObject = {
        id: takeawayId,
        body: takeawaytData.body,
      
      }

      // add the Object to the post
      courseObject.takeaways.push(takeawaysObject)
      }

    // add the Object to the return value
    returnValue.push(cousrseObject)
  }

  
   

  // return value of our lambda
  return {
    statusCode: 200,
    body: JSON.stringify(returnValue)
  }
}
