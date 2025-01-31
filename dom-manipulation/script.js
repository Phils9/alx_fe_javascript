async function fetchQuotesFromServer() {
  try {
      const response = await fetch("https://api.quotable.io/quotes?limit=10", {
          headers: {
              "Content-Type": "application/json; charset=utf-8"  // Add Content-Type here
          }
      }); 
      const data = await response.json();

      const serverQuotes = data.results.map(quote => ({
          id: quote._id,
          text: quote.content,
          category: quote.tags[0] || "General"
      }));

      localStorage.setItem("quotes", JSON.stringify(serverQuotes));
      console.log("Quotes fetched from real API.");
  } catch (error) {
      console.error("Error fetching quotes:", error);
  }
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

// Check for Data Conflicts (Basic Version)
async function checkForUpdates() {
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

  try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const serverQuotes = await response.json();

      if (localQuotes.length !== serverQuotes.length) {
          console.warn("Potential conflict detected. Data may be outdated.");
          alert("Warning: There may be new quotes available. Refresh to get updates.");
      }
  } catch (error) {
      console.error("Error checking for updates:", error);
  }
}

// Event Listeners
document.getElementById("newQuote").addEventListener("click", loadQuotes);

// Initialize on Page Load
fetchQuotesFromServer().then(loadQuotes);

// Periodically Check for Updates (Every 60 Seconds)
setInterval(checkForUpdates, 60000);
