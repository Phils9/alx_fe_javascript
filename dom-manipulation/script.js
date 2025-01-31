// Array of quotes with text and category
const quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
];

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  
  quoteDisplay.innerHTML = `"${quotes[randomIndex].text}" - <strong>[${quotes[randomIndex].category}]</strong>`;
}

// Function to create the add quote form dynamically
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.innerHTML = `
      <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
      <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
      <button id="addQuoteBtn">Add Quote</button>
  `;

  document.body.appendChild(formContainer);

  // Add event listener to the newly created button
  document.getElementById("addQuoteBtn").addEventListener("click", addQuote);
}

// Function to add a new quote dynamically
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value.trim();
  const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (quoteText && quoteCategory) {
      // Add the new quote to the array
      quotes.push({ text: quoteText, category: quoteCategory });

      // Clear input fields
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";

      // Show confirmation message
      alert("New quote added!");

      // Update the displayed quote immediately
      showRandomQuote();
  } else {
      alert("Please enter both a quote and a category.");
  }
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Call the function to create the quote form
createAddQuoteForm();

// Initial quote display on page load
window.onload = showRandomQuote;
