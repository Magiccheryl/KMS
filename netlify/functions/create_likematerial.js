// Goal: Provide a function to like a material by clicking the heart icon


let firebase = require('./firebase')

exports.handler = async function(event) {
  // get the querystring parameters and store in memory
  let materialId = event.queryStringParameters.courseId
  let userId = event.queryStringParameters.userId
    
  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // read the likecourses collection
  let likeQuery =await db.collection(`likematerials`).where(`materialId`,`==`,materialId).where(`userId`,`==`,userId).get()
  let likes = likeQuery.docs
  
  // check if the course has been liked
  if (likes.length == 0){

    // record the user who likes the course
    await db.collection('likematerials').add({
      courseId: courseId,
      userId: userId 
    })
  
    
  } else {
    // delete the like
    // get the like id
    likeId = likes[0].id
    
    // delete the like in database
    await db.collection('likematerials').doc(likeId).delete()
    
  }

 
  return {
    statusCode: 200,
 }
}