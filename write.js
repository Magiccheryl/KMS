// back end for Write page


firebase.auth().onAuthStateChanged(async function(user) {
    
    if (user) {
        // write the user Object to the JavaScript console
        console.log(user)

        let url = `/.netlify/functions/posts`
      
      // Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)
    
      // Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()
    
      // Write the json-formatted data to the console in Chrome
      console.log(json)

        // reference to and event listener for the creating courses button
        let courseButton = document.querySelector(`.createCourse`)
        courseButton.addEventListener(`click`, async function (event){

            // - Ignore the default behavior of the button
            event.preventDefault()

            // creating courses

            // display the form for inputing new course 
            let form = document.querySelector(`.inputForm`)
            form.insertAdjacentHTML(`beforeend`, `
            <h1 class="ml-4 text-base text-black font-bold">Create Courses</h1>
            <form action="button-submit.html" data-netlify="true">
                    <div class="md:ml-8 md:mr-8">
                        <div class="flex">
                            <div class="w-1/3">
                                <label class="block mt-4 font-bold">Add a class code</label>
                                <input class="p-2 w-64 border border-gray-400 rounded focus:outline-none focus:ring-purple-500 focus:border-purple-500" type="text" id="code">
                            </div>
                            <div class="w-1/3">
                                <label class="block mt-4 font-bold">Add quarter</label>
                                <input class="p-2 w-64 border border-gray-400 rounded focus:outline-none focus:ring-purple-500 focus:border-purple-500" type="text" id="quarter">
                            </div>
                        </div>

                        <div>
                            <label class="block mt-4 font-bold">Add course name</label>
                            <textarea rows="1" class="p-2 w-full border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500
                            focus:border-purple-500" type="name" id="name"></textarea>
                        </div>

                        <button class="p-2 w-full bg-gray-300 text-sm text-black p-2 rounded" id="submitButton">Submit!</button>

                    </div>
                </form>`)
            
            // get the reference to the submit button
            let submitButton = document.querySelector(`#submitButton`)

            // event listener for the submit button
            submitButton.addEventListener(`click`,async function (event){

                // ignore the default behavior
                event.preventDefault()
                
                // get a reference to the newly created course
                let codeInput = document.querySelector(`#code`)
                let quarterInput = document.querySelector(`#quarter`)
                let nameInput = document.querySelector(`#name`)
                
                // get the content
                let code = codeInput.value
                let quarter = quarterInput.value
                let name = nameInput.value
                
                console.log(code)
                // Build the URL for our posts API
                let url = `/.netlify/functions/create_course?code=${code}&quarter=${quarter}&name=${name}&userId=${user.uid}`

                // Fetch the url, wait for a response, store the response in memory
                let response = await fetch(url)
        
        })
    })

        // reference to and event listener for the create materials button
        let materialButton = document.querySelector(`.createMaterials`)

        materialButton.addEventListener(`click`,async function (event){

            // create learning materials
            // display the form for inputing new material
            let form2 = document.querySelector(`.inputForm2`)

            form2.insertAdjacentHTML(`beforeend`, `
            <h1 class="ml-4 text-base text-black font-bold">Recording Learning Materials</h1>
            <form action="button-submit.html" data-netlify="true">
                    <div class="md:ml-8 md:mr-8">
                        <div class="flex">
                            <div class="w-1/3">
                                <label class="block mt-4 font-bold">Title</label>
                                <input class="p-2 w-64 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500" type="text" id="title" name="title">
                            </div>
                            <div class="w-1/3">
                                <label class="block mt-4 font-bold">Time</label>
                                <input class="p-2 w-64 border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500 focus:border-purple-500" type="text" id="time" name="time">
                            </div>
                        </div>

                        <div>
                            <label class="block mt-4 font-bold">Course</label>
                            <textarea rows="1" class="p-2 w-full border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500
                            focus:border-purple-500" id="summary" name="summary"></textarea>
                        </div>

                        <div>
                            <label class="block mt-4 font-bold">Summary</label>
                            <textarea rows="6" class="p-2 w-full border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500
                            focus:border-purple-500" id="summary" name="summary"></textarea>
                        </div>

                        <div>
                            <label class="block mt-4 font-bold">Comments</label>
                            <textarea rows="6" class="p-2 w-full border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500
                            focus:border-purple-500" id="comments" name="comments"></textarea>
                        </div>

                        <div>
                            <label class="block mt-4 font-bold">Attachment</label>
                            <textarea rows="6" class="p-2 w-full border border-gray-400 rounded shadow-xl focus:outline-none focus:ring-purple-500
                            focus:border-purple-500" id="attachment" name="attachment"></textarea>
                        </div>
                        <button class="p-2 w-full bg-gray-300 text-sm text-black p-2 rounded" id="uploadButton">Upload files or add a url</button>
                    </div>
            </form>`)
            
            // get the reference to the submit button
            let submitButton = document.querySelector(`#submitButton`)

            // event listener for the submit button
            submitButton.addEventListener(`click`,async function (event){

                // ignore the default behavior
                event.preventDefault()
                
                // get a reference to the newly created material
                let titleInput = document.querySelector(`#title`)
                let CoureNameInput = document.querySelector(`#courseName`)
                let summaryInput= document.querySelector(`#summary`)
                let attachmentInput= document.querySelector(`#attachment`)
                
                        
                // get the content
                let title = titleInput.value
                let courseName = CoureNameInput.value
                let summary = summaryInput.value
                let attachment = attachmentInput.value

                
                
                // Connect the course name with the existing course Id
                let idResponse = await fetch(`/.netlify/functions/courseidfinder?name=${courseName}`)
                let courseId = await idResponse.json()

                // Build the URL for our posts API
                let url = `/.netlify/functions/create_material?title=${title}&courseId=${courseId}&summary=${summary}&attachment=${attachment}&userId=${user.uid}&courseName=${courseName}`
                console.log(url)

                // Fetch the url, wait for a response, store the response in memory
                let response = await fetch(url)
            
            })
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
        signInSuccessUrl: 'write.html'
      }
  
      // Starts FirebaseUI Auth
      ui.start('.sign-in-or-sign-out', authUIConfig)
    }

})