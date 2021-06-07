// back end for Start Page and Logged-in Homepage

firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log('signed in')

      // Get a reference to the "Star Course" button
      let starCourseButton = document.querySelector(`.star-course`)

      // Event listener for the "Star Course" button
      changeImageButton.addEventListener(`click`, async function(event) {
        // Get a reference to the image
        let image = document.querySelector(`img`)
      
        // Change the image
        image.setAttribute(`src`, `star-yellow.jpg`)
      })


    } else {
      // Signed out
      console.log('signed out')
  
      // Initializes FirebaseUI Auth
      let ui = new firebaseui.auth.AuthUI(firebase.auth())
  
      // FirebaseUI configuration
      let authUIConfig = {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: 'homepage.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }
  })
  