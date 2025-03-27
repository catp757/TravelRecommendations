
const resultsSection = document.getElementById('destinationSearchResults');

clearDestination();
clearPositionDescription();

// function searches the json file for the destination entered by the user.
function searchDestination() {
    const input = document.getElementById('destinationInput').value.toLowerCase();
    resultsSection.innerHTML = '';

    if (input === "") { return; }

    fetch('travel_recommendations.json')
    .then(response => response.json())
    .then(data => {

      // user entered a specific country, temple or beach  
      const country = data.countries.find(item => item.name.toLowerCase() === input);
      const temple = data.temples.find(item => item.name.toLowerCase() === input);
      const beach = data.beaches.find(item => item.name.toLowerCase() === input);

      // user entered a specific country name
      if (country) {
        let countries = [];
        countries.push(country);   
        displayCountries(countries);         
      }
      // user entered a specific beach name 
      else if (beach) { 
        let beaches = [];
        beaches.push(beach); 
        displayBeaches(beaches);                
      }
      // user entered a specific temple name
      else if (temple) { 
        let temples = [];
        temples.push(temple);
        displayTemples(temples);
      }      
      // all countries (user entered 'countries')
      else if (input === "countries") {
        displayCountries(data.countries);
      }
      // all beaches (user entered 'beaches')
      else if (input === "beaches") {
        displayBeaches(data.beaches);
      }      
      // all temples (user entered 'temples')
      else if (input === "temples") {
        displayTemples(data.temples);
      } 
      else {
        alert('No matching destinations were found.');
      }
    })
    .catch(error => {
      console.error('Error retrieving the data:', error);
      alert('An error occurred while retrieving the data.');
    });
}

const btnSearch = document.getElementById("btnSearch");
if (btnSearch != null) { 
   btnSearch.addEventListener('click', searchDestination);
}

// function displays countries and their cities
function displayCountries(countries) {
    countries.forEach(country => {
        resultsSection.innerHTML += `<h2>${country.name}</h2>`;  // display the country name
        const cities = country.cities;   // display the cities of the country
        displayDestinationResults(cities);
    });
}

// function displays all beaches
function displayBeaches(beaches) {
    let heading = "";
    if (beaches.length === 1) {
        heading = `<h2>Beach</h2>`;
    }
    else {
        heading = `<h2>Beaches</h2>`;
    }
    resultsSection.innerHTML = heading;
    displayDestinationResults(beaches);
}

// function displays all temples
function displayTemples(temples) {
    let heading = "";
    if (temples.length === 1) {
        heading = `<h2>Temple</h2>`;
    }
    else {
        heading = `<h2>Temples</h2>`;
    }  
    resultsSection.innerHTML = heading;
    displayDestinationResults(temples);
}

// function displays the destination results
function displayDestinationResults(destinations) {
    
    // exit if nothing to display
    if (destinations.length === 0) { return; }

    let destinationDiv = null;
    let destinationContainerDiv = null;
    
    const resultsSection = document.getElementById('destinationSearchResults');

    destinationContainerDiv = document.createElement('div');
    destinationContainerDiv.classList.add('destinationContainerDiv');

    // iterate through the destinations and display them
    destinations.forEach(destination => {

        destinationDiv = document.createElement('div');
        destinationDiv.classList.add('destination');
    
        let image = document.createElement('img');
        image.setAttribute('src', `./images/${destination.imageUrl}`);
        image.setAttribute('alt', `Picture of ${destination.name}`);

        let name = document.createElement('h4');
        name.textContent = destination.name;

        let description = document.createElement('p');
        description.textContent = destination.description;
    
        let btnVisit = document.createElement('button');
        btnVisit.textContent = "Visit";
        btnVisit.setAttribute('id', 'btnVisit');

        let destinationName = destination.name;
        let firstLocation = destinationName.substring(0, destinationName.indexOf(","));
        btnVisit.setAttribute('onclick', `visitDestination('${firstLocation}')`);

        destinationDiv.appendChild(image);
        destinationDiv.appendChild(name);           
        destinationDiv.appendChild(description);
        destinationDiv.appendChild(btnVisit);

        destinationContainerDiv.appendChild(destinationDiv);
    });
    
    resultsSection.innerHTML += destinationContainerDiv.innerHTML;
    resultsSection.style.display = "block";
    
}

// function opens a new tab with the wikipedia page of the destination
function visitDestination(location) {
  const url = `https://en.wikipedia.org/wiki/${location}`;
  window.open(url, '_blank').focus();
}

// function clears the destination entered by the user
function clearDestination() {
    const input = document.getElementById("destinationInput");
    if (input === null) { return; }
    input.value = "";
    resultsSection.value = "";
    resultsSection.innerHTML = "";
    resultsSection.style.display = "none";
}

const btnClear = document.getElementById("btnClear");
if (btnClear != null) {
   btnClear.addEventListener('click', clearDestination);
}

// function clears the contact form
function clearContactForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

// function displays a thank you message after the contact form is submitted
function thankYou(){
  alert('Your message has been sent. Thank you for contacting us!')
}

let contactForm = document.getElementById("contactForm");
if (contactForm != null) {
  contactForm.addEventListener('submit', function(event){
    event.preventDefault();
    thankYou();
    clearContactForm();
  });
}

// Book Now button functionality
let btnBookNow = document.getElementById("btnBookNow");
if (btnBookNow != null) {
  btnBookNow.addEventListener('click', function(){
    const url = "http://www.booking.com";
    window.open(url, '_blank').focus();
  });
}

// Social Media Icons functionality

// function opens a new tab to Twitter
function showTwitter() {
  const url = "https://twitter.com";    
  window.open(url, '_blank').focus();
}

const twitterIcon = document.getElementById("twitterIcon");
if (twitterIcon != null) {
  twitterIcon.addEventListener('click', showTwitter);
}

// function opens a new tab to Facebook
function showFacebook() {
  const url = "https://www.facebook.com";
  window.open(url, '_blank').focus();
}

const facebookIcon = document.getElementById("facebookIcon");
if (facebookIcon != null) {
  facebookIcon.addEventListener('click', showFacebook);
}

// function opens a new tab to Telegram
function showTelegram() {
  const url = "https://telegram.org/";  
  window.open(url, '_blank').focus();
}

const telegramIcon = document.getElementById("telegramIcon");
if (telegramIcon != null) {  
  telegramIcon.addEventListener('click', showTelegram);
} 

// function opens a new tab to Youtube
function showYoutube() {
  const url = "https://www.youtube.com";
  window.open(url, '_blank').focus();
}   

const youtubeIcon = document.getElementById("youtubeIcon");
if (youtubeIcon != null) {
  youtubeIcon.addEventListener('click', showYoutube);
}

// Position Descriptions functionality
function showPositionDescription(positionTitle) {   
  const positionDescriptionDiv = document.getElementById("positionDescriptionDiv");
  if (positionDescriptionDiv === null) { return; }
  let title = "";
  let positionDesc = "";
  if (positionTitle === "CEO") {
    title = "CEO";
    positionDesc = "Richard Kirkland is responsible for the overall success of the company. He is responsible for " +
                   "setting the company's strategic direction, making key decisions, and managing the company's " + 
                   "operations. He is also responsible for ensuring that the company's financial performance is strong.";
    
  }
  else if (positionTitle === "TeamLead") { 
    title = "Team Lead";
    positionDesc  = "Claire Thomson is responsible for managing the team and ensuring that the team meets its goals and objectives. " +
                    "She is also responsible for ensuring that the team is working effectively and efficiently.";
  }
  else if (positionTitle === "DeliveryManager") { 
    title = "Delivery Manager";
    positionDesc  = "Michael Lansing is responsible for managing the delivery of software projects, ensuring that " +
                    "the projects are delivered on time and within budget. He is also be responsible for managing the team of " +
                    "developers and ensuring that they are working effectively and efficiently.";
  } 
  positionDescriptionDiv.innerHTML = `<h2>${title}</h2>
                                      <p>${positionDesc}</p>`;         
  positionDescriptionDiv.style.display = "block";
}

const btnCEO = document.getElementById("btnCEO");
if (btnCEO != null) {
  btnCEO.setAttribute('onclick', `showPositionDescription('CEO')`);
} 

const btnTeamLead = document.getElementById("btnTeamLead");
if (btnTeamLead != null) {
  btnTeamLead.setAttribute('onclick', `showPositionDescription('TeamLead')`);
}

const btnDeliveryManager = document.getElementById("btnDeliveryManager");
if (btnDeliveryManager != null) {
  btnDeliveryManager.setAttribute ('onclick', `showPositionDescription('DeliveryManager')`); 
}

function clearPositionDescription () {
  const positionDescriptionDiv = document.getElementById("positionDescriptionDiv");
  if (positionDescriptionDiv === null) { return; }
  positionDescriptionDiv.innerHTML = "";
  positionDescriptionDiv.style.display = "none";
} 

//------------------------------------------
// TO DO
// ALSO ADD MEDIA QUERIES TO HANDLE DIFFERENT SCREEN SIZES
// LOCAL TIME on top of search results:
//   const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
//   const newYorkTime = new Date().toLocaleTimeString('en-US', options);
//   console.log("Current time in New York:", newYorkTime);
// ------------------------------------------
