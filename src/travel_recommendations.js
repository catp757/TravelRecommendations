(function() {
    class DestinationSearch {
        constructor() {
            this.resultsSection = document.getElementById('destinationSearchResults');
            this.init();
        }

        init() {
            this.clearDestination();
            this.clearPositionDescription();
            this.setupEventListeners();
        }

        setupEventListeners() {
            const btnSearch = document.getElementById("btnSearch");
            if (btnSearch != null) {
                btnSearch.addEventListener('click', () => this.searchDestination());
            }

            const btnClear = document.getElementById("btnClear");
            if (btnClear != null) {
                btnClear.addEventListener('click', () => this.clearDestination());
            }
        }

        searchDestination() {
            const input = document.getElementById('destinationInput').value.toLowerCase();
            this.resultsSection.innerHTML = '';

            if (input === "") { return; }

            fetch('travel_recommendations.json')
                .then(response => response.json())
                .then(data => this.handleSearchResults(data, input))
                .catch(error => {
                    console.error('Error retrieving the data:', error);
                    alert('An error occurred while retrieving the data.');
                });
        }

        handleSearchResults(data, input) {
            const country = data.countries.find(item => item.name.toLowerCase() === input);
            const temple = data.temples.find(item => item.name.toLowerCase() === input);
            const beach = data.beaches.find(item => item.name.toLowerCase() === input);

            if (country) {
                this.displayCountries([country]);
            } else if (beach) {
                this.displayBeaches([beach]);
            } else if (temple) {
                this.displayTemples([temple]);
            } else if (input === "countries") {
                this.displayCountries(data.countries);
            } else if (input === "beaches") {
                this.displayBeaches(data.beaches);
            } else if (input === "temples") {
                this.displayTemples(data.temples);
            } else {
                alert('No matching destinations were found.');
            }
        }

        displayCountries(countries) {
            countries.forEach(country => {
                this.resultsSection.innerHTML += `<h2>${country.name}</h2>`;
                this.displayDestinationResults(country.cities);
            });
        }

        displayBeaches(beaches) {
            const heading = `<h2>${beaches.length === 1 ? 'Beach' : 'Beaches'}</h2>`;
            this.resultsSection.innerHTML = heading;
            this.displayDestinationResults(beaches);
        }

        displayTemples(temples) {
            const heading = `<h2>${temples.length === 1 ? 'Temple' : 'Temples'}</h2>`;
            this.resultsSection.innerHTML = heading;
            this.displayDestinationResults(temples);
        }

        displayDestinationResults(destinations) {
            if (destinations.length === 0) { return; }

            const destinationContainerDiv = document.createElement('div');
            destinationContainerDiv.classList.add('destinationContainerDiv');

            destinations.forEach(destination => {
                const destinationDiv = document.createElement('div');
                destinationDiv.classList.add('destination');

                const image = document.createElement('img');
                image.setAttribute('src', `/images/${destination.imageUrl}`);
                image.setAttribute('alt', `Picture of ${destination.name}`);

                const name = document.createElement('h4');
                name.textContent = destination.name;

                const description = document.createElement('p');
                description.textContent = destination.description;

                const btnVisit = document.createElement('button');
                btnVisit.textContent = "Visit";
                btnVisit.setAttribute('id', 'btnVisit');
                const firstLocation = destination.name.split(",")[0];
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

        clearDestination() {
            const input = document.getElementById("destinationInput");
            if (input === null) { return; }
            input.value = "";
            this.resultsSection.value = "";
            this.resultsSection.innerHTML = "";
            this.resultsSection.style.display = "none";
        }

        clearPositionDescription() {
            const positionDescriptionDiv = document.getElementById("positionDescriptionDiv");
            if (positionDescriptionDiv === null) { return; }
            positionDescriptionDiv.innerHTML = "";
            positionDescriptionDiv.style.display = "none";
        }
    }

    class ContactForm {
        constructor() {
            this.setupEventListeners();
        }

        setupEventListeners() {
            const contactForm = document.getElementById("contactForm");
            if (contactForm != null) {
                contactForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    this.thankYou();
                    this.clearContactForm();
                });
            }
        }

        clearContactForm() {
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';
        }

        thankYou() {
            alert('Your message has been sent. Thank you for contacting us!');
        }
    }

    class SocialMedia {
        constructor() {
            this.setupEventListeners();
        }

        setupEventListeners() {
            const socialMediaLinks = {
                twitterIcon: "https://twitter.com",
                facebookIcon: "https://www.facebook.com",
                telegramIcon: "https://telegram.org/",
                youtubeIcon: "https://www.youtube.com"
            };

            for (const [iconId, url] of Object.entries(socialMediaLinks)) {
                const iconElement = document.getElementById(iconId);
                if (iconElement != null) {
                    iconElement.addEventListener('click', () => this.openLink(url));
                }
            }
        }

        openLink(url) {
            window.open(url, '_blank').focus();
        }
    }

    class PositionDescription {
        constructor() {
            this.setupEventListeners();
        }

        setupEventListeners() {
            const positions = {
                btnCEO: "CEO",
                btnTeamLead: "TeamLead",
                btnDeliveryManager: "DeliveryManager"
            };

            for (const [btnId, positionTitle] of Object.entries(positions)) {
                const button = document.getElementById(btnId);
                if (button != null) {
                    button.setAttribute('onclick', `showPositionDescription('${positionTitle}')`);
                }
            }
        }

        showPositionDescription(positionTitle) {
            const positionDescriptionDiv = document.getElementById("positionDescriptionDiv");
            if (positionDescriptionDiv === null) { return; }
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
            positionDescriptionDiv.innerHTML = `<h2>${title}</h2><p>${positionDesc}</p>`;
            positionDescriptionDiv.style.display = "block";
        }
    }

    class Booking {
        constructor() {
            this.setupEventListeners();
        }

        setupEventListeners() {
            const btnBookNow = document.getElementById("btnBookNow");
            if (btnBookNow != null) {
                btnBookNow.addEventListener('click', () => this.bookNow());
            }
        }

        bookNow() {
            const url = "http://www.booking.com";
            window.open(url, '_blank').focus();
        }
    }

    // Initialize all classes
    new DestinationSearch();
    new ContactForm();
    new SocialMedia();
    new PositionDescription();
    new Booking();
})();