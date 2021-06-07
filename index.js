// back end for Start Page and Logged-in Homepage
//standard event listener for Firebase auth
firebase.auth().onAuthStateChanged(async function(user) {
  
  if (user) {
    // Signed in
    console.log(user)
    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `<button class ="text-pink-500 text-right underline sign-out"> Sign Out </button>`
    
    //get a reference to the sign out button
    let signOutButton = document. querySelector ('.sign-out')
    
    //handle the sign out button click
    signOutButton.addEventListener(`click`, function(event) {
      //sign out of firebase authentication
      firebase.auth().signOut()
      //redirect to the home page
      document.location.href = `index.html`
       // Signed out
      console.log('signed out')
    })
  } else {
    //user is not logged-in so show login
    console.log(`Not logged in!`)
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

