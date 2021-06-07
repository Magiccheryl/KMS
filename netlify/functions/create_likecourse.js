// Goal: Provide a function to like a course by clicking the heart icon


let firebase = require('./firebase')

exports.handler = async function(event) {
  // get the querystring parameters and store in memory
  let courseId = event.queryStringParameters.courseId
  let userId = event.queryStringParameters.userId
    
  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // read the likecourses collection
  let likeQuery =await db.collection(`likecourses`).where(`courseId`,`==`,courseId).where(`userId`,`==`,userId).get()
  let likes = likeQuery.docs
  
  // check if the course has been liked
  if (likes.length == 0){

    // record the user who likes the course
    await db.collection('likecourses').add({
      courseId: courseId,
      userId: userId 
    })
   
    // add 1 to numOfLikes
    await db.collection('courses').doc(courseId).update({
      like: 1
    })
    
  } else {
    // delete the like
    // get the like id
    likeId = likes[0].id
    
    // delete the like in database
    await db.collection('likecourses').doc(likeId).delete()
    
    // add 1 to numOfLikes
    await db.collection('courses').doc(courseId).update({
      like: 0
    })

  }

 
  return {
    statusCode: 200,
 }
}