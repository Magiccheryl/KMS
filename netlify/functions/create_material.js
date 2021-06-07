// Goal: Provide a function to store a new learning material in Firebase
// Fields in a Learning material: Title, Type (case, reading), Course id and name, Subject, Summary, Attachment


let firebase = require('./firebase')

exports.handler = async function(event) {
  // get the querystring parameters and store in memory
  let title = event.queryStringParameters.title
  let courseId = event.queryStringParameters.courseId
  let summary = event.queryStringParameters.summary
  let attachment = event.queryStringParameters.attachment
  let userId = event.queryStringParameters.userId
  let courseName = event.queryStringParameters.courseName
  
  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new material, wait for it to return
  await db.collection('materials').add({
    title: title,
    courseId: courseId,
    courseName: courseName,
    summary: summary,
    attachment: attachment,
    userId: userId
 })
  
  return {
    statusCode: 200,
 }
}