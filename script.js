const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// show Loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function removeLoadingspinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// https://jacintodesign.github.io/quotes-api/data/quotes.json

// get quotes from API

let apiQuotes = [];

// show new quote
function newQuote() {
  showLoadingSpinner();
  // pick random quote from apiQuote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);

  //Check the quote length to determine styling
  if (quote.text.length > 300) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Set Quote, Hide Loader
  authorText.textContent = quote.author;
  quoteText.textContent = quote.text;
  removeLoadingspinner();
}

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    getQuotes();
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// on load
getQuotes();
