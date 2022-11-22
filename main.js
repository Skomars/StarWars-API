BaseUrl = `https://swapi.dev/api`;
const screenData = document.getElementById("res");
const spinner = document.querySelector(".spinner");
const hits = document.getElementById("hits");
const screen = document.getElementById("res");

// Init
init = () => {
  const searchBtn = document.getElementById("search-button");
  searchBtn.addEventListener("click", () => {
    fetchData();
  });
};
init();

// Get data for category and search for results
async function fetchData() {
  screen.textContent = "";
  hits.textContent = "";

  const category = document.getElementById("category").value;
  const query = document.querySelector("#query").value;

  console.log(`category: ${category}`);
  console.log(`query: ${query}`);

  // Loading finished, hiding spinner
  spinner.classList.remove("spinner-hidden"); 

  const results = await fetch(`${BaseUrl}/${category}/?search=${query}`);
  const data = await results.json();

  if (`${data.count}` == 0) {
    hits.textContent = `No hit!`;
    console.log(`No hit! (Show message on front-end)`);
  } else {
    
    // while/do-while loop all pages here! if(next.data !== null) that means next page exists

    hits.textContent = `${data.count} hit/hits!`;
    console.log(`${data.count} hit/hits!`);
    console.log(data);
    console.log(data.results);
    console.log(`Next page: ${data.next}`);

    switch (category) {
      case "people":
        // Running function "populatePersons()"
        populatePersons(data.results); 
        break;
    }
  }
  // Loading finished, hiding spinner
  spinner.classList.add("spinner-hidden"); 
}

// Populate persons Only objects in "/people" can be appended to front-end 
// Limit of 10. The rest of the pages needs to be checked if we want to polulate more people items.
populatePersons = (people) => {
  for (const person in people) {
    const personObject = people[person];

    console.log(`${people[person].name}`);

    const personContainer = document.createElement("ul");
    screenData.appendChild(personContainer);

    const nameListItem = document.createElement("li");
    const genderListItem = document.createElement("li");
    const massListItem = document.createElement("li");

    nameListItem.textContent = personObject.name;
    genderListItem.textContent = personObject.gender;
    massListItem.textContent = personObject.mass;

    personContainer.appendChild(nameListItem);
    personContainer.appendChild(genderListItem);
    personContainer.appendChild(massListItem);
    // TODO:  Add a "more" button/link
  }
};

// Bootstrap tables for results?
// More categories in switch statement
