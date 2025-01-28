// Initialize Particles.js
particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out" },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });
  
  // Select DOM elements
  const quoteText = document.getElementById("quote");
  const authorText = document.getElementById("author");
  const newQuoteBtn = document.getElementById("new-quote");
  const copyQuoteBtn = document.getElementById("copy-quote");
  const message = document.getElementById("message");
  
  // Function to fetch a quote from Quotable API
  async function fetchFromQuotable() {
    try {
      const api_url = "https://api.quotable.io/random";
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { text: data.content, author: data.author };
    } catch (error) {
      console.error("Error fetching quote:", error);
      return { text: "Error fetching quote.", author: "System" };
    }
  }
  
  // Function to display a quote
  async function getNewQuote() {
    newQuoteBtn.disabled = true; // Disable button while fetching
    quoteText.textContent = "Loading...";
    authorText.textContent = "";
  
    const randomQuote = await fetchFromQuotable();
  
    // Update quote and author text
    quoteText.textContent = `"${randomQuote.text}"`;
    authorText.textContent = randomQuote.author ? `- ${randomQuote.author}` : "- Unknown";
  
    newQuoteBtn.disabled = false; // Re-enable button after fetching
  }
  
  // Function to copy the quote to the clipboard
  function copyQuoteToClipboard() {
    const fullQuote = `${quoteText.textContent.trim()} ${authorText.textContent.trim()}`;
    navigator.clipboard
      .writeText(fullQuote)
      .then(() => {
        showMessage("Quote copied!");
      })
      .catch((error) => {
        console.error("Failed to copy quote:", error);
        showMessage("Failed to copy quote.");
      });
  }
  
 // Function to display a temporary message
function showMessage(text) {
    message.textContent = text; // Update the message text
    message.classList.add("show"); // Add the "show" class for sliding in
    message.style.display = "block"; // Ensure it's visible
  
    // Automatically hide the message after 2 seconds
    setTimeout(() => {
      message.classList.remove("show"); // Remove the "show" class for sliding out
      message.classList.add("hide"); // Add the "hide" class to slide it off-screen
      setTimeout(() => {
        message.classList.remove("hide"); // Reset the state after animation
        message.style.display = "none"; // Fully hide the element
      }, 600); // Matches the CSS transition duration
    }, 2000); // Message stays visible for 2 seconds
  }
  
  
  
  // Event listeners for buttons
  newQuoteBtn.addEventListener("click", getNewQuote);
  copyQuoteBtn.addEventListener("click", copyQuoteToClipboard);
  
  // Fetch a quote on page load
  getNewQuote();
  