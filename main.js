BaseUrl = `https://swapi.dev/api`;

init = () => {
  const searchBtn = document.getElementById("search-button");
  searchBtn.addEventListener("click", () => {
    fetchPlanets();
  });
};
init();

// Get data for category and search
async function fetchPlanets() {
  const screen = document.getElementById("res");
  screen.textContent = "";
  const category = document.getElementById("category").value;
  const query = document.querySelector("#query").value;
  console.log(`category: ${category}`);
  console.log(`query: ${query}`);

  const spinner = document.querySelector(".spinner");
  spinner.classList.remove("spinner-hidden");
  const results = await fetch(`${BaseUrl}/${category}/?search=${query}`);
  const data = await results.json();
  console.log(data);

  if (`${data.count}` == 0) {
    screen.textContent = `No hit!`;
    console.log(`No hit! (Show message on front-end)`);
  } else {
    screen.textContent = `${data.count} hit/hits!`;
    console.log(`${data.count} hit/hits!`);
  }
  spinner.classList.add("spinner-hidden");
}
