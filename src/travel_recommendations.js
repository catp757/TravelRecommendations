class TravelRecommendations {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
    }

    async fetchData() {
        return fetch(this.dataUrl)
            .then(response => response.json())
            .catch(error => {
                console.error('Error retrieving the data:', error);
                alert('An error occurred while retrieving the data.');
            });
    }

    searchDestination(input, data) {
        const lowerInput = input.toLowerCase();
        const country = data.countries.find(item => item.name.toLowerCase() === lowerInput);
        const temple = data.temples.find(item => item.name.toLowerCase() === lowerInput);
        const beach = data.beaches.find(item => item.name.toLowerCase() === lowerInput);

        if (country) return { type: 'country', data: [country] };
        if (temple) return { type: 'temple', data: [temple] };
        if (beach) return { type: 'beach', data: [beach] };
        if (lowerInput === "countries") return { type: 'country', data: data.countries };
        if (lowerInput === "beaches") return { type: 'beach', data: data.beaches };
        if (lowerInput === "temples") return { type: 'temple', data: data.temples };

        return null;
    }
}

class UIHandler {
    constructor() {
        this.resultsSection = document.getElementById('destinationSearchResults');
        this.positionDescriptionDiv = document.getElementById("positionDescriptionDiv");
    }

    clearDestination() {
        const input = document.getElementById("destinationInput");
        if (input === null) return;
        input.value = "";
        this.resultsSection.value = "";
        this.resultsSection.innerHTML = "";
        this.resultsSection.style.display = "none";
    }

    displayResults(type, data) {
        if (!data || data.length === 0) {
            alert('No matching destinations were found.');
            return;
        }

        switch (type) {
            case 'country':
                this.displayCountries(data);
                break;
            case 'beach':
                this.displayBeaches(data);
                break;
            case 'temple':
                this.displayTemples(data);
                break;
        }
    }

    displayCountries(countries) {
        countries.forEach(country => {
            this.resultsSection.innerHTML += `<h2>${country.name}</h2>`;
            this.displayDestinationResults(country.cities);
        });
    }

    displayBeaches(beaches) {
        this.resultsSection.innerHTML = `<h2>${beaches.length === 1 ? 'Beach' : 'Beaches'}</h2>`;
        this.displayDestinationResults(beaches);
    }

    displayTemples(temples) {
        this.resultsSection.innerHTML = `<h2>${temples.length === 1 ? 'Temple' : 'Temples'}</h2>`;
        this.displayDestinationResults(temples);
    }

    displayDestinationResults(destinations) {
        if (destinations.length === 0) return;

        const destinationContainerDiv = document.createElement('div');
        destinationContainerDiv.classList.add('destinationContainerDiv');

        destinations.forEach(destination => {
            const destinationDiv = document.createElement('div');
            destinationDiv.classList.add('destination');

            const image = document.createElement('img');
            image.setAttribute('src', `./images/${destination.imageUrl}`);
            image.setAttribute('alt', `Picture of ${destination.name}`);

            const name = document.createElement('h4');
            name.textContent = destination.name;

            const description = document.createElement('p');
            description.textContent = destination.description;

            const btnVisit = document.createElement('button');
            btnVisit.textContent = "Visit";
            btnVisit.setAttribute('id', 'btnVisit');

            const destinationName = destination.name;
            const firstLocation = destinationName.substring(0, destinationName.indexOf(","));
            btnVisit.setAttribute('onclick', `visitDestination('${firstLocation}')`);

            destinationDiv.appendChild(image);
            destinationDiv.appendChild(name);
            destinationDiv.appendChild(description);
            destinationDiv.appendChild(btnVisit);

            destinationContainerDiv.appendChild(destinationDiv);
        });

        this.resultsSection.innerHTML += destinationContainerDiv.innerHTML;
        this.resultsSection.style.display = "block";
    }

    showPositionDescription(positionTitle) {
        if (this.positionDescriptionDiv === null) return;
        let title = "";
        let positionDesc = "";
        if (positionTitle === "CEO") {
            title = "CEO";
            positionDesc = "Richard Kirkland is responsible for the overall success of the company. He is responsible for " +
                "setting the company's strategic direction, making key decisions, and managing the company's " +
                "operations. He is also responsible for ensuring that the company's financial performance is strong.";
        } else if (positionTitle === "TeamLead") {
            title = "Team Lead";
            positionDesc = "Claire Thomson is responsible for managing the team and ensuring that the team meets its goals and objectives. " +
                "She is also responsible for ensuring that the team is working effectively and efficiently.";
        } else if (positionTitle === "DeliveryManager") {
            title = "Delivery Manager";
            positionDesc = "Michael Lansing is responsible for managing the delivery of software projects, ensuring that " +
                "the projects are delivered on time and within budget. He is also be responsible for managing the team of " +
                "developers and ensuring that they are working effectively and efficiently.";
        }
        this.positionDescriptionDiv.innerHTML = `<h2>${title}</h2><p>${positionDesc}</p>`;
        this.positionDescriptionDiv.style.display = "block";
    }

    clearPositionDescription() {
        if (this.positionDescriptionDiv === null) return;
        this.positionDescriptionDiv.innerHTML = "";
        this.positionDescriptionDiv.style.display = "none";
    }
}

// Initialize classes and set up event listeners
const travelRecommendations = new TravelRecommendations('travel_recommendations.json');
const uiHandler = new UIHandler();

document.getElementById("btnSearch")?.addEventListener('click', () => {
    const input = document.getElementById('destinationInput').value;
    travelRecommendations.fetchData().then(data => {
        const result = travelRecommendations.searchDestination(input, data);
        uiHandler.displayResults(result?.type, result?.data);
    });
});

document.getElementById("btnClear")?.addEventListener('click', () => uiHandler.clearDestination());

document.getElementById("contactForm")?.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Your message has been sent. Thank you for contacting us!');
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
});

document.getElementById("btnBookNow")?.addEventListener('click', function () {
    const url = "http://www.booking.com";
    window.open(url, '_blank').focus();
});

document.getElementById("twitterIcon")?.addEventListener('click', () => window.open("https://twitter.com", '_blank').focus());
document.getElementById("facebookIcon")?.addEventListener('click', () => window.open("https://www.facebook.com", '_blank').focus());
document.getElementById("telegramIcon")?.addEventListener('click', () => window.open("https://telegram.org/", '_blank').focus());
document.getElementById("youtubeIcon")?.addEventListener('click', () => window.open("https://www.youtube.com", '_blank').focus());

document.getElementById("btnCEO")?.setAttribute('onclick', `uiHandler.showPositionDescription('CEO')`);
document.getElementById("btnTeamLead")?.setAttribute('onclick', `uiHandler.showPositionDescription('TeamLead')`);
document.getElementById("btnDeliveryManager")?.setAttribute('onclick', `uiHandler.showPositionDescription('DeliveryManager')`);