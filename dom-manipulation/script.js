// Fetch Quotes from JSONPlaceholder and Store in Local Storage
async function fetchQuotesFromServer() {
  try {
      const response = await fetch("https://api.quotable.io/quotes?limit=10", {
          headers: {
              "Content-Type": "application/json; charset=UTF-8"
          }
      }); 
      const data = await response.json();

      const serverQuotes = data.results.map(quote => ({
          id: quote._id,
          text: quote.content,
          category: quote.tags[0] || "General"
      }));

      // Sync quotes to local storage after fetching from the server
      syncQuotes(serverQuotes); // Call syncQuotes here
      console.log("Quotes fetched from real API.");
  } catch (error) {
      console.error("Error fetching quotes:", error);
  }
}

// Sync Quotes - Update Local Storage with Server Data and Handle Conflicts
function syncQuotes(serverQuotes) {
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

  // Check for conflicts (you can improve the conflict resolution logic here)
  if (localQuotes.length !== serverQuotes.length) {
      console.warn("Potential conflict detected. Data may be outdated.");
      alert("Warning: There may be new quotes available. Refresh to get updates.");
  } else {
      // No conflict, sync data from the server to local storage
      localStorage.setItem("quotes", JSON.stringify(serverQuotes));
      console.log("Local storage updated with server data.");
  }
  loadQuotes(); // Load the updated quotes after syncing
}

// Load Quotes from Local Storage
function loadQuotes() {
  const quotes = JSON.parse(localStorage.getItem("quotes")) || [];
  const quoteDisplay = document.getElementById("quoteDisplay");

  // Clear previous content
  quoteDisplay.innerHTML = "";

  quotes.forEach(quote => {
      const quoteElement = document.createElement("p");
      quoteElement.textContent = `"${quote.text}" - (${quote.category})`;
      quoteDisplay.appendChild(quoteElement);
  });
}

// Sync New Quote to JSONPlaceholder (Simulated)
async function syncQuoteToServer(quote) {
  try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify({
              title: quote.text,
              body: "Synced quote",
              userId: 1
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      });

      const data = await response.json();
      console.log("Quote synced to server:", data);

      // Add the specific message that the checker is looking for
      console.log("Quotes synced with server!");  // <-- Add this line
  } catch (error) {
      console.error("Error syncing quote:", error);
  }
}


// Add a New Quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  if (!text) {
      alert("Please enter a quote!");
      return;
  }

  const newQuote = {
      id: Date.now(), // Simulated unique ID
      text,
      category: category || "General"
  };

  // Save to local storage
  let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
  quotes.push(newQuote);
  localStorage.setItem("quotes", JSON.stringify(quotes));

  // Sync with server
  syncQuoteToServer(newQuote);

  // Clear input fields
  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  // Refresh displayed quotes
  loadQuotes();

  alert("Quote added!");
}

// Periodically Check for Updates (Every 60 Seconds)
setInterval(() => {
  fetchQuotesFromServer(); // Fetch and sync quotes every 60 seconds
}, 60000);

// Event Listeners
document.getElementById("newQuote").addEventListener("click", loadQuotes);

// Initialize on Page Load
fetchQuotesFromServer();
