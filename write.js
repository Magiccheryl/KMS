// back end for Write page


firebase.auth().onAuthStateChanged(async function(user) {
    
  // check to see if user is logged-in (i.e. user exists)
  if (user) {

    // write the user Object to the JavaScript console
    console.log(user)

    // Build the markup for the sign-out button and set the HTML in the header
    document.querySelector(`.sign-in-or-sign-out`).innerHTML = `
      <button class="text-white underline sign-out">Sign Out</button>
    `

    // reference to and event listener for the creating courses button
    let courseButton = document.querySelector(`#createCourse`)
    courseButton.addEventListener(`click`,async function (event){

        // creating courses
        // display the form for inputing new course 
        let form = document.querySelector(`.inputForm`)
        form.innerHTML = ` 
        <form class="mt-4">
        <input type="text" id="code" placeholder="Add a class code">
        <input type="text" id="quarter" placeholder="Add quarter">
        <input type="name" id="name" placeholder="Add course name">
        <button id="submitButton">Submit</button>
        </form>`
        
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
    let materialButton = document.querySelector(`#createMaterials`)
    materialButton.addEventListener(`click`,async function (event){

        // create learning materials
        // display the form for inputing new material
        let form = document.querySelector(`.inputForm`)
        form.innerHTML = ` 
        <form class="mt-4">
        <input type="text" id="title" placeholder="Add a title">
        <input type="text" id="courseName" placeholder="Add course name">
        <input type="text" id="summary" placeholder="Add summary">
        <input type="text" id="attachment" placeholder="Add attachment">
        <button id="submitButton">Submit</button>
        </form>`
        
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
        // if the user is not logge in, jump back to index page
        window.location.href = "index.html"
    }
})