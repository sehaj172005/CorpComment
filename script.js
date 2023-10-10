// Selecting elements from the HTML document using querySelector



const textareaEl = document.querySelector('.form__textarea'); // Selecting a textarea element
const counterwordsEl = document.querySelector('.feedback__input__words'); // Selecting an element to display word count
const formEl = document.querySelector('.form'); // Selecting a form element
const feedbackEl = document.querySelector('.feedbacks'); // Selecting a container for feedback items
const spinnerEl = document.querySelector('.spinner');
const hashtagEl = document.querySelector('.hashtags');


const renderfeedback = feedbackitem => {
  const feedbackitemHTML = `
  <li class="feedback">
     <div class="upvote">
         <i class="fa-solid fa-arrow-up-from-bracket upvote__icon"></i>
         <span class="upvote__count">${feedbackitem.upvoteCount}</span>
         
     </div>
     <section class="feedback__badge">
         <p class="feedback__letter">${feedbackitem.badgeLetter}</p>
     </section>
     <div class="feedback__content">
         <p class="feedback__company">${feedbackitem.company}</p>
         <p class="feedback__text">${feedbackitem.text}</p>
     </div>
     <p class="feedback__date">${feedbackitem.daysAgo}d</p>
 </li>
 `;

 feedbackEl.insertAdjacentHTML("beforeend", feedbackitemHTML);

}

// Function to handle input events (e.g., typing in the textarea)
const inputHandler = () => {
  // Calculate the length of the input text
  const inputlength = textareaEl.value.length;

  // Calculate the remaining words allowed (assuming a maximum of 150 words)
  const inputleft = 150 - inputlength;

  // Display the remaining words count
  counterwordsEl.textContent = inputleft;
}

// Add an event listener to the textarea to trigger the inputHandler when the user types
textareaEl.addEventListener('input', inputHandler);

// Function to visually indicate the form's status (valid or invalid)
const showVisualindicator = textCheck => {
  // Determine the CSS class based on the validation result
  const className = textCheck === 'valid' ? 'form__active' : 'form__inactive';

  // Add the CSS class to the form element to show visual feedback
  formEl.classList.add(className);

  // Remove the CSS class after 2 seconds to revert to the original state
  setTimeout(() => {
    formEl.classList.remove(className);
  }, 2000);
}





// Function to handle form submission
const submitHandler = event => {
  // Prevent the default form submission (we're handling it manually)
  event.preventDefault();

  // Get the text entered in the textarea
  const text = textareaEl.value;

  // Check if the text contains a '#' and has a minimum length of 5 characters
  if (text.includes('#') && textareaEl.value.length >= 5) {
    // If valid, show a success indicator
    showVisualindicator("valid");
  } else {
    // If invalid, show an error indicator, focus on the textarea, and stop further processing
    showVisualindicator("invalid");
    textareaEl.focus();
    return;
  }

  // expanding feedback class and increment of upvote button

  
  

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  // Extract the hashtag and related information










  const hashtag = text.split(' ').find(word => word.includes('#'));
  const company = hashtag.substring(1);
  const badgeLetter = hashtag.substring(1, 2).toUpperCase();
  const upvoteCount = 0;
  const daysAgo = 0;

  
  const feedbackitem = {
    company: company,
    badgeLetter: badgeLetter,
    upvoteCount: upvoteCount,
    daysAgo: daysAgo,
    text: text,
  }

  renderfeedback(feedbackitem);

  fetch("https://bytegrad.com/course-assets/js/1/api/feedbacks"  , {

  method : 'POST',
  body : JSON.stringify(feedbackitem) ,
  headers : {

    accept: 'application/json',
    'CONTENT-TYPE' : 'application/json'
  }

  }).then( res =>{
    if(!res.ok){
      console.log("Something went wrong")
      return;
    }
    else {
      console.log("Service is good");
    }
  }
  )
  
  

 
  
}

// Add an event listener to the form to trigger the submitHandler when the form is submitted
formEl.addEventListener('submit', submitHandler);


const clickHandler = (event) => {

  const clickedEl = event.target;
  const upvotebtnEl = clickedEl.className.includes('upvote')
  
  

 
   
    

if (upvotebtnEl) {
  const upvoteiconEl = clickedEl.closest('.upvote__icon');

  

  

  if (!upvoteiconEl.disabled) {
    // If the clicked element has the "upvote__icon" class, increment the upvote count
    const upvotecountEl = upvoteiconEl.nextElementSibling; // Assuming upvote count follows the icon in the DOM structure

    let upvoteText = +upvotecountEl.textContent;
      upvoteText = ++upvoteText;
      upvotecountEl.textContent = upvoteText;

      upvoteiconEl.disabled=true

      
}}


   

  
  else{

    const feedbacklistEl = clickedEl.closest('.feedback')

    feedbacklistEl.classList.toggle("feedback__expand")

  }
}


feedbackEl.addEventListener('click' , clickHandler);


// Fetch data from an API and populate the feedbacks
fetch("https://bytegrad.com/course-assets/js/1/api/feedbacks")
  .then(function (response) {
    return response.json();
  })
  .then(data => {
    spinnerEl.remove();

    data.feedbacks.forEach(feedbackElement => {
      // Extract the upvote and badgeletter values from the API response
      // const upvote = feedbackElement.upvoteCount;
      // const badgeletter = feedbackElement.badgeLetter;
      
      renderfeedback(feedbackElement);
    });
  })
  .catch(e => {
    spinnerEl.remove();
    feedbackEl.textContent = `ERROR : ${e.message}`

  });


  // Hastags
  
  
  
  const clickHandler2 = event => {
    const clickedEl = event.target;
  
    if (clickedEl.className === "hashtag") {
      const companyname = clickedEl.textContent.substring(1).toUpperCase().trim();
  
      // Convert feedbackEl.children to an array using Array.from()
      const childElements = Array.from(feedbackEl.children);
  
      childElements.forEach(child => {
        const companynamefromfeedback = child.querySelector(".feedback__company").textContent.toUpperCase().trim();
  
        if (companyname !== companynamefromfeedback) {
          child.style.display = "none"
        } else {
          child.style.display = ""
        }
      });
    }
  };
  
  hashtagEl.addEventListener('click', clickHandler2);
  