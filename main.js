// 👉 Send a request to each of the APIs below using your browser's address bar to investigate what you get back and check that the APIs are each up and running.

// 👉 Try and fetch in your JavaScript and console log until you see the same data you saw in the browser.

// 👉 Visit the documentation for the APIs and investigate further. 

// 👉 From there, brainstorm what you could make with your knowledge of JavaScript, the DOM and the data you have received.

// use async function to fetch and unpack json 
// remove all child elements when new search is conducted
function removeDefinition() {
    const list = document.querySelector('#definition');
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

async function getDictionary(word) {

    try {
    // use fetch to get information from API and store in variable
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    // use json method to unpack the data
    const data = await response.json();
    // log the data to the console
     console.log(data);
    // get definition [0].meantings[0].definitions[0].definition)


    //We need to extract data from partOfSpeech
    //We need to link the partOfSpeech to the correct definition


    let definitionList = data[0].meanings

    console.log(definitionList)
    // remove previous definitions
    removeDefinition();
    for(i=0;i<definitionList.length;i++) {

    // const newWord = document.querySelector("#definition");
    const newWord = data[0].meanings[i].definitions[0].definition;

    const newWordType = data[0].meanings[i].partOfSpeech;

     console.log(newWordType)
    //  console.log(synonyms)
     
    // console.log(newWord);

    // const typeWord = `${newWordType} ${newWord}`
    addDefinition(newWord, newWordType);   
 
      const synonyms = data[0].meanings[i].synonyms;
      for (let j = 0; j < synonyms.length; j++) {
        otherInfo(synonyms[j]);
      }
}}


catch (error) {
    console.log(error);
  }
}
// take the data from the search input and store in a variable
// link the getDictionary function to the button - so when pressed takes the word and puts in function
    

// let searchWord = document.querySelector('#search-input')

// stores the search button in a variable 
const searchButton = document.querySelector('#search-button');
// adds an event listener to the button 
searchButton.addEventListener('click', function() {
    //when button is clicked the the value of the search input is stored 
  const searchInput = document.querySelector('#search-input');
  const searchWord = searchInput.value;
//   the function is run with the searched word
  getDictionary(searchWord);
});

function addDefinition(newWord, newWordType) {

  // create a new p element
  const newDefinition = document.createElement('li');
  // assign the string to the p element's textContent
  newDefinition.innerHTML = `<i>${newWordType}</i>:<br>${newWord} <br>  `;
//   newDefinition.textContent = `${newWordType}: ${newWord}`;
  // append the p element to the definition container
  const list = document.querySelector('#definition');
  list.appendChild(newDefinition);
}

function otherInfo(synonyms) {
const newDiv = document.createElement('li');
// newDiv.setAttribute('id', 'myDiv');
// document.body.main.appendChild(newDiv);
const textNode = document.createTextNode(synonyms);
newDiv.appendChild(textNode);
document.body.querySelector('#myDiv').appendChild(newDiv);
}


// const newDivElement = document.querySelector('#main');
// newDivElement.appendChild();

// line 88 change to the extra info
// create a variable for more info 
// store info from API into the variable 
// assign info from API as the textNode