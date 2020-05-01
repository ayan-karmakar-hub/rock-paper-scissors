// setting up my variables that keep track of
// the round number and each player's score
var pScore = 0;
var cScore = 0;
let playerScore = document.querySelector('#player-score');
let playerText = playerScore.innerText;
let compScore = document.querySelector('#computer-score');
let compText = compScore.innerText;
let roundNumber = document.querySelector('#round-number');
let roundText = roundNumber.innerText;
let displayWinner = document.querySelector('#display-winner');

// Create an event listener for each of the images
// corresponding to rock,paper,and scissors
let choices = document.querySelectorAll('.choice');
choices.forEach((choice)=> choice.addEventListener('click',startRound));

// simulates the computer's choice by picking
// a random number between 0 and 2 inclusive
function computerPlay(){
    let value = Math.floor(Math.random()*3);
    let result = (value == 0)? "rock":
    (value==1)? "paper": "scissors";
    return result;
}

// set up playRound with the correct parameters
// I am unsure how to pass in functions with parameters
// to event listeners, so this is my workaround.
function startRound(){
    playRound(this.id, computerPlay());
}

// the main part of the program. This will increment
// the score of the player with the winning choice
// If a player reaches 5 points, the game will end
function playRound(playerSelection,computerSelection){

    // determines the player who won the round (if any)
    // and increments the scores appropriately
    switch(true){
        case playerSelection === "rock" && computerSelection == "scissors":
        case playerSelection === "paper" && computerSelection == "rock":
        case playerSelection === "scissors" && computerSelection == "paper":
            displayWinner.innerText = `You Win! ${playerSelection} beats ${computerSelection}.`;
            pScore++;
            break;
        case playerSelection == computerSelection:
            displayWinner.innerText = `It was a tie! You both chose ${playerSelection}.`;
            pScore+=.5;
            cScore+=.5
            break;
        default:
            displayWinner.innerText = `You Lose! ${computerSelection} beats ${playerSelection}.`;
            cScore++;     
    }

    // updates the round number and score display
    playerText = playerText.substr(0,8) + pScore;
    playerScore.innerText = playerText;
    compText = compText.substr(0,10) + cScore;
    compScore.innerText = compText;

    // checks for game end conditions
    if(pScore >= 5 || cScore >= 5){
        endGame();
    } else {
        roundText = roundText.substr(0,15) + (cScore+pScore+1);
        roundNumber.innerText = roundText;
    }
}

// handles the end of the game. The game will 
// restart if the player types yes when prompted.
function endGame(){
    let message = "";
    if(pScore > cScore){
        message+= "You won the game!\n";
    } else if (cScore > pScore){
        message += "The computer won the game!\n"
    } else {
        message+= "It was a tie!\n";
    }
    message+=`Final Scores--> Player: ${pScore} | Computer: ${cScore}\n`;
    message+="Thanks for playing.";
    displayWinner.setAttribute('style', "font-size:20px");
    displayWinner.innerText = message;
    choices.forEach((choice)=> choice.removeEventListener('click',startRound));
}