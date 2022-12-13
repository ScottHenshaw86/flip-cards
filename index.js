// var words = ["cat", "dog"];
var words = ["bug", "cat", "cow", "dog", "hen", "pig", "rat"];

// loop through the words array and add an image path for each word
let length = words.length; // prevent infinite loop, since array size is changing
for (let i=0; i<length; i++) {
    words.push("./images/" + words[i] + ".jpeg");
}

// console.log(words);

// shuffle the elements in the words array
for(let i = words.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1)); // random # between 0 and i
    [words[i], words[j]] = [words[j], words[i]]; // swap the place of the elements
}

// console.log(words);

let container = document.getElementById('cards-container');
let canClickAgain = true;

// loop through the words array and create a card for each word
for (let i=0; i< words.length; i++) {
    let card = document.createElement('div');
    card.classList.add('card');
    if (words[i][0] === ".") {
        let img = document.createElement('img');
        img.src = words[i];
        card.appendChild(img);
    } else {
        let h1 = document.createElement('h1');
        h1.textContent = words[i];
        card.appendChild(h1);
    }
    container.appendChild(card);

    card.onclick = function() {
        flipCard(this, words[i]);
    }
}
let guesses = 0;
let points = 0;
let pointsContainer = document.getElementById('points');
let flippedCardText = "";
let flippedCardElement = "";
function flipCard(card, text) {
    if (text == flippedCardText) return;
    if (!canClickAgain) return;
    console.log("Flipped: ", flippedCardText)
    if (flippedCardText == "") {
        flippedCardText = text;
        flippedCardElement = card;
        card.classList.add('flipped');
    } else {
        guesses++;
        card.classList.add('flipped');
        canClickAgain = false;
        if (flippedCardText.includes(text) || text.includes(flippedCardText)) {
            points+= 2;
            pointsContainer.textContent = points;
            setTimeout(function() {
                card.classList.remove('flipped');
                card.classList.add('hidden');
                flippedCardElement.classList.remove('flipped');
                flippedCardElement.classList.add('hidden');
                card.onclick = "";
                flippedCardElement.onclick = "";
                flippedCardText = "";
                flippedCardElement = "";
                canClickAgain = true;
                
                if (points == words.length) {
                    alert("You win! It took you " + guesses + " guesses"); 
                }
            }, 2000);
        } else {
            setTimeout(function() {
                card.classList.remove('flipped');
                flippedCardElement.classList.remove('flipped');
                flippedCardText = "";
                flippedCardElement = "";
                canClickAgain = true;
            }, 2000);
        }
    }
}