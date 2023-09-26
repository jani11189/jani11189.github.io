let cDeck = [
    "charmander.png",
    "charmander.png",
    "squirtle.png",
    "squirtle.png",
    "bulbasaur.png",
    "bulbasaur.png",
    "charizard.png",
    "charizard.png",
    "blastoise.png",
    "blastoise.png",
    "venusaur.png",
    "venusaur.png",
    "togepi.png",
    "togepi.png",
    "pikachu.png",
    "pikachu.png",
];
let clickCounter = 0;
let firstCard;
let firstCardId;
let secondCard;
let secondCardId;
let attempts = 0;
let matchCounter = 0;
let seconds = 0;
let minutes = 0;
let textSeconds = "00";
let textMinutes = "00";
let textTime = 0;
let finalTime = 0;
let timer;

function createMap(text) {
    cImage = document.createElement("img");
    cImage.src = "qMark.png";
    cImage.alt = text;
    cImage.name = text;
    cImage.id = text;
    cImage.addEventListener("click", flipCardOpen);
    document.getElementById("main").appendChild(cImage);
}

function flipCardOpen() {
    clickCounter++;
    // console.log(clickCounter);
    if (clickCounter % 2 !== 0) {
        firstCard = this.name;
        this.alt = "qMark.png";
        this.src = firstCard;
        firstCardId = this.name + clickCounter;
        this.id = firstCardId;
        document.getElementById(firstCardId).removeEventListener("click", flipCardOpen);
    }
    if (clickCounter % 2 == 0) {
        secondCard = this.name;
        this.alt = "qMark.png";
        this.src = secondCard;
        secondCardId = this.name + clickCounter;
        this.id = secondCardId;
        document.getElementById(secondCardId).removeEventListener("click", flipCardOpen);
        setTimeout(checkMatch, 300);
        attempts = clickCounter/2;
        document.getElementById("attempts").innerHTML = "Attempts: " + attempts;
    }
}

function checkMatch() {
    if (firstCard == secondCard) {
        document.getElementById(firstCardId).style.border = "2px solid Yellow";
        document.getElementById(secondCardId).style.border = "2px solid Yellow";
        matchCounter++;
        console.log(matchCounter);
        if (matchCounter == cDeck.length/2) {
            setTimeout(gameOver, 1000);
        }
    }
    if (firstCard !== secondCard) {
        document.getElementById(firstCardId).src = "qMark.png";
        document.getElementById(secondCardId).src = "qMark.png";
        document.getElementById(firstCardId).addEventListener("click", flipCardOpen);
        document.getElementById(secondCardId).addEventListener("click", flipCardOpen);
    }
}

function startGame() {
    timer = setInterval(showTimer, 1000);
    for (let i = cDeck.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let k = cDeck[i];
        cDeck[i] = cDeck[j];
        cDeck[j] = k;
    }
    cDeck.forEach(createMap);
}

function resetGame(){
    location.reload();
    startGame();
}

function showTimer() {
    if (seconds !== 60) {
        seconds++;
        if (seconds <10) {
            textSeconds = "0" + seconds;
        } else {
            textSeconds = seconds;
        }
    }
    if (seconds == 60){
        seconds = 0;
        minutes++;
        if (minutes <10) {
            textMinutes = "0" + minutes;
        } else {
            textMinutes = minutes;
        }
    }
    textTime =  textMinutes + ":" + textSeconds;
    document.getElementById("timer").innerHTML = textTime;
}

function gameOver() {
    clearInterval(timer);
    document.getElementById("winMessage").innerHTML = 
    "You matched em all in " + textMinutes + " minutes and " + textSeconds + " seconds" + " with " + attempts + " attempts!";
    
    finalTime = document.getElementById("timer").innerHTML;
    document.getElementById("timer").innerHTML = finalTime;
    document.getElementById("winpopup").style.display = "block";
}

function closePopUp() {
    document.getElementById("winpopup").style.display = "none";
}

