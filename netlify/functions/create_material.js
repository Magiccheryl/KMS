// Goal: Provide a function to store a new learning material in Firebase
// Fields in a Learning material: Title, Type (case, reading), Course id and name, Subject, Summary, Attachment


let firebase = require('./firebase')

exports.handler = async function(event) {
  // get the querystring parameters and store in memory
  let title = event.queryStringParameters.title
  let type = event.queryStringParameters.type
  let courseId = event.queryStringParameters.courseId
  let subject = event.queryStringParameters.subject
  let summary = event.queryStringParameters.summary
  let attachment = event.queryStringParameters.attachment
  let userId = event.queryStringParameters.userId
  
  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // get the course Name
  let courseQuery =await db.collection(`courses`).doc(courseId).get()
  let courseName = courseQuery.name

  // create a new material, wait for it to return
  await db.collection('materials').add({
    title: title,
    type: type,
    courseId: courseId,
    courseName: courseName,
    subject: subject,
    summary: summary,
    attachment: attachment,
    userId: userId
 })
  
  return {
    statusCode: 200,
 }
}