// back end for course page
firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
        
        console.log(user)


        // Build the URL for our posts API
        let url = `/.netlify/functions/posts`

        // Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)

        // Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()

        // Write the json-formatted data to the console in Chrome
        console.log(json)
        
        let courseId = ""

        // Loop through the JSON data, for each Object representing a post:
        for (let i=0; i < json.length; i++) {
          // Store each object ("post") in memory
          let courseObject = json[i]
          let takeawayDiv = document.querySelector(`.show-takeaway`) 
          takeawayDiv.insertAdjacentHTML(`beforeend`, `
            <div class="md:mt-16 mt-8">
            <div class="md:mx-0 mx-4 mt-8">
              <span class="font-bold text-xl"> ${courseObject.takeaways}</span>
            </div>
            `)
            courseId = courseObject.id
            
        }

        //get a reference to the create takeaways button
        let createtakeawayButton = document. querySelector(`.takeaways`)
    
        //handle the sign out button click
        createtakeawayButton.addEventListener(`click`, async function(event) {
          //ignore the default behavior
          event.preventDefault()
          //get a reference to the newly created takeaway input
          let takeawayInput = document.querySelector(`#write-Takeaways`)

          //get the body of the takeaways
          let takeawayBody = takeawayInput.value

          //create the URL for our "create takeaway post" lambda function
          let url = `/.netlify/functions/write_takeaways?body=${takeawayBody}&courseId=${courseId}&userId=${user.uid}`

          let response = await fetch(url)

          // location.reload()

        })
        
         
        
          // Loop through the post's comments
        for (let j=0; j < json.length; j++) {
          //get a reference to the material
            let material = json[j]
            let materialDiv = document.querySelector(`.show-learningmaterial`)
            materialDiv.insertAdjacentHTML (`beforeend`, `
            <div class="md:ml-16 mt-8 md:mr-16 mx-auto p-4 bg-white space-x-4 space-y-4">
            <div class="font-bold"> Course: ${material.name} </div>
            <div> Quarter: ${material.quarter} </div>
            <div> ${material.materials[0]} </div>`)

      
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