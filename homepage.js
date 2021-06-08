// back end for Start Page and Logged-in Homepage

firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      // Signed in
      console.log(user)

      let url = `/.netlify/functions/posts`
      
      // Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)
    
      // Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()
    
      // Write the json-formatted data to the console in Chrome
      console.log(json)


      // <search function>

      // get a refernce to the search button

      let searchButton = document.querySelector(`.get-course`)
      
      // handle the clicking of the "search" button
      searchButton.addEventListener(`click`, async function(event){
        //prevent the default behavior
        event.preventDefault()
        
         // get a reference to the input holding the image URL
        let searchInput = document.querySelector(`#keywords`)

        // store the user-inputted image URL in memory
        let searchUrl = searchInput.value

        // loop through the Json data, for each Object representing apost: 
        for (let i=0; i < json.length; i++) {
          // Store each object ("post") in memory
          let posts = json[i]
          let courseTitle = posts.name
          if (searchUrl = courseTitle) { 
          document.querySelector(`.courseName`).insertAdjacentHTML = (`beforeend`,`
            <div class="md:mt-16 mt-8">
            <div class="md:mx-0 mx-4 mt-8">
              <span class="font-bold text-xl"> ${courseTitle}</span>
            </div>
            `)}
          else {`no results`}

          }


      
        }


    )
      
    
       //<course function>

        // Grab a reference to the element with class name "course" in memory
       
        let courseDiv = document.querySelector(`.courseName`)
        
       
        // Loop through the JSON data, for each Object representing a post:
        for (let i=0; i < json.length; i++) {
          // Store each object ("post") in memory
          let posts = json[i]
          let courseTitle = posts.name
          document.querySelector(`.courseName`).insertAdjacentHTML(`beforeend`,`
            <div class="md:mt-16 mt-8">
            <div class="md:mx-0 mx-4 mt-8">
              <span class="font-bold text-xl"> ${courseTitle}</span>
            </div>
            `)}


      
      // <star function>


      // Get a reference to the "Star Course" button
      let starCourseButton = document.querySelector(`.star-course`)

      // Event listener for the "Star Course" button
      starCourseButton.addEventListener(`click`, async function(event) {

        // Get a reference to the image
        let image = document.querySelector(`#starImage`)
      
        // Change the image
        image.setAttribute(`src`, `star-yellow.jpg`)
      })


    }else {
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
  