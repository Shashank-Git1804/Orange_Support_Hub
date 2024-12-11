
// const apiUrl = `https://clinicaltables.nlm.nih.gov/api/disease_names/v3/search`;
// const api2Url=`https://medlineplus.gov/download/genetics/condition/down-syndrome.xml`
// console.log('hello');

// const listElement = document.getElementById("diseaseList");
// const searchBar = document.querySelector("#searchBar");
// const details = document.getElementById("details");
// const def=document.getElementById("Def");


// async function fetchDisease(query) {
//   try {
//     // Fetch disease data from the API
//     let response = await fetch(`${apiUrl}?terms=${query}`);
//     console.log(response)
//     let data = await response.json();
//     console.log(data)
//     displayDiseases(data[3]); // Disease names are in index 3
//   } catch (error) {
//     console.error("Error fetching disease data:", error);
//   }
// }

// function displayDiseases(diseases) {
//   // Clear existing list items
//   listElement.innerHTML = "";

//   if (diseases.length === 0) {
//     // Hide the list if there are no diseases to display
//     listElement.style.display = "none";
//     return;
//   }

//   // Show the list if diseases are present
//   listElement.style.display = "block";

//   // Create a card for each disease
//   diseases.forEach((disease) => {
//     const card = document.createElement("div");
//     card.className = "disease-card";
//     card.textContent = disease;

//     // Add click event to populate details
//     card.addEventListener("click", () => {
//       searchBar.value = disease;
//       listElement.innerHTML = ""; // Clear the list after selection
//       listElement.style.display = "none";
//       fetchDiseaseDetails(disease);
//     });

//     // Append the card to the list
//     listElement.appendChild(card);
//   });
// }

// async function fetchDiseaseDetails(disease) {
//   // Clear previous details
//   // details.innerHTML = "";
//   console.log(def.children[0].firstElementChild.children[0])
//   def.children[0].firstElementChild.children[0].innerText=`${disease}`.toUpperCase();
//   def.firstElementChild.children[1].innerText=``
//   // Display the selected disease details
//   console.log(details.innerHTML)
//   details.children[0].innerText=`${disease} overview`;
//   details.children[1].innerText=`What is ${disease}?`;
//   // info.textContent = `Details about ${disease}`;
//   // details.appendChild(info);
// }

// document.getElementById("searchBar").addEventListener("input", (e) => {
//   const query = e.target.value.trim();

//   // Clear the list and hide it if the search bar is empty
//   if (query === "") {
//     listElement.innerHTML = "";
//     listElement.style.display = "none";
//     return;
//   }

//   // Fetch diseases for the entered query
//   fetchDisease(query);
  
// });


const apiUrl = `https://clinicaltables.nlm.nih.gov/api/disease_names/v3/search`;
const listElement = document.getElementById("diseaseList");
const searchBar = document.querySelector("#searchBar");
const details = document.getElementById("details");
const def = document.getElementById("Def");
console.log('hii')

// Fetch disease names based on user query
async function fetchDisease(query) {
  try {
    listElement.innerHTML = "<p>Loading...</p>";
    let response = await fetch(`${apiUrl}?terms=${query}`);
    if (!response.ok) throw new Error("Failed to fetch disease data");
    let data = await response.json();
    displayDiseases(data[3]); // Diseases are located in index 3
  } catch (error) {
    console.error("Error fetching disease data:", error);
    listElement.innerHTML = "<p>No results found.</p>";
  }
}

// Display a list of diseases
function displayDiseases(diseases) {
  listElement.innerHTML = "";
  if (diseases.length === 0) {
    listElement.style.display = "none";
    return;
  }
  listElement.style.display = "block";
  diseases.forEach((disease) => {
    const card = document.createElement("div");
    card.className = "disease-card";
    card.textContent = disease;
    card.addEventListener("click", () => {
      searchBar.value = disease;
      listElement.innerHTML = "";
      listElement.style.display = "none";
      fetchDiseaseDetails(disease);
    });
    listElement.appendChild(card);
  });
}

// Display detailed disease information
async function fetchDiseaseDetails(disease) {
  def.children[0].firstElementChild.children[0].innerText = `${disease}`.toUpperCase();
  def.firstElementChild.children[1].innerText = `Fetching information...`;
  try {
    // Example logic for fetching additional details (replace with real API if available)
    const response = await fetch(`${apiUrl}?terms=${disease}`);
    const data = await response.json();
    details.children[0].innerText = `${disease} Overview`;
    details.children[1].innerText = `Details for ${disease}`;
    details.children[2].innerText = `Additional information will go here.`;
  } catch (error) {
    console.error("Error fetching detailed information:", error);
    details.children[1].innerText = "Error fetching details.";
  }
}

// Event listener for the search bar
searchBar.addEventListener("input", (e) => {
  const query = e.target.value.trim();
  if (query === "") {
    listElement.innerHTML = "";
    listElement.style.display = "none";
    return;
  }
  fetchDisease(query);
});
