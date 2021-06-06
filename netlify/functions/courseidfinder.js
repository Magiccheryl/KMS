let firebase = require('./firebase')

exports.handler = async function(event) {
    //get the course name
    let courseName = event.queryStringParameters.name

    // Connect the course name with the existing course Id
    let db = firebase.firestore()
    let courseQuery =await db.collection(`courses`).where(`name`,`==`,courseName).get()
    let course = courseQuery.docs[0]
    courseId = course.id

  return {
    statusCode: 200,
    body: JSON.stringify(courseId)
  }
}