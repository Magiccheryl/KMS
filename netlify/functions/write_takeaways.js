// Goal: Provide a function to create a new takeaway on a course in Firebase
// Fields in a Takeaway: Body, Time, Course id, Course name

let firebase = require('./firebase')

exports.handler = async function(event) {
  // get the querystring parameters and store in memory
  let body = event.queryStringParameters.body
  let courseId = event.queryStringParameters.courseId
  let userId = event.queryStringParameters.userId
  
  // establish a connection to firebase in memory
  let db = firebase.firestore()

    // get the course Name
    let courseQuery =await db.collection(`courses`).doc(courseId).get()
    let course = courseQuery.data()
    let courseName = course.name

  // create a new course, wait for it to return
  await db.collection('takeaways').add({
    courseId: courseId,
    couresName: courseName,
    body: body,
    time: firebase.firestore.FieldValue.serverTimestamp(),
    userId: userId
 })
  
  return {
    statusCode: 200,
 }
}