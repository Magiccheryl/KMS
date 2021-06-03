// Goal: Provide a function to create a new course in Firebase 
// Fields in a Course: Code (KIEI 451), Quarter (2021 Spring), Name (Introduction to Software Development), user id, number of likes


let firebase = require('./firebase')

exports.handler = async function(event) {
  // get the querystring parameters and store in memory
  let code = event.queryStringParameters.courseCode
  let quarter = event.queryStringParameters.courseQuarter
  let name = event.queryStringParameters.courseName
  let userId = event.queryStringParameters.userId
  
  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // create a new course, wait for it to return
  await db.collection('courses').add({
    code: code,
    quarter: quarter,
    name: name,
    userId: userId,
    
 })
  
  return {
    statusCode: 200,
 }
}