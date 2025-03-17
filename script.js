const quoteDisplay = document.getElementById("quoteDisplay");
const authorDisplay = document.getElementById("authorDisplay");
const generateBtn = document.getElementById("generateButton");
const copyBtn = document.getElementById("copyButton");
const twitterLink = document.getElementById("twitterLink");

async function getRandomQuote() {
  //fetch the data from the api endpoint
  const url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    // response from the api comes in the string format mostly we'll convert it into the json format
    const quoteData = await response.json();
    console.log(quoteData);

    // get the reference of quote and author from the api response
    const quote = quoteData.data.content;
    const author = quoteData.data.author;

    // now display the quote and author in the DOM
    quoteDisplay.textContent = quote;
    authorDisplay.textContent = `- ${author}`;

    // Adding the tweet feature
    const tweetText = `${quote} - ${author}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&hashtags=quotes,inspiration`;
    twitterLink.href = twitterUrl;

    // changing the button text once the first quote is generated
    generateBtn.innerText = `Generate New quote`;
  } catch (error) {
    console.error(error.message);
  }
}
generateBtn.addEventListener("click", getRandomQuote);

copyButton.addEventListener("click", () => {
  navigator.clipboard
    .writeText(quoteDisplay.textContent)
    .then(() => alert("Copied successfully"))
    .catch((err) => console.error("Failed to copy", err)); // its a promise
});