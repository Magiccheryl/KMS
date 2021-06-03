// Goal: Provide a function to write comment on a learning material in Firebase
// Fields in a Comment: Body, Time, Learning Material id

let firebase = require('./firebase')

exports.handler = async function(event) {
  // get the querystring parameters and store in memory
  let commentBody = event.queryStringParameters.body
  let materialId = event.queryStringParameters.material
  let userId = event.queryStringParameters.userId
  
  
  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new course, wait for it to return
  await db.collection('comments').add({
    body: commentBody,
    materialId: materialId,
    time: firebase.firestore.FieldValue.serverTimestamp(),
    userId: userId
 })
  
  return {
    statusCode: 200,
 }
}