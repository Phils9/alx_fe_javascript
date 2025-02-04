// Array of quotes with text and category
const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Success" }
];

// Function to save quotes to localStorage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to display a random quote
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${quotes[randomIndex].text}" - <strong>[${quotes[randomIndex].category}]</strong>`;

     // Save last displayed quote in sessionStorage
     sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// Load last viewed quote from sessionStorage
function loadLastQuote() {
    const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
    if (lastQuote) {
        document.getElementById("quoteDisplay").innerHTML = `"${lastQuote.text}" - <strong>[${lastQuote.category}]</strong>`;
    }
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
        saveQuotes(); // Save updated quotes to localStorage

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

// Function to export quotes to a JSON file
function exportQuotes() {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                alert("Quotes imported successfully!");
                showRandomQuote();
            } else {
                alert("Invalid JSON format!");
            }
        } catch (error) {
            alert("Error parsing JSON file.");
        }
    };

    fileReader.readAsText(event.target.files[0]);
}

// Event listener for the "Show New Quote" button
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("exportQuotes").addEventListener("click", exportQuotes);
document.getElementById("importFile").addEventListener("change", importFromJsonFile);

// Call the function to create the quote form
createAddQuoteForm();

// Initialize app
window.onload = function () {
    createAddQuoteForm();
    loadLastQuote();
    showRandomQuote();
};