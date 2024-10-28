document.querySelector('#clickMe').addEventListener('click', playAgainstServer)
const displayPlayerChoice = document.querySelector('#playerPick')
const displayServerChoice = document.querySelector('#serverPick')
const displayResult = document.querySelector('#result')

function playAgainstServer(){

  const playerChoice = document.querySelector("#guess").value.toLowerCase().trim()
  //change query parameter to guess, change user name to coin flip
  fetch(`/api?choice=${playerChoice}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      console.log('your choice was:', playerChoice)
      console.log('the server says:', data.decision)

      if(playerChoice === 'heads' || playerChoice === 'tails') {
        if(playerChoice === data.decision) {
          displayWin(data, playerChoice)
        }else {
          displayLoss(data, playerChoice)
        }

      }else {
        displayError()
      }

    });

}

function displayWin(data, playerChoice) {
  displayPlayerChoice.innerText = `You picked ${playerChoice}`
  displayServerChoice.innerText = `The server picked ${data.decision}`
  displayResult.innerText = 'You win!'
}

function displayLoss(data, playerChoice) {
  displayPlayerChoice.innerText = `You picked ${playerChoice}`
  displayServerChoice.innerText = `The server picked ${data.decision}`
  displayResult.innerText = 'You lose!'
}

function displayError() {
  displayPlayerChoice.innerText = ''
  displayServerChoice.innerText = ''
  displayResult.innerText = 'Please enter heads or tails.'
}