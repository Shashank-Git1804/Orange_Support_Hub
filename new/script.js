
const apiUrl = `https://clinicaltables.nlm.nih.gov/api/disease_names/v3/search`;
const api2Url=`https://medlineplus.gov/download/genetics/condition/down-syndrome.xml`
console.log('hello');

const listElement = document.getElementById("diseaseList");
const searchBar = document.querySelector("#searchBar");
const details = document.getElementById("details");
const def=document.getElementById("Def");
console.log(def);
let s=def.firstElementChild;
console.dir(s)
let ds=s.firstElementChild;
console.log(ds.firstElementChild.innerText);

async function fetchDisease(query) {
  try {
    // Fetch disease data from the API
    let response = await fetch(`${apiUrl}?terms=${query}`);
    let data = await response.json();
    console.log(data)
    displayDiseases(data[3]); // Disease names are in index 3
  } catch (error) {
    console.error("Error fetching disease data:", error);
  }
}

function displayDiseases(diseases) {
  // Clear existing list items
  listElement.innerHTML = "";

  if (diseases.length === 0) {
    // Hide the list if there are no diseases to display
    listElement.style.display = "none";
    return;
  }

  // Show the list if diseases are present
  listElement.style.display = "block";

  // Create a card for each disease
  diseases.forEach((disease) => {
    const card = document.createElement("div");
    card.className = "disease-card";
    card.textContent = disease;

    // Add click event to populate details
    card.addEventListener("click", () => {
      searchBar.value = disease;
      listElement.innerHTML = ""; // Clear the list after selection
      listElement.style.display = "none";
      fetchDiseaseDetails(disease);
    });

    // Append the card to the list
    listElement.appendChild(card);
  });
}

async function fetchDiseaseDetails(disease) {
  // Clear previous details
  details.innerHTML = "";
  def.children[0].firstElementChild.children[0].innerText=`${disease}`.toUpperCase();
  def.firstElementChild.children[1].innerText=``
  // Display the selected disease details
  const info = document.createElement("div");
  info.innerHTML=`<h1>Details about ${disease}</h1>
  <h3>overview</h3>
  <p>it is a genetic disorder</p>`
  // info.textContent = `Details about ${disease}`;
  details.appendChild(info);
}

document.getElementById("searchBar").addEventListener("input", (e) => {
  const query = e.target.value.trim();

  // Clear the list and hide it if the search bar is empty
  if (query === "") {
    listElement.innerHTML = "";
    listElement.style.display = "none";
    return;
  }

  // Fetch diseases for the entered query
  fetchDisease(query);
  
});