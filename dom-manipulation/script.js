// Array of quotes with categories
const quotes = [
  { text: "Success is not final, failure is not fatal.", category: "Motivation" },
  { text: "Believe you can and you're halfway there.", category: "Confidence" },
  { text: "The only way to do great work is to love what you do.", category: "Inspiration" }
];

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  quoteDisplay.textContent = `"${quotes[randomIndex].text}" - [${quotes[randomIndex].category}]`;
}

// Function to add a new quote
function addQuote() {
  const quoteText = document.getElementById("newQuoteText").value;
  const quoteCategory = document.getElementById("newQuoteCategory").value;

  if (quoteText && quoteCategory) {
      quotes.push({ text: quoteText, category: quoteCategory });
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
      alert("New quote added!");
  } else {
      alert("Please enter both a quote and a category.");
  }
}

// Event Listener for "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// Show an initial random quote on page load
showRandomQuote();
