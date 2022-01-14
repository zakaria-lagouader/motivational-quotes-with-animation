// The Dom
var quoteText = document.getElementById("quote");
var authName = document.getElementById("auth");

// Set the height of the body
document.body.style.height = window.innerHeight

let quotes = [];
getQuotes().then(res => {
    quotes = res;
    pickRandomQuote()
})

let next = true

let dark = false;

function toggle() {
    dark = !dark;
    updateTheme();
}


function updateTheme() {
    const color = dark ? 'white' : "black";
    const background = dark ? 'black' : "white";
    document.documentElement.style.setProperty('--color', color);
    document.documentElement.style.setProperty('--background', background);
}

function pickRandomQuote() {
    if (next) {
        hideBtn()
        next = false;

        const index = Math.floor(Math.random() * 1643);
    
        const {text, author} = quotes[index];
    
        quoteText.innerText = text;
        authName.innerText = author || "Someone";
    
        animateText()
    }
}


function animateText() {
    quoteText.innerHTML = quoteText.textContent.replace(/(\w+)|[?!;.',:]/g,"<span class='letter'>$&</span>");
    authName.innerHTML = authName.textContent.replace(/\S/g,"<span class='letter'>$&</span>");
    anime({
      targets: "#quote .letter",
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el, i) => 500 + 30 * i,
    }).finished.then(() => {
      quoteText.innerHTML = quoteText.textContent;
    });
    anime({
      targets: "#auth .letter",
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el, i) => 2000 + 30 * i,
    }).finished.then(() => {
      authName.innerHTML = authName.textContent;
      next = true
      anime({
          targets: ".btns button",
          opacity: [0, 1],
          scale: [0, 1], 
        //   translateY: [40, 0],
          easing: "easeOutExpo",
          duration: 1000,
      })
    });  

}

function hideBtn() {
    
    anime({
      targets: ".btns button",
      opacity: [1, 0],
    //   translateY: [0, 40],
      easing: "easeOutExpo",
      scale: [1, 0], 
      duration: 1000,
    })
}


async function getQuotes() {
    const res = fetch('/quotes.json');
    return (await res).json();
}
