// back end for course page
firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
      
        //get a reference to the create takeaways button
        let createtakeawayButton = document. querySelector ('.takeaways')
    
        //handle the sign out button click
        createtakeawayButton.addEventListener(`click`, function(event) {
        
        //redirect to the write page
        document.location.href = `write.html`
        })
        
        
        // Build the URL for our material API
        let url = `/.netlify/functions/create_material`
      
        // Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
      
        // Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.data()
      
        // Write the json-formatted data to the console in Chrome
        console.log(json)
        // Grab a reference to the element with class name "material" in memory
        

        // Loop through the JSON data, for each Object representing a post:
        for (let i=0; i < json.length; i++) {
          // Store each object ("post") in memory
          let post = json[i]
          let takeawayDiv = document.querySelector(`.show-takeaway`) 
          takeawayDiv.insertAdjacentHTML(`beforeend`, `
            <div class="md:mt-16 mt-8">
            <div class="md:mx-0 mx-4 mt-8">
              <span class="font-bold text-xl"> ${post.summary}</span>
            </div>
            `)
        }
 
        
          // Loop through the post's comments
        for (let j=0; j < json.length; j++) {
          
            let material = json[j]
            
            let materialDiv = document.querySelector(`.show-learningmaterial`)
            materialDiv.insertAdjacentHTML (`beforeend`, `
            <h1 class="font-bold"> Case </h1>
            <p >Summary: ${material.summary} </p>`)

      
          }


        //Need to add comments and create comments funciton

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