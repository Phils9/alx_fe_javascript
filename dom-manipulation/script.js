// Retrieve quotes from local storage or initialize an empty array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];

// Populate category filter dropdown dynamically
function populateCategories() {
    const categoryFilter = document.getElementById("categoryFilter");
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    
    const categories = [...new Set(quotes.map(q => q.category))]; // Get unique categories

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected category from local storage
    const lastSelectedCategory = localStorage.getItem("selectedCategory");
    if (lastSelectedCategory) {
        categoryFilter.value = lastSelectedCategory;
        filterQuotes();
    }
}

// Filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory); // Save selected category

    const filteredQuotes = selectedCategory === "all" 
        ? quotes 
        : quotes.filter(q => q.category === selectedCategory);

    displayRandomQuote(filteredQuotes);
}

// Display a random quote from the filtered list
function displayRandomQuote(filteredList = quotes) {
    if (filteredList.length === 0) {
        document.getElementById("quoteDisplay").innerText = "No quotes available.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredList.length);
    document.getElementById("quoteDisplay").innerText = filteredList[randomIndex].text;
}

// Add a new quote and update categories
function addQuote() {
    const quoteText = document.getElementById("newQuoteText").value.trim();
    const quoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (quoteText && quoteCategory) {
        quotes.push({ text: quoteText, category: quoteCategory });
        localStorage.setItem("quotes", JSON.stringify(quotes));
        
        populateCategories(); // Update category dropdown
        filterQuotes(); // Refresh quotes based on selected category

        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
    }
}

// Initialize dropdown and display a quote on page load
window.onload = function () {
    populateCategories();
    filterQuotes();
};
